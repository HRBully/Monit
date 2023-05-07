<template>
  <Setting :setting="setting" :store="store" />
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">今天是{{ today }}，您有如下几项日程待办</h1>
  </article>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'

import { getNowDate } from '~/lib/date'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'
const today = ref(getNowDate())
const setting = reactive([
  {
    id: 'notice',
    label: '添加日期',
    type: 'text',
    notice: today.value
  },
  {
    id: 'user',
    label: '待办事项',
    type: 'text'
  }
])

const store = storage({})

onMounted(() => {})
</script>
