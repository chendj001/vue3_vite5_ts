<template>
  <div style="padding: 50px; gap: 10px; display: flex">
    <div class="grid">
      <div class="grid-col" style="grid-row: 1 / span 2; grid-column: 1 / span 2">
        <img src="https://avatars.githubusercontent.com/u/146858765?v=4" alt="">
      </div>
    </div>
    <div class="grid">
      <div class="grid-col">
        <img class="avatar"
          src="https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_a86e56c980b7955312b5702a547a4cf0~c5_300x300.jpeg?from=2956013662"
          alt="" />
      </div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col" style="grid-column: 1/-1; grid-row: 2/-1">
        <div class="github-content" style="width: 100%;">
          <a class="github-item" target="_blank"
            href="https://www.douyin.com/user/MS4wLjABAAAAwCF9lNamTpx-8ENFQauLVaKucBuRjO3VrRUDWf3BN3s?modal_id=7291961030303862066">🌵大明朱三爷2</a>
          <div class="github-item">👀 大明指路人</div>
          <div class="github-item">🌱 穿越大秦</div>
        </div>
      </div>
    </div>
    <div class="github">
      <div class="github-header">chendj001/README.md</div>
      <div class="github-content">

        <div class="github-item">chmod -R 755</div>
        <router-link class="github-item" :to="{ name: 'md' }" target="_blank">👀 Md文档</router-link>
        <router-link class="github-item" :to="{ name: 'vue2Array' }" target="_blank">🌱 数组操作</router-link>
        <router-link class="github-item" :to="{ name: 'vue2Error' }" target="_blank">💞️ 常见错误</router-link>
        <router-link class="github-item" :to="{ name: 'vueComponent' }" target="_blank">🎍 组件编写</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Grid"></script>

<style lang="scss" scoped>
.grid {
  background: $theme;
  @include grid();
}

.github {
  display: grid;
  width: $gridWidth;
  height: $gridHeight;
  background: $theme;
  border-radius: 4px;
  overflow: clip;
  overflow-clip-margin: border-box;
  color: #fff;
  font-family: Consolas;
  // 计算数字
  counter-reset: githubItem;

  &-header {
    padding: 0 16px;
    height: 40px;
    grid-row: 1 / span 1;
    grid-column: 1/-1;
    display: flex;
    font-size: 14px;
    @include center('y');
  }

  &-content {
    grid-column: 1/-1;
    padding: 8px 0;
    background: rgb(246, 248, 250);
    color: rgb(31, 35, 40);
    font-size: 12px;
  }

  &-item {
    display: flex;
    counter-increment: githubItem;
    height: 20px;
    line-height: 20px;

    &::before {
      display: inline-block;
      content: counter(githubItem) '  -';
      width: 46px;
      text-align: right;
      padding-right: 10px;
      color: rgb(110, 119, 129);
    }
  }
}

.avatar {
  @include avatar();
}
</style>
