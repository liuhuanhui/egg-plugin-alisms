"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pop_core_1 = __importDefault(require("@alicloud/pop-core"));
;
const defaultConfig = {
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
};
class SMS {
    constructor(args) {
        this.args = args;
        const { accessKeyId, accessSecret } = this.args;
        if (!accessKeyId || !accessSecret) {
            console.error('未配置accessKeyId || accessSecret');
        }
        else {
            this.client = new pop_core_1.default(Object.assign(defaultConfig, {
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
    async send(phonenum, vars) {
        let templateParam;
        if (vars) {
            if (this.args.templateContent) {
                try {
                    const content = this.args.templateContent(vars);
                }
                catch (error) {
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
        return await this.client.request('SendSms', body, { method: 'POST' });
    }
    async sendBatch(tasks) {
        const body = {
            phoneNumberJson: [],
            signNameJson: [],
            templateParamJson: [],
        };
        for (const item of tasks) {
            if (this.args.templateContent) {
                try {
                    const content = this.args.templateContent(item.vars);
                }
                catch (error) {
                    throw new Error(`${item.phonenum}${error.message}`);
                }
            }
            if (!item.phonenum) {
                throw new Error('phonenum can not be empty');
            }
            body.phoneNumberJson.push(item.phonenum);
            if (item.vars) {
                body.templateParamJson.push(item.vars);
            }
            body.signNameJson.push((item.signName || this.args.signName));
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
exports.default = SMS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXNDO0FBV3JDLENBQUM7QUFTRixNQUFNLGFBQWEsR0FBRztJQUNwQixRQUFRLEVBQUUsK0JBQStCO0lBQ3pDLFVBQVUsRUFBRSxZQUFZO0NBQ3pCLENBQUM7QUFDRixNQUFxQixHQUFHO0lBR3RCLFlBQVksSUFBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUNsRCxXQUFXO2dCQUNYLGVBQWUsRUFBRSxZQUFZO2FBQzlCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7SUFDSCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBb0MsRUFBRSxJQUFrQjtRQUN4RSxJQUFJLGFBQWEsQ0FBQztRQUNsQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzdCLElBQUk7b0JBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pEO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLE1BQU0sS0FBSyxDQUFDO2lCQUNiO2FBQ0Y7WUFDRCxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUNELE1BQU0sSUFBSSxHQUFHO1lBQ1gsWUFBWSxFQUFFLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUMxRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQzVCLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDcEMsYUFBYTtTQUNkLENBQUM7UUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFDOUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQ25CLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFzQjtRQUMzQyxNQUFNLElBQUksR0FBRztZQUNYLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGlCQUFpQixFQUFFLEVBQUU7U0FDdEIsQ0FBQztRQUNGLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzdCLElBQUk7b0JBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0RDtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDckQ7YUFDRjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7YUFDOUM7WUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBaUIsQ0FBQyxDQUFDO1lBQ2xELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFhLENBQUMsQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVSxDQUFDLENBQUM7U0FDeEU7UUFDRCxNQUFNLFFBQVEsR0FBRztZQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDcEMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNyRCxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQy9DLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1NBQzFELENBQUM7UUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7Q0FDRjtBQTFFRCxzQkEwRUMifQ==