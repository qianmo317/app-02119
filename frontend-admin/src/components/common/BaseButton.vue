<template>
  <button
    :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-loading': loading, 'btn-block': block }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: Boolean,
  disabled: Boolean,
  block: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 尺寸 */
.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  min-height: 32px;
}

.btn-md {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-md);
  min-height: 40px;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 48px;
}

/* 变体 - Primary */
.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* 变体 - Secondary */
.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--border-color);
  border-color: var(--text-muted);
}

/* 变体 - Outline */
.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 变体 - Ghost */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* 变体 - Danger */
.btn-danger {
  background: var(--danger);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 状态 - Block */
.btn-block {
  width: 100%;
}

/* 状态 - Loading */
.btn-loading {
  position: relative;
  pointer-events: none;
}

.btn-loading > *:not(.btn-spinner) {
  opacity: 0;
}

.btn-spinner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn-outline.btn-loading .btn-spinner,
.btn-ghost.btn-loading .btn-spinner,
.btn-secondary.btn-loading .btn-spinner {
  border-color: rgba(16, 185, 129, 0.3);
  border-top-color: var(--primary);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
