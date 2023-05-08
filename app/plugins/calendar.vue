<template>
  <Setting :setting="setting" :store="store" />
  <Modal type="form" :isOpen="isOpen" :setting="setting" @cancel="closeModal" @save="onSave"></Modal>
  <article class="p-4 pt-5">
    <div class="mt-3 flex">
      <button class="btn btn-md btn-purple" @click="openModal">添加日程</button>
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
    id: 'notice',
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

const store = storage({})
// 保存内容
const onSave = () => {
  isOpen.value = false
}

onMounted(() => {})
</script>
