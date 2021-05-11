<template>
  <div>
    <input v-model="modelValue" @blur="inputChange"/>
  </div>
</template>
<script setup>
import {defineProps, getCurrentInstance, onMounted, onUpdated, ref} from 'vue';

const props=defineProps(['modelValue'])
const modelValue=ref(props.modelValue.toString())

setInterval(()=>{
  console.log(props);
},1500)
</script>
