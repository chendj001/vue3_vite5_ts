```js
/**
 * @params {object} data 二进制流
 */
export const downloadBlob = (data, fileName = '下载.json') => {
  if (!data) {
    return
  }
  const blob = new Blob([data])
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
```
