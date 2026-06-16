<template>
  <BaseCard hoverable clickable @click="goToDetail">
    <template #image>
      <img v-lazy="imageUrl" :alt="spot.name" class="spot-image">
      <span class="spot-category">{{ spot.categoryName }}</span>
    </template>

    <div class="spot-info">
      <h3 class="spot-name">{{ spot.name }}</h3>
      <RatingStars :rating="spot.rating" />
      <p class="spot-address">📍 {{ spot.address }}</p>
      <p class="spot-desc">{{ spot.description }}</p>
    </div>

    <template #footer>
      <div class="spot-footer">
        <span class="spot-ticket">🎫 {{ spot.ticket }}</span>
        <span class="spot-time">🕐 {{ spot.openTime }}</span>
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPlaceholderImage } from '@/utils/helpers'
import BaseCard from '@/components/common/BaseCard.vue'
import RatingStars from '@/components/common/RatingStars.vue'

const props = defineProps({
  spot: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const imageUrl = computed(() => getPlaceholderImage(props.spot.image))

function goToDetail() {
  router.push(`/spot/${props.spot.id}`)
}
</script>

<style scoped>
.spot-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.spot-category {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  border-radius: var(--border-radius-sm);
}

.spot-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.spot-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.spot-address {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.spot-desc {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spot-footer {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}
</style>
