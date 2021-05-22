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
<style scoped>
@import "./assets/styles/ping_zheng_editor_layout.css";
@import "./assets/styles/ping_zheng_editor_layout.less.css";
>>> .dy_button {
  cursor: pointer;
  color: white;
  display: inline-block;
  white-space: nowrap;
  background-image: -webkit-linear-gradient(top, #eee, rgb(40, 180, 164));
  border: 1px solid #777;
  padding: 0 1.5em;
  margin: 0.5em;

  font: bold 1em/2em Arial, Helvetica;
  text-decoration: none;
  color: #333;
  text-shadow: 0 1px 0 rgba(255, 255 ,255,.8);
  -moz-border-radius: .2em;
  -webkit-border-radius: .2em;
  border-radius: .2em;
  -moz-box-shadow: 0 0 1px 1px rgba(255, 255, 255, .8) inset, 0 1px 0 rgba(0, 0, 0, .3);
  -webkit-box-shadow: 0 0 1px 1px rgba(255 ,255, 255,.8) inset, 0 1px 0 rgba(0 0 0 ,.3);
  box-shadow: 0 0 1px 1px rgba(255,255, 255,.8) inset, 0 1px 0 rgba(0 ,0, 0 ,.3);
}
</style>
