<template>
  <div class="search-bar">
    <BaseInput
      :model-value="modelValue"
      placeholder="搜索景点名称、地址..."
      @update:model-value="handleInput"
    >
      <template #prefix>🔍</template>
      <template #suffix>
        <button v-if="modelValue" class="clear-btn" @click="handleClear">✕</button>
      </template>
    </BaseInput>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/helpers'
import BaseInput from '@/components/common/BaseInput.vue'

defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const handleInput = debounce((value) => {
  emit('update:modelValue', value)
}, 300)

function handleClear() {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-bar {
  max-width: 400px;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  border: none;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--border-color);
  color: var(--text-primary);
}
</style>
