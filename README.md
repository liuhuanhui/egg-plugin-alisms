# egg-plugin-alisms

## Usage

```
$ npm install egg-plugin-alisms
```

add to plugin

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