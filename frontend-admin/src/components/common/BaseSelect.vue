<template>
  <div class="base-select" :class="{ 'is-open': isOpen, 'is-disabled': disabled }" ref="selectRef">
    <div class="select-trigger" @click.stop="toggleDropdown">
      <span class="select-value" :class="{ 'is-placeholder': !modelValue }">
        {{ currentLabel || placeholder }}
      </span>
      <span class="select-arrow">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M7 10l5 5 5-5H7z"/>
        </svg>
      </span>
    </div>
    <Transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div class="select-options">
          <div
            v-for="option in options"
            :key="option.value"
            class="select-option"
            :class="{ 'is-selected': option.value === modelValue }"
            @click="selectOption(option, $event)"
          >
            <span class="option-label">{{ option.label }}</span>
            <span v-if="option.value === modelValue" class="option-check">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectRef = ref(null)

const currentLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option ? option.label : ''
})

function toggleDropdown() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function selectOption(option, e) {
  e.stopPropagation()
  e.preventDefault()
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

function handleClickOutside(e) {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.base-select {
  position: relative;
  display: inline-block;
  min-width: 140px;
  font-size: var(--font-size-sm);
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  height: 40px;
  padding: 0 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  box-sizing: border-box;
}

.base-select:hover .select-trigger {
  border-color: #d1d5db;
}

.base-select.is-open .select-trigger {
  border-color: #047857;
  box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.1);
}

.base-select.is-disabled .select-trigger {
  background: #f9fafb;
  cursor: not-allowed;
  opacity: 0.6;
}

.select-value {
  flex: 1;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-value.is-placeholder {
  color: var(--text-muted);
}

.select-arrow {
  display: flex;
  align-items: center;
  color: var(--text-muted);
  transition: transform 0.2s ease;
}

.base-select.is-open .select-arrow {
  transform: rotate(180deg);
  color: #047857;
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: var(--border-radius-md);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.select-options {
  max-height: 240px;
  overflow-y: auto;
  padding: 6px 0;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 14px;
}

.select-option:hover {
  background: #f0fdf4;
}

.select-option.is-selected {
  color: #047857;
  font-weight: 500;
  background: #ecfdf5;
}

.option-label {
  flex: 1;
}

.option-check {
  display: flex;
  align-items: center;
  color: #047857;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
