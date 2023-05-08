<!--
 * @Author: HRBully
 * @Date: 2023-05-7 20:32:45
 * @LastEditors: HRBully hrbully@163.com
 * @LastEditTime: 2023-05-7 20:32:45
 * @Description: modal 组件
-->

<template>
  <transition name="fade" mode="out-in">
    <!-- 表单模态框 -->
    <aside class="flex-col-center modal setting z-40" v-show="type === 'form' && isOpen === true">
      <ul
        class="space-y-2 rounded-lg p-3 ring-4"
        :class="{ 'w-3/4': size === 'small', 'w-3/5': size === 'normal', 'w-1/2': size === 'large' }">
        <li class="flex-row-between h-8 rounded px-2" v-for="item in setting">
          <label :for="item.id" class="flex gap-1 text-xs">
            <span>
              {{ item.label }}
            </span>
          </label>
          <input
            v-if="item.type === 'text' || item.type === 'textarea'"
            :id="item.id"
            :placeholder="item.notice"
            :type="item.type"
            class="w-3/3 rounded border-none px-2 py-1 text-right text-xs outline-none"
            @keyup.enter="onSave" />
        </li>
        <!-- 保存 -->
        <ol class="flex-row-center-right gap-2">
          <button @click="onCancel" class="btn btn-md btn-red">取消</button>
          <button @click="onSave" class="btn btn-md">保存</button>
        </ol>
      </ul>
    </aside>
  </transition>
</template>
<script setup lang="ts">
interface Props {
  // 尺寸
  size?: 'small' | 'normal' | 'large'
  // 模态类别
  type: 'notice' | 'form'
  // 打开开关
  isOpen: boolean
  // 设置值
  store: Record<string, Object>
  // 设置项
  setting: (
    | {
        id: string
        label: string
        type: 'text' | 'checkbox' | 'textarea'
        notice?: string
        help?: string
      }
    | {
        id: string
        label: string
        type: 'number'
        help?: string
        options: { len: number }
      }
    | {
        id: string
        label: string
        type: 'select'
        help?: string
        options: { label: string; value: string }[]
      }
    | {
        id: string
        label: string
        type: 'button'
        help?: string
        options: { text: string; click: () => void }
      }
  )[]
}

// 初始化参数
withDefaults(defineProps<Props>(), {
  size: 'normal'
})

// 自定义事件
const emit = defineEmits(['save', 'cancel'])

// 保存/确定
const onSave = () => {
  emit('save')
}

// 取消
const onCancel = () => {
  emit('cancel')
}
</script>
<style scoped></style>
