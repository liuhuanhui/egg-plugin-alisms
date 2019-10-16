import Core from '@alicloud/pop-core';
import { bacthSendArgs } from '.';

export interface sendResult {
  Message: string;
  RequestId: string;
  BizId: string;
  Code: string;
}
interface templateVar {
  [key: string]: any;
};
export interface Args {
  accessKeyId: string;
  accessSecret: string;
  signName: string;
  templateCode: string;
  templateContent?: any;
}

const defaultConfig = {
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
};
export default class SMS {
  public args: Args;
  public client: any;
  constructor(args: Args) {
    this.args = args;
    const { accessKeyId, accessSecret } = this.args;
    if (!accessKeyId || !accessSecret) {
      console.error('未配置accessKeyId || accessSecret');
    } else {
      this.client = new Core(Object.assign(defaultConfig, {
        accessKeyId,
        accessKeySecret: accessSecret,
      }));
    }
  }
  /**
   * 发送内容
   * @param phone 单个或者多个手机号
   * @param vars  模板变量
   */
  public async send(phonenum: number | string | string[], vars?: templateVar): Promise<sendResult> {
    let templateParam;
    if (vars) {
      if (this.args.templateContent) {
        try {
          const content = this.args.templateContent(vars);
        } catch (error) {
          throw error;
        }
      }
      templateParam = JSON.stringify(vars);
    }
    const body = {
      phoneNumbers: typeof phonenum === 'object' ? phonenum.join(',') : phonenum,
      signName: this.args.signName,
      templateCode: this.args.templateCode,
      templateParam,
    };
    return await this.client.request('SendSms', body,
      { method: 'POST' },
    );
  }

  public async sendBatch(tasks: bacthSendArgs[]): Promise<sendResult> {
    const body = {
      phoneNumberJson: [],
      signNameJson: [],
      templateParamJson: [],
    };
    for (const item of tasks) {
      if (this.args.templateContent) {
        try {
          const content = this.args.templateContent(item.vars);
        } catch (error) {
          throw new Error(`${item.phonenum}${error.message}`);
        }
      }
      if (!item.phonenum) {
        throw new Error('phonenum can not be empty');
      }
      body.phoneNumberJson.push(item.phonenum as never);
      if (item.vars) {
        body.templateParamJson.push(item.vars as never);
      }
      body.signNameJson.push((item.signName || this.args.signName) as never);
    }
    const postBody = {
      templateCode: this.args.templateCode,
      phoneNumberJson: JSON.stringify(body.phoneNumberJson),
      signNameJson: JSON.stringify(body.signNameJson),
      templateParamJson: JSON.stringify(body.templateParamJson),
    };
    return await this.client.request('SendBatchSms', postBody, { method: 'POST' });
  }
}
