<template>
  <div :class="['base-card', { 'base-card-hover': hoverable, 'base-card-clickable': clickable }]" @click="handleClick">
    <!-- 头部插槽 -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <!-- 图片插槽 -->
    <div v-if="$slots.image" class="card-image">
      <slot name="image"></slot>
    </div>

    <!-- 默认内容插槽 -->
    <div class="card-body" :class="{ 'card-body-compact': compact }">
      <slot></slot>
    </div>

    <!-- 底部插槽 -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hoverable: Boolean,
  clickable: Boolean,
  compact: Boolean
})

const emit = defineEmits(['click'])

function handleClick(e) {
  if (props.clickable) {
    emit('click', e)
  }
}
</script>

<style scoped>
.base-card {
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color-light);
  overflow: hidden;
  transition: all var(--transition-slow);
}

.base-card-hover:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--border-color);
}

.base-card-clickable {
  cursor: pointer;
}

.base-card-clickable:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.card-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.card-image {
  position: relative;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.base-card-hover:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: var(--spacing-lg);
}

.card-body-compact {
  padding: var(--spacing-md);
}

.card-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}
</style>
