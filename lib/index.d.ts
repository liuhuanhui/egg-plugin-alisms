import SMS from "./sms";
declare type templatesTypeValue = {
    templateCode: string;
    templateContent?: string;
};
declare type templatesType = {
    [key: string]: templatesTypeValue;
};
declare type sendArgsVars = {
    [key: string]: number | string;
};
export declare const AliSMS: typeof SMS;
export declare type bacthSendArgs = {
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
declare const _default: (app: any) => void;
export default _default;
