<template>
  <div v-if="spot" class="spot-detail-page">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">← 返回列表</button>

    <!-- 新布局：左右分栏，图片+信息 -->
    <div class="hero-section">
      <!-- 左侧：大图展示区 -->
      <div class="image-showcase">
        <div class="image-frame">
          <img
            :src="imageUrl"
            :alt="spot.name"
            fetchpriority="high"
            decoding="async"
            @load="onImageLoad"
            :class="{ loaded: imageLoaded }"
          >
          <span class="spot-category-badge">{{ spot.categoryName }}</span>
        </div>
      </div>

      <!-- 右侧：核心信息面板 -->
      <div class="info-panel">
        <div class="panel-header">
          <h1 class="spot-title">{{ spot.name }}</h1>
          <RatingStars :rating="spot.rating" />
        </div>

        <div class="quick-facts">
          <div class="fact-item">
            <span class="fact-icon">📍</span>
            <div class="fact-content">
              <span class="fact-label">地址</span>
              <span class="fact-value">{{ spot.address }}</span>
            </div>
          </div>
          <div class="fact-item">
            <span class="fact-icon">🕐</span>
            <div class="fact-content">
              <span class="fact-label">开放时间</span>
              <span class="fact-value">{{ spot.openTime }}</span>
            </div>
          </div>
          <div class="fact-item">
            <span class="fact-icon">🎫</span>
            <div class="fact-content">
              <span class="fact-label">门票</span>
              <span class="fact-value highlight">{{ spot.ticket }}</span>
            </div>
          </div>
        </div>

        <p class="brief-intro">{{ spot.description }}</p>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-content">
      <!-- 景点介绍 -->
      <BaseCard class="intro-card">
        <template #header>📖 景点介绍</template>
        <p class="description">{{ spot.fullDescription }}</p>
      </BaseCard>

      <!-- 游玩攻略 -->
      <BaseCard class="tips-card">
        <template #header>💡 游玩攻略</template>
        <ul class="tips-list">
          <li v-for="(tip, index) in spot.tips" :key="index" class="tip-item">
            <span class="tip-icon">✓</span>
            {{ tip }}
          </li>
        </ul>
      </BaseCard>
    </div>

    <!-- 相似推荐 -->
    <div v-if="similarSpots.length > 0" class="similar-section">
      <h2 class="section-title">✨ 相似推荐</h2>
      <div class="similar-grid">
        <div
          v-for="item in similarSpots"
          :key="item.id"
          class="similar-card"
          @click="goToSpotDetail(item.id)"
        >
          <div class="similar-image-wrapper">
            <img
              v-lazy="getPlaceholderImage(item.image)"
              :alt="item.name"
              class="similar-image"
            >
            <span class="similar-category">{{ item.categoryName }}</span>
          </div>
          <div class="similar-info">
            <h3 class="similar-name">{{ item.name }}</h3>
            <div class="similar-meta">
              <span class="hot-badge">🔥 {{ formatViews(item.views) }} 热度</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 404状态 -->
  <div v-else class="not-found">
    <span class="not-found-icon">😕</span>
    <h2>景点不存在</h2>
    <p>您访问的景点可能已被移除</p>
    <BaseButton variant="primary" @click="goBack">返回列表</BaseButton>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSpotsStore } from '@/stores/spots'
import { getPlaceholderImage } from '@/utils/helpers'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import RatingStars from '@/components/common/RatingStars.vue'

const route = useRoute()
const router = useRouter()
const spotsStore = useSpotsStore()

const spot = computed(() => spotsStore.getSpotById(route.params.id))
// 详情页使用原始图片，不传尺寸参数，保持最高清晰度
const imageUrl = computed(() => spot.value ? getPlaceholderImage(spot.value.image) : '')

const similarSpots = computed(() => {
  if (!spot.value) return []
  return spotsStore.getSimilarSpots(spot.value.id, 3)
})

const imageLoaded = ref(false)
function onImageLoad() {
  imageLoaded.value = true
}

function goBack() {
  router.push('/spots')
}

function goToSpotDetail(id) {
  router.push(`/spot/${id}`)
}

function formatViews(views) {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + 'w'
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k'
  }
  return views.toString()
}
</script>

<style scoped>
.spot-detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-top: 24px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
}

.back-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
}

/* ========== 新布局：左右分栏 ========== */
.hero-section {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 左侧图片展示区 */
.image-showcase {
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-frame {
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.image-frame img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-frame img.loaded {
  opacity: 1;
}

.spot-category-badge {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary) 0%, #0d9488 100%);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 右侧信息面板 */
.info-panel {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-lg);
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.spot-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
}

.quick-facts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: var(--border-radius-lg);
  border: 1px solid #bae6fd;
}

.fact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.fact-icon {
  font-size: 1.25rem;
  line-height: 1;
  flex-shrink: 0;
}

.fact-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fact-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fact-value {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 500;
}

.fact-value.highlight {
  color: var(--primary);
  font-weight: 600;
}

.brief-intro {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ========== 详情内容区 ========== */
.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* 景点介绍卡片 */
.intro-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%);
  border: 1px solid #a7f3d0;
}

.intro-card :deep(.card-header) {
  background: linear-gradient(135deg, #047857 0%, #0f766e 100%);
  color: white;
  border-bottom: none;
}

/* 游玩攻略卡片 */
.tips-card {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
}

.tips-card :deep(.card-header) {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  color: white;
  border-bottom: none;
}

.description {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.8;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.tip-icon {
  color: #d97706;
  font-weight: bold;
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

/* ========== 相似推荐模块 ========== */
.similar-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.similar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.similar-card {
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color-light);
  cursor: pointer;
  transition: all var(--transition-slow);
}

.similar-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--border-color);
}

.similar-card:hover .similar-image {
  transform: scale(1.05);
}

.similar-image-wrapper {
  position: relative;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.similar-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-slow);
}

.similar-category {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: white;
  background: linear-gradient(135deg, var(--primary) 0%, #0d9488 100%);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.similar-info {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.similar-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.similar-meta {
  display: flex;
  align-items: center;
}

.hot-badge {
  font-size: var(--font-size-sm);
  color: #ea580c;
  font-weight: 500;
}

/* ========== 404 状态 ========== */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  text-align: center;
}

.not-found-icon {
  font-size: 64px;
}

.not-found h2 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.not-found p {
  color: var(--text-muted);
}

/* ========== 响应式：移动端垂直堆叠 ========== */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .image-showcase {
    padding: var(--spacing-md);
  }

  .image-frame img {
    aspect-ratio: 16 / 10;
  }

  .info-panel {
    padding: var(--spacing-lg);
  }

  .spot-title {
    font-size: 1.5rem;
  }

  .quick-facts {
    padding: var(--spacing-md);
  }

  .similar-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .similar-image {
    height: 180px;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>
