<template>
  <div style="position: fixed;left:0;top:0;width:100%;height:100%;background:white">
    <div style="height: 50px;background:green">全屏</div>
    <div style="display:flex;justify-content:space-between;">

    <div style="width:1300px">
      <slot  />
    </div>
    <div style="width:1300px">

    <slot  />
    </div>
    </div>
  </div>
</template>
<script setup>

</script>
