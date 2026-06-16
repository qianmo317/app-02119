<template>
  <div class="home-page">
    <!-- Hero区域 -->
    <section class="hero">
      <!-- 装饰元素 -->
      <div class="hero-decorations">
        <div class="decoration decoration-1">🏛️</div>
        <div class="decoration decoration-2">🌿</div>
        <div class="decoration decoration-3">🏖️</div>
        <div class="decoration decoration-4">🍜</div>
        <div class="decoration decoration-5">⛵</div>
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">📍</span>
          <span>粤港澳大湾区 · 中国第一侨乡</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">周末去哪玩？</span>
          <span class="title-highlight">江门等你来打卡</span>
        </h1>
        <p class="hero-subtitle">
          世界文化遗产开平碉楼 · 巴金笔下小鸟天堂 · 岭南水乡古劳 · 滨海度假胜地
        </p>
        <div class="hero-actions">
          <button class="hero-btn primary" @click="goToSpots">
            <span>🗺️ 探索景点</span>
          </button>
          <button class="hero-btn secondary" @click="scrollToHot">
            <span>🔥 热门推荐</span>
          </button>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-icon">🏛️</span>
          <span class="stat-value">{{ spotsStore.spots.length }}</span>
          <span class="stat-label">精选景点</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">📂</span>
          <span class="stat-value">{{ spotsStore.categories.length - 1 }}</span>
          <span class="stat-label">特色分类</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">4.5+</span>
          <span class="stat-label">平均评分</span>
        </div>
      </div>
    </section>

    <!-- 热门推荐 -->
    <section class="section" id="hot-section">
      <div class="section-header">
        <h2 class="section-title">🔥 热门推荐</h2>
        <router-link to="/spots" class="section-link">查看全部 →</router-link>
      </div>
      <div class="spots-grid">
        <SpotCard v-for="spot in hotSpots" :key="spot.id" :spot="spot" />
      </div>
    </section>

    <!-- 分类导航 -->
    <section class="section category-section">
      <div class="section-header-decorated">
        <span class="section-icon">📍</span>
        <h2 class="section-title-white">分类浏览</h2>
        <p class="section-subtitle">选择你感兴趣的类型，开启专属旅程</p>
      </div>
      <div class="category-grid">
        <div
          v-for="cat in spotsStore.categories.slice(1)"
          :key="cat.id"
          class="category-card"
          :class="cat.id"
          @click="goToCategory(cat.id)"
        >
          <div class="category-icon-wrap" :class="cat.id">
            <span class="category-icon">{{ cat.icon }}</span>
          </div>
          <div class="category-info">
            <span class="category-name">{{ cat.name }}</span>
            <span class="category-count">{{ getCategoryCount(cat.id) }} 个精选景点</span>
          </div>
          <div class="category-arrow">
            <span>探索</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选路线推荐 -->
    <section class="section routes-section">
      <div class="section-header-light">
        <span class="section-icon-light">🗺️</span>
        <h2 class="section-title">精选路线</h2>
        <p class="section-subtitle-light">为你规划完美的周末行程</p>
      </div>
      <div class="routes-grid">
        <div class="route-card heritage" @click="selectRoute('heritage')">
          <div class="route-badge">推荐</div>
          <div class="route-icon-wrap">
            <span class="route-icon">🏛️</span>
          </div>
          <div class="route-body">
            <h3 class="route-name">世遗文化之旅</h3>
            <p class="route-desc">探访世界文化遗产开平碉楼，感受百年侨乡历史文化</p>
            <div class="route-spots">
              <span class="spot-tag">开平碉楼</span>
              <span class="spot-tag">立园</span>
              <span class="spot-tag">赤坎古镇</span>
            </div>
            <div class="route-footer">
              <div class="route-meta">
                <span>⏱️ 1-2天</span>
                <span>📍 开平市</span>
              </div>
              <span class="route-action">查看详情 →</span>
            </div>
          </div>
        </div>

        <div class="route-card beach" @click="selectRoute('beach')">
          <div class="route-badge hot">热门</div>
          <div class="route-icon-wrap">
            <span class="route-icon">🏖️</span>
          </div>
          <div class="route-body">
            <h3 class="route-name">滨海度假之旅</h3>
            <p class="route-desc">阳光沙滩海浪仙人掌，享受悠闲惬意的海岛时光</p>
            <div class="route-spots">
              <span class="spot-tag">上下川岛</span>
              <span class="spot-tag">浪琴湾</span>
              <span class="spot-tag">黑沙湾</span>
            </div>
            <div class="route-footer">
              <div class="route-meta">
                <span>⏱️ 2-3天</span>
                <span>📍 台山市</span>
              </div>
              <span class="route-action">查看详情 →</span>
            </div>
          </div>
        </div>

        <div class="route-card nature" @click="selectRoute('nature')">
          <div class="route-icon-wrap">
            <span class="route-icon">🌿</span>
          </div>
          <div class="route-body">
            <h3 class="route-name">生态休闲之旅</h3>
            <p class="route-desc">亲近自然放松身心，感受岭南水乡的诗情画意</p>
            <div class="route-spots">
              <span class="spot-tag">小鸟天堂</span>
              <span class="spot-tag">古劳水乡</span>
              <span class="spot-tag">圭峰山</span>
            </div>
            <div class="route-footer">
              <div class="route-meta">
                <span>⏱️ 1天</span>
                <span>📍 新会/鹤山</span>
              </div>
              <span class="route-action">查看详情 →</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 城市介绍 -->
    <section class="section">
      <div class="city-intro">
        <div class="intro-icon">🌟</div>
        <h2 class="intro-title">关于江门</h2>
        <p class="intro-text">
          江门市，位于广东省中南部，珠江三角洲西部，是粤港澳大湾区重要节点城市。
          江门素有"中国第一侨乡"之称，是海外华侨华人的重要祖籍地。
          这里有世界文化遗产开平碉楼、巴金笔下的小鸟天堂、岭南水乡古劳等众多特色景点，
          还有新会陈皮、台山海鲜等地道美食，是周末休闲度假的绝佳选择。
        </p>
        <div class="intro-tags">
          <span class="tag">世界遗产</span>
          <span class="tag">侨乡文化</span>
          <span class="tag">岭南风情</span>
          <span class="tag">美食天堂</span>
          <span class="tag">滨海度假</span>
          <span class="tag">温泉养生</span>
        </div>
        <div class="intro-action">
          <button class="intro-btn" @click="goToSpots">
            开始探索江门 →
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSpotsStore } from '@/stores/spots'
import SpotCard from '@/components/business/SpotCard.vue'

