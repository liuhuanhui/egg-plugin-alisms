# egg-plugin-alisms
## Usage

```
$ npm install egg-plugin-alisms
```

#### add to plugin

```typescript
// config/plugin.ts

export default {
  alisms: {
    enable: true,
    package: 'egg-plugin-alisms',
  }
}
```


```typescript
// config/config.default.ts
exports.alisms = {
  client: {
    accessKeyId: 'accessKeyId',
    accessSecret: 'accessSecret',
    defaultSignName: 'defaultSignName', // 默认签名
    templates: {
      login: {
        templateCode: 'SMS_171193819',
        // templateContent: "测试短信 ${code}" // 模板可选参数，添加此参数自动校验
      },
      // 配置多个
      register: {//},
    },
  },
};
```

#### 单条发送 
##### * 备注：手机号允许传入 string,number,string[]，传入数组可发送至多个手机号
``` ts
ctx.alisms.login('手机号', {
  // 模版变量
})
```
``` ts
ctx.alisms.register('手机号', {
  // 模版变量
})
```
#### 批量发送
``` ts
ctx.alisms.batch.login([
  {
    phonenum: '手机号',
    vars: {
      // 模版变量
    },
    signName: '', // 签名 不填写 默认使用全局默认配置签名
  },
   {
     // ...
   }
])
```
#### contact
``` js
alert('https://gitee.com/liuhuanhui');
alert('543800057@qq.com')
```
