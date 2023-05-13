<template>
  <Setting :setting="setting" :store="store" />
  <Modal type="form" :isOpen="isOpen" :setting="setting" @cancel="closeModal" @save="onSave"></Modal>
  <article class="p-4 pt-5">
    <!-- 操作区域 -->
    <div class="mt-5 flex justify-between">
      <button class="btn btn-md btn-purple btn-purple-700" @click="openModal">添加日程</button>
      <button class="btn btn-md btn-blue btn-blue-700" @click="openModal">切换日程</button>
      <button class="btn btn-md btn-amber btn-amber-700" @click="openModal">今日日程</button>
    </div>
    <div class="mt-3 flex flex-col">
      <div class="w-200 text-primary flex justify-between" v-for="item in tasks">
        <div>{{ item.title }}</div>
        <div>
          <button class="btn btn-md btn-red hover:bg-red-700">删除</button>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'

import { getNowDate } from '~/lib/date'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'
import Modal from '@/components/modal.vue'
const today = ref(getNowDate())
const setting = reactive([
  {
    id: 'date',
    label: '日期',
    type: 'text',
    notice: today.value
  },
  {
    id: 'title',
    label: '标题',
    type: 'text'
  },
  {
    id: 'content',
    label: '内容',
    type: 'text'
  }
])

const isOpen = ref(false)
// 打开模态
const openModal = () => {
  isOpen.value = true
}
// 关闭模态
const closeModal = () => {
  isOpen.value = false
}
// 待办响应式存储
const taskMap = new Map()
taskMap.set('2023-07-11', {
  title: '任务1',
  content: '任务1内容'
})
const store = storage({
  taskMap
})
console.log(store.taskMap, taskMap)
// 保存内容
const onSave = (form) => {
  isOpen.value = false
  console.log(store.taskMap)
}

// 当日任务
const tasks = reactive([
  {
    title: '任务1',
    content: '任务1内容'
  },
  {
    title: '任务2',
    content: '任务2内容'
  }
])

onMounted(() => {})
</script>
