import SMS from "./sms";
import { template } from "lodash";

type templatesTypeValue = {
  templateCode: string;
  templateContent?: string;
};

type templatesType = {
  [key: string]: templatesTypeValue;
};

type sendArgsVars = {
  [key: string]: number | string;
};

export const AliSMS = SMS;

export type bacthSendArgs = {
  phonenum: string | number;
  vars?: sendArgsVars;
  signName?: string;
};

export interface Args {
  accessKeyId: string;
  accessSecret: string;
  defaultSignName: string;
  templates: templatesType;
}
const init = config => {
  const smsService = {
    batch: {},
  };
  const batchService = {};
  for (const key in config.templates) {
    const params = {
      accessKeyId: config.accessKeyId,
      accessSecret: config.accessSecret,
      signName: config.defaultSignName,
      templateCode: config.templates[key].templateCode,
      templateContent: null,
    };
    if (config.templates[key].templateContent) {
      params.templateContent = template(config.templates[key].templateContent);
    }
    const sms = new SMS(params);
    smsService[key] = (phonenum: number | string | string[], vars: any) => {
      return sms.send(phonenum, vars);
    };
    batchService[key] = (tasks: bacthSendArgs[]) => {
      return sms.sendBatch(tasks);
    };
  }
  smsService.batch = batchService;
  return smsService;
};

export default app => {
  app.addSingleton('alisms', (config: any) => {
    return init(config);
  });
  app.createSMS = app.alisms.createInstance.bind(app.alisms);
};
