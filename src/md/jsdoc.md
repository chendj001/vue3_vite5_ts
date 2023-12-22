### jsDoc

定义对象

`Type.js`文件

```js
/**
 * @typeof HeroOpts 英雄
 * @prop {string} name 名称
 * @prop {string} age 年龄
 */
// 导出对象
export const Types = {}
```

使用

```js
// eslint-disable-next-line
import * as Types from 'Type.js' //导入类型
/**
 * 获取英雄
 * @param {Types.HeroOpts} opts
 */
function getHero(opts) {}
```