const router = useRouter()
const spotsStore = useSpotsStore()

// 热门景点（按浏览量和评分排序）
const hotSpots = computed(() => {
  return [...spotsStore.spots]
    .filter(s => s.hot || s.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
})

function goToSpots() {
  router.push('/spots')
}

function goToCategory(categoryId) {
  spotsStore.setCategory(categoryId)
  router.push('/spots')
}

function getCategoryCount(categoryId) {
  return spotsStore.spots.filter(s => s.category === categoryId).length
}

function selectRoute(type) {
  spotsStore.setCategory(type)
  router.push('/spots')
}

function scrollToHot() {
  const el = document.getElementById('hot-section')
  if (el) {
    const headerHeight = 80
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - headerHeight,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-top: 24px;
}

/* Hero */
.hero {
  position: relative;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 50%, #f0f9ff 100%);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-2xl) var(--spacing-xl);
  text-align: center;
  overflow: hidden;
}

.hero-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decoration {
  position: absolute;
  font-size: 32px;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
}

.decoration-1 { top: 10%; left: 8%; animation-delay: 0s; }
.decoration-2 { top: 20%; right: 12%; animation-delay: 1s; }
.decoration-3 { bottom: 25%; left: 15%; animation-delay: 2s; }
.decoration-4 { bottom: 15%; right: 8%; animation-delay: 3s; }
.decoration-5 { top: 50%; left: 5%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  top: -100px;
  right: -50px;
  animation: pulse 8s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  bottom: -50px;
  left: -50px;
  animation: pulse 10s ease-in-out infinite reverse;
}

.circle-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  top: 40%;
  left: 20%;
  animation: pulse 12s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.1); opacity: 0.15; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.badge-icon {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
}

.title-line {
  display: block;
  color: var(--text-primary);
}

.title-highlight {
  display: block;
  background: linear-gradient(135deg, #047857, #0891b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-md);
  font-weight: 600;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.hero-btn.primary {
  background: linear-gradient(135deg, #047857, #0f766e);
  color: white;
  box-shadow: 0 4px 15px rgba(4, 120, 87, 0.3);
}

.hero-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(4, 120, 87, 0.4);
}

.hero-btn.secondary {
  background: white;
  color: var(--text-primary);
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.hero-btn.secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-icon {
  font-size: 24px;
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

/* Section */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
}

.section-link {
  font-size: var(--font-size-sm);
  color: #047857;
  transition: all 0.2s;
}

.section-link:hover {
  color: #065f46;
}

/* Spots Grid */
.spots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

/* Category Section - 深色背景区分 */
.category-section {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
  margin-left: calc(-1 * var(--spacing-lg));
  margin-right: calc(-1 * var(--spacing-lg));
  padding: var(--spacing-2xl) var(--spacing-lg);
  border-radius: var(--border-radius-xl);
  position: relative;
  overflow: hidden;
}

.category-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.section-header-decorated {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.section-icon {
  display: inline-block;
  font-size: 36px;
  margin-bottom: var(--spacing-sm);
  animation: bounce 2s ease-in-out infinite;
}

.section-title-white {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-xs);
}

.section-subtitle {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-md);
  position: relative;
  z-index: 1;
}

.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl) var(--spacing-lg);
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.category-icon-wrap {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.category-icon-wrap.heritage { background: linear-gradient(135deg, #f5f3ff, #ede9fe); }
.category-icon-wrap.nature { background: linear-gradient(135deg, #ecfdf5, #d1fae5); }
.category-icon-wrap.food { background: linear-gradient(135deg, #fff7ed, #ffedd5); }
.category-icon-wrap.beach { background: linear-gradient(135deg, #ecfeff, #cffafe); }
.category-icon-wrap.leisure { background: linear-gradient(135deg, #fdf2f8, #fce7f3); }

.category-card:hover .category-icon-wrap {
  transform: scale(1.1) rotate(5deg);
}

.category-icon {
  font-size: 32px;
}

.category-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.category-count {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.category-arrow {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.category-card.heritage .category-arrow { color: #7c3aed; background: #f5f3ff; }
.category-card.nature .category-arrow { color: #059669; background: #ecfdf5; }
.category-card.food .category-arrow { color: #ea580c; background: #fff7ed; }
.category-card.beach .category-arrow { color: #0891b2; background: #ecfeff; }
.category-card.leisure .category-arrow { color: #db2777; background: #fdf2f8; }

.category-card:hover .category-arrow {
  transform: translateX(3px);
}

.arrow {
  transition: transform 0.3s ease;
}

.category-card:hover .arrow {
  transform: translateX(3px);
}

/* Routes Section - 浅色渐变背景 */
.routes-section {
  background: linear-gradient(180deg, #fefce8 0%, #fef9c3 50%, #fef08a 100%);
  margin-left: calc(-1 * var(--spacing-lg));
  margin-right: calc(-1 * var(--spacing-lg));
  padding: var(--spacing-2xl) var(--spacing-lg);
  border-radius: var(--border-radius-xl);
}

.section-header-light {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-icon-light {
  display: inline-block;
  font-size: 36px;
  margin-bottom: var(--spacing-sm);
}

.section-subtitle-light {
  font-size: var(--font-size-sm);
  color: #92400e;
  opacity: 0.8;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.route-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  background: white;
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.route-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.route-card.heritage::before { background: linear-gradient(90deg, #a78bfa, #7c3aed); }
.route-card.beach::before { background: linear-gradient(90deg, #67e8f9, #0891b2); }
.route-card.nature::before { background: linear-gradient(90deg, #6ee7b7, #059669); }

.route-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.route-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #7c3aed;
  background: #f5f3ff;
  border-radius: 20px;
}

.route-badge.hot {
  color: #dc2626;
  background: #fef2f2;
}

.route-icon-wrap {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: var(--spacing-lg);
  transition: transform 0.3s ease;
}

.route-card.heritage .route-icon-wrap {
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
}

.route-card.beach .route-icon-wrap {
  background: linear-gradient(135deg, #ecfeff, #cffafe);
}

.route-card.nature .route-icon-wrap {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
}

.route-card:hover .route-icon-wrap {
  transform: scale(1.1) rotate(-5deg);
}

.route-icon {
  font-size: 36px;
}

.route-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.route-name {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.route-card.heritage .route-name { color: #6d28d9; }
.route-card.beach .route-name { color: #0e7490; }
.route-card.nature .route-name { color: #047857; }

.route-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.route-spots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
}

.spot-tag {
  padding: 6px 14px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: 20px;
}

.route-card.heritage .spot-tag {
  background: #f5f3ff;
  color: #7c3aed;
}

.route-card.beach .spot-tag {
  background: #ecfeff;
  color: #0891b2;
}

.route-card.nature .spot-tag {
  background: #ecfdf5;
  color: #059669;
}

.route-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid #f1f5f9;
  margin-top: auto;
}

.route-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.route-action {
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: transform 0.3s ease;
}

.route-card.heritage .route-action { color: #7c3aed; }
.route-card.beach .route-action { color: #0891b2; }
.route-card.nature .route-action { color: #059669; }

.route-card:hover .route-action {
  transform: translateX(5px);
}

/* City Intro */
.city-intro {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-2xl);
  text-align: center;
}

.intro-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-md);
}

.intro-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.intro-text {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.intro-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.tag {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  color: #92400e;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--border-radius-md);
}

.intro-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-md);
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #d97706, #b45309);
  border: none;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.intro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(217, 119, 6, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero-stats {
    gap: var(--spacing-md);
  }

  .stat-value {
    font-size: var(--font-size-xl);
  }

  .spots-grid {
    grid-template-columns: 1fr;
  }

  .category-section,
  .routes-section {
    margin-left: calc(-1 * var(--spacing-md));
    margin-right: calc(-1 * var(--spacing-md));
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .category-card {
    padding: var(--spacing-md);
  }

  .category-icon-wrap {
    width: 48px;
    height: 48px;
  }

  .category-icon {
    font-size: 24px;
  }

  .routes-grid {
    grid-template-columns: 1fr;
  }

  .decoration {
    display: none;
  }
}
</style>
