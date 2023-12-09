### vue2 中报错：`please transfer a valid prop path to form item!`

这是因为 form 表单的某一项`prop`属性绑定的值和`v-model`绑定的值不一致导致的比如：

```html
<el-form-item label="其他" prop="des" label-width="100px">
  <el-input placeholder="请输入内容" v-model="form.otherDes" clearable>
  </el-input>
</el-form-item>
```

`prop`值为`des`
`v-model`绑定的值为`otherDes`
就会报这个错

解决：
将两者统一就可以了，比如都绑定为`des`

### `Computed property was assigned to but it has no setter`问题解决

报这个是因为在`computed`中定义了某个属性，只有一个`return`额，而你在其他地方又对这个属性赋值了就会报这个，比如这样

```js
mounted(){
    this.submit()
},
computed: {
	setName(){
		return this.form.name
	}
},
methods: {
	submit() {
		this.setName = 'zhangsan'
	}
}
```

这样修改一下就好了

```js
computed: {
	setName(){
		get(){
      return this.form.name
    },
    set(value) {
      this.setName = value
    }
	}
}
```
