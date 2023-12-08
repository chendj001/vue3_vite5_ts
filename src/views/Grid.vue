<template>
  <div style="padding: 50px; gap: 10px; display: flex">
    <div class="grid">
      <div
        class="grid-col"
        style="grid-row: 1 / span 2; grid-column: 1 / span 2"
      ></div>
    </div>
    <div class="grid">
      <div class="grid-col" style="grid-column: 1/-1"></div>
      <div class="grid-col" style="grid-column: 1/-1; grid-row: 2/-1"></div>
    </div>
    <div class="github">
      <div class="github-header">chendj001/README.md</div>
      <div class="github-content">
        <div class="github-item">chmod -R 755</div>
        <div class="github-item">👀 I’m interested in ...</div>
        <div class="github-item">🌱 I’m currently learning ...</div>
        <div class="github-item">💞️ I’m looking to collaborate on ...</div>
        <div class="github-item">📫 How to reach me ...</div>
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
    padding: 8px 16px;
    grid-row: 1 / span 1;
    grid-column: 1/-1;
    display: flex;
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
    counter-increment: githubItem;
    height: 20px;
    line-height: 20px;
    &::before {
      display: inline-block;
      content: counter(githubItem) '.';
      width: 36px;
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>
