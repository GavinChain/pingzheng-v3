<template>
  <div>
    <div ref="abc" />
  </div>
</template>
<script setup>


onMounted(()=>{
  render(h('el-form'),abc.value)
})
</script>
