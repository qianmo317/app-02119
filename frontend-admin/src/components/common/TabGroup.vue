<template>
  <div class="tab-group">
    <div class="tab-list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-item', { active: modelValue === tab.id }]"
        role="tab"
        :aria-selected="modelValue === tab.id"
        @click="$emit('update:modelValue', tab.id)"
      >
        <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.name }}</span>
      </button>
    </div>
    <div class="tab-content">
      <!-- 作用域插槽：传递当前选中的tab -->
      <slot :activeTab="modelValue"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.tab-group {
  display: flex;
  flex-direction: column;
}

.tab-list {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  background: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  overflow-x: auto;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--border-radius-md);
  white-space: nowrap;
  transition: all 0.2s;
}

.tab-item:hover {
  color: var(--text-primary);
  background: var(--bg-primary);
}

.tab-item.active {
  color: var(--primary);
  background: var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.tab-icon {
  font-size: var(--font-size-md);
}

.tab-content {
  padding-top: var(--spacing-lg);
}

@media (max-width: 768px) {
  .tab-list {
    padding: var(--spacing-xs);
  }

  .tab-item {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .tab-label {
    display: none;
  }

  .tab-icon {
    font-size: var(--font-size-lg);
  }
}
</style>
