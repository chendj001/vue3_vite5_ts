<script setup lang="ts" name="App">
// @ts-ignore
import scss from '@/scss/mixin/alias.module.scss'
console.log(scss)

import { onBeforeMount, ref } from 'vue'

const needRefresh = ref(false)

let updateServiceWorker: (() => Promise<void>) | undefined

function onNeedRefresh() {
  needRefresh.value = true
}
async function close() {
  needRefresh.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh,
  })
  console.log('updateServiceWorker',updateServiceWorker)
})
</script>
<template>
  <RouterView />
  <div v-if="needRefresh" class="pwa-toast " role="alertdialog" aria-labelledby="pwa-message">
    <div id="pwa-message" class="mb-3">
      New content available, click the reload button to update.
    </div>
    <button type="button" class="pwa-refresh mr-2 px-3 py-1 rounded" @click="updateServiceWorker?.()">
      刷新
    </button>
    <button type="button" class="pwa-cancel b b-solid b-1px !b-color-$pwa-border mr-2 px-3 py-1 rounded" @click="close">
      关闭
    </button>
  </div>
</template>
<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 10px;
  top:10px;
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
