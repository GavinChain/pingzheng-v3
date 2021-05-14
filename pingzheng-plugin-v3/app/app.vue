<template>
  <div>
  <PingZheng v-model="model"></PingZheng>
  </div>
</template>
<script setup >

import {defineProps, getCurrentInstance, ref} from 'vue';
const props=defineProps(['model'])
const model=ref(props.model)
import PingZheng from './views/pingzheng.vue'
//
</script>
