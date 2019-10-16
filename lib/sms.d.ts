import { bacthSendArgs } from '.';
export interface sendResult {
    Message: string;
    RequestId: string;
    BizId: string;
    Code: string;
}
interface templateVar {
    [key: string]: any;
}
export interface Args {
    accessKeyId: string;
    accessSecret: string;
    signName: string;
    templateCode: string;
    templateContent?: any;
}
export default class SMS {
    args: Args;
    client: any;
    constructor(args: Args);
    /**
     * 发送内容
     * @param phone 单个或者多个手机号
     * @param vars  模板变量
     */
    send(phonenum: number | string | string[], vars?: templateVar): Promise<sendResult>;
    sendBatch(tasks: bacthSendArgs[]): Promise<sendResult>;
}
export {};
