<template>
  <div>
    {{a}}
  </div>
</template>
<script setup>
import {onMounted, onUpdated, ref, useContext, watch} from 'vue';
const a=ref('')

const {slots} =useContext()
const aaa=()=>{
  a.value=slots.default()[0].children
}
watch(slots.default,aaa)
onMounted(aaa)
</script>
