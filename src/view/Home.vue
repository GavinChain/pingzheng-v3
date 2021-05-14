<template>
<div style="position:fixed;height:100%;display: flex">
  <div style="height: 100%;background: rgba(35,93,121, 0.3);">
    <ul style="margin:0;list-style: none">
      <li>凭证demo</li>
      <li>打印demo</li>
    </ul>
  </div>
  <PingZhengDemo></PingZhengDemo>
</div>
</template>
<script setup>
import PingZhengDemo from './pingzheng/pingzheng-demo'
</script>
<style>
body{
  margin:0
}
</style>
