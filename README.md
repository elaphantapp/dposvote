# dpos-vote

## 运行代码
```
npm i
npm start
```

## TODO
* 联调server，用真实数据替换模拟数据
* 和小程序母体app联调，并辨明交互逻辑


## 说明
* /src/fake.js 是所有的模拟数据，格式供server api 部分参考。

## I18N
* 使用 vue-i18n package实现
* /src/i18n 下面是多语言配置文件，请修改zh.js中的语言配置。
* 可以在页面的console中执行 changeLanguage 方法修改界面语言。
```
changeLanguage('zh') // Chinese
changeLanguage('en') // English
```