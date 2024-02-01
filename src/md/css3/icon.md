### 图标

- 动态图标

```ts
let name = '---'
```

<img style="width:80px" src="/dkbb.png" />
<link rel="stylesheet" href="~src/md/css3/style.css">
<div class="icon">
  <div class="icon-base"><img style="width:80px" src="/dkbb.png" /></div>
  <div class="icon-border"><img style="width:80px" src="/dkbb.png" /></div>
  <div class="icon-fill"><img style="width:80px" src="/dkbb.png" /></div>
</div>

```html
<div class="icon">
  <div class="icon-base"><img style="width:80px" src="/dkbb.png" /></div>
  <div class="icon-border"><img style="width:80px" src="/dkbb.png" /></div>
  <div class="icon-fill"><img style="width:80px" src="/dkbb.png" /></div>
</div>
```

参考：

- [Tabbar animation](https://codepen.io/milanraring/pen/rNawpaM)

<style>
.icon {
  position: relative;
  width: 128px;
  height: 128px;
  font-size: 32px;
  cursor: pointer;
}
.icon-base,
.icon-border,
.icon-fill {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  opacity: 0;
}
.icon-base {
  opacity: 1;
  filter: grayscale(1);
}
.icon-border {
  filter: brightness(100);
}
.icon:hover .icon-border {
  animation: clip-animation-border 1s ease 0s forwards;
}
.icon:hover .icon-fill {
  animation: clip-animation 1s ease 0s forwards;
}
@keyframes clip-animation {
  from {
    opacity: 1;
    clip-path: circle(0% at 50% -20%);
  }
  to {
    opacity: 1;
    clip-path: circle(110% at top);
  }
}
@keyframes clip-animation-border {
  from {
    opacity: 1;
    clip-path: circle(10% at 50% -20%);
  }
  to {
    opacity: 1;
    clip-path: circle(115% at top);
  }
}
</style>
