#### 重新加载

`reload.js`

检查当前页面的 URL 是否包含名为"version"的查询参数。如果不包含"version"参数，它会生成一个新的 URL，添加"version"参数，并将当前页面重定向到新的 URL。

```js
var search = window.location.search || ''
if (!search.includes('_version')) {
  let url = window.location.origin + window.location.pathname
  if (search) {
    url += search + '&'
  } else {
    url += '?'
  }
  url += `_version=${Date.now()}`
  window.open(url, '_self')
}
```
