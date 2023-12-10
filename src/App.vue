<script setup lang="ts" name="App">
// @ts-ignore
import scss from '@/scss/mixin/alias.module.scss'
console.log(scss)
import ReloadPrompt from '@/components/ReloadPrompt.vue'
</script>
<template>
  <RouterView />
  <ReloadPrompt />
</template>
<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 10px;
  top: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid;

  button {
    padding: 2px 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
