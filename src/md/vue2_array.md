## 数组更新视图不更新

在 vue2 中 数组的以下操作 只能更改数据 但是视图不能更新

1、如果想根据数组索引通过赋值改变该索引下的值，则数据改变，视图不更新

2、如果通过赋值改变数组长度，则数据改变，但视图不更新 

3、直接赋值为空数组

```js
data(){
  color:['oen','green','new']
},
mounted(){
  this.color[1] = 'red' // 数据改变，但视图不更新
  this.color.length = 2 //  数据改变，但视图不更新
  this.color= []
  // 使用set方法
  this.$set(this.color,1,'red') // 数据改变，视图更新
  this.color.splice(2) // 长度改变，视图更新
  this.color.splice(0, this.color.length) // 清空数组 视图更新
},
```
这里的 splice 方法是 vue 内置处理过的 可以响应式

