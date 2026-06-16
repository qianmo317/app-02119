<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>
    <div class="input-container">
      <span v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="['input', { 'input-error': error, 'has-prefix': $slots.prefix, 'has-suffix': $slots.suffix }]"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
      <span v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
    <p v-if="error" class="input-error-text">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  label: String,
  placeholder: String,
  disabled: Boolean,
  error: String
})

defineEmits(['update:modelValue', 'focus', 'blur'])

const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`)
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.input:disabled {
  background: var(--bg-secondary);
  cursor: not-allowed;
}

.input.input-error {
  border-color: var(--danger);
}

.input.input-error:focus {
  box-shadow: 0 0 0 3px #fee2e2;
}

.input.has-prefix {
  padding-left: 40px;
}

.input.has-suffix {
  padding-right: 40px;
}

.input-prefix,
.input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  color: var(--text-muted);
}

.input-prefix {
  left: 0;
}

.input-suffix {
  right: 0;
}

.input-error-text {
  font-size: var(--font-size-xs);
  color: var(--danger);
}
</style>
