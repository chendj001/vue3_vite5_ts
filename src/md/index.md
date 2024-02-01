---
title: 呵呵呵额
lang: en-US
---

### md



<div v-for="item in list" :key="item.path">
  <router-link target="_blank" :to="{name:item.name}">
    {{item.name}}
  </router-link>
</div>

<script setup lang="ts">
  const router=useRouter();
  const routes=router.getRoutes()
  const md=routes.filter(item=>{
    return item.path.startsWith('/md');
  })
  console.log(md)
  const list=ref(md)
</script>
