"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sms_1 = __importDefault(require("./sms"));
const lodash_1 = require("lodash");
exports.AliSMS = sms_1.default;
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
            params.templateContent = lodash_1.template(config.templates[key].templateContent);
        }
        const sms = new sms_1.default(params);
        smsService[key] = (phonenum, vars) => {
            return sms.send(phonenum, vars);
        };
        batchService[key] = (tasks) => {
            return sms.sendBatch(tasks);
        };
    }
    smsService.batch = batchService;
    return smsService;
};
exports.default = app => {
    app.addSingleton('alisms', (config) => {
        return init(config);
    });
    app.createSMS = app.alisms.createInstance.bind(app.alisms);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixtQ0FBa0M7QUFlckIsUUFBQSxNQUFNLEdBQUcsYUFBRyxDQUFDO0FBYzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFO0lBQ3BCLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN4QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDbEMsTUFBTSxNQUFNLEdBQUc7WUFDYixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZO1lBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUNoQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZO1lBQ2hELGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsaUJBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBb0MsRUFBRSxJQUFTLEVBQUUsRUFBRTtZQUNwRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQztRQUNGLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUM3QyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxVQUFVLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztJQUNoQyxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixrQkFBZSxHQUFHLENBQUMsRUFBRTtJQUNuQixHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQyJ9