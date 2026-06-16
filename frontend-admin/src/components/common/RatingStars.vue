<template>
  <div class="rating" :title="`评分: ${rating}`">
    <span
      v-for="i in 5"
      :key="i"
      :class="['star', { filled: i <= Math.round(rating), half: i === Math.ceil(rating) && rating % 1 >= 0.3 }]"
    >
      ★
    </span>
    <span v-if="showValue" class="rating-value">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 5
  },
  showValue: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.star {
  color: var(--border-color);
  font-size: var(--font-size-md);
  transition: color 0.2s;
}

.star.filled {
  color: #fbbf24;
}

.rating-value {
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
}
</style>
