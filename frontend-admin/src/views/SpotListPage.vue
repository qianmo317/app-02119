<template>
  <div class="spot-list-page">
    <!-- 页面头部 - 深色背景 -->
    <div class="page-header-section">
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">
            <span class="title-icon">🗺️</span>
            <span>景点列表</span>
          </h1>
          <p class="page-subtitle">发现江门 {{ spotsStore.spots.length }} 个精选打卡点</p>
        </div>
        <div class="header-actions">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input
              v-model="spotsStore.searchKeyword"
              type="text"
              class="search-input"
              placeholder="搜索景点名称、地址..."
            >
            <button v-if="spotsStore.searchKeyword" class="search-clear" @click="spotsStore.setSearchKeyword('')">×</button>
          </div>
          <div class="sort-select" ref="sortSelectRef">
            <div class="sort-trigger" @click="toggleSortDropdown">
              <span>{{ sortLabels[sortBy] }}</span>
              <span class="sort-arrow" :class="{ open: sortDropdownOpen }">▼</span>
            </div>
            <div v-show="sortDropdownOpen" class="sort-dropdown">
              <div
                v-for="option in sortOptions"
                :key="option.value"
                class="sort-option"
                :class="{ active: sortBy === option.value }"
                @click="selectSort(option.value)"
              >
                {{ option.label }}
                <span v-if="sortBy === option.value" class="check-icon">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分类Tab -->
      <div class="category-tabs">
        <button
          v-for="cat in spotsStore.categories"
          :key="cat.id"
          class="category-tab"
          :class="{ active: spotsStore.selectedCategory === cat.id }"
          @click="handleCategoryChange(cat.id)"
        >
          <span class="tab-icon">{{ cat.icon }}</span>
          <span class="tab-name">{{ cat.name }}</span>
          <span v-if="cat.id !== 'all'" class="tab-count">{{ getCategoryCount(cat.id) }}</span>
        </button>
      </div>
    </div>

    <!-- 结果区域 -->
    <div class="results-section">
      <!-- 结果统计 + 筛选标签 -->
      <div class="results-bar">
        <div class="results-info">
          <span class="results-count">
            共 <strong>{{ sortedSpots.length }}</strong> 个景点
          </span>
          <span v-if="sortBy !== 'default'" class="sort-badge">
            {{ sortLabels[sortBy] }}排序
          </span>
        </div>
        <div v-if="spotsStore.searchKeyword || spotsStore.selectedCategory !== 'all'" class="filter-tags">
          <span v-if="spotsStore.selectedCategory !== 'all'" class="filter-tag">
            {{ getCategoryName(spotsStore.selectedCategory) }}
            <button @click="spotsStore.setCategory('all')">×</button>
          </span>
          <span v-if="spotsStore.searchKeyword" class="filter-tag search">
            "{{ spotsStore.searchKeyword }}"
            <button @click="spotsStore.setSearchKeyword('')">×</button>
          </span>
          <button class="clear-all" @click="resetFilters">清除全部</button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <span class="loading-text">加载中...</span>
        </div>
      </div>

      <div v-else-if="sortedSpots.length" class="spots-grid">
        <TransitionGroup name="list">
          <SpotCard
            v-for="spot in sortedSpots"
            :key="spot.id"
            :spot="spot"
          />
        </TransitionGroup>
      </div>

      <div v-else-if="!isLoading" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">没有找到相关景点</h3>
        <p class="empty-hint">试试其他关键词或分类</p>
        <button class="empty-btn" @click="resetFilters">
          清除筛选条件
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useSpotsStore } from '@/stores/spots'
import SpotCard from '@/components/business/SpotCard.vue'

const spotsStore = useSpotsStore()

const sortBy = ref('default')
const isLoading = ref(false)
const sortDropdownOpen = ref(false)
const sortSelectRef = ref(null)

const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'rating', label: '评分最高' },
  { value: 'name', label: '名称排序' }
]

const sortLabels = {
  default: '默认排序',
  rating: '评分最高',
  name: '名称排序'
}

const sortedSpots = computed(() => {
  let result = [...spotsStore.filteredSpots]

  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
      break
  }

  return result
})

// 模拟加载效果
function showLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

// 排序下拉控制
function toggleSortDropdown() {
  sortDropdownOpen.value = !sortDropdownOpen.value
}

function selectSort(value) {
  sortBy.value = value
  sortDropdownOpen.value = false
  showLoading()
}

function handleClickOutside(e) {
  if (sortSelectRef.value && !sortSelectRef.value.contains(e.target)) {
    sortDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 监听分类变化
function handleCategoryChange(categoryId) {
  spotsStore.setCategory(categoryId)
  showLoading()
}

// 监听搜索关键词变化
watch(() => spotsStore.searchKeyword, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showLoading()
  }
})

function getCategoryCount(id) {
  if (id === 'all') return spotsStore.spots.length
  return spotsStore.spots.filter(s => s.category === id).length
}

function getCategoryName(id) {
  const cat = spotsStore.categories.find(c => c.id === id)
  return cat ? cat.name : ''
}

function resetFilters() {
  spotsStore.setCategory('all')
  spotsStore.setSearchKeyword('')
  sortBy.value = 'default'
  showLoading()
}
</script>

<style scoped>
.spot-list-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: calc(-1 * var(--spacing-lg));
  margin-top: 0;
}

/* 页面头部区域 - 深色背景 */
.page-header-section {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
  padding: var(--spacing-xl) var(--spacing-lg) 0;
  position: relative;
}

.page-header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  position: relative;
  z-index: 2;
  margin-bottom: var(--spacing-xl);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.page-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: white;
}

.title-icon {
  font-size: 28px;
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  position: relative;
  z-index: 100;
}

/* 搜索框 */
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 14px;
  pointer-events: none;
}

.search-input {
  width: 260px;
  height: 40px;
  padding: 0 36px 0 40px;
  font-size: 14px;
  color: var(--text-primary);
  background: white;
  border: none;
  border-radius: var(--border-radius-md);
  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.search-clear {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--text-muted);
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.search-clear:hover {
  background: #e2e8f0;
  color: var(--text-secondary);
}

/* 排序下拉 */
.sort-select {
  position: relative;
  min-width: 120px;
  z-index: 200;
}

.sort-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  background: white;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  transition: all 0.2s;
}

.sort-trigger:hover {
  background: #f8fafc;
}

.sort-arrow {
  font-size: 10px;
  color: var(--text-muted);
  transition: transform 0.2s;
}

.sort-arrow.open {
  transform: rotate(180deg);
}

.sort-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  overflow: hidden;
}

.sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
}

.sort-option:hover {
  background: #f0fdf4;
}

.sort-option.active {
  color: #047857;
  font-weight: 500;
  background: #ecfdf5;
}

.check-icon {
  color: #047857;
  font-size: 12px;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding-bottom: 0;
  position: relative;
  z-index: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 18px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.category-tab:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.category-tab.active {
  background: white;
  color: var(--text-primary);
}

.tab-icon {
  font-size: 16px;
}

.tab-count {
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.category-tab.active .tab-count {
  background: #ecfdf5;
  color: #047857;
}

/* 结果区域 */
.results-section {
  padding: var(--spacing-xl);
  min-height: 400px;
  margin: var(--spacing-lg);
  margin-top: 0;
}

/* 结果统计栏 */
.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-lg);
  border: 1px solid #e2e8f0;
}

.results-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.results-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.results-count strong {
  color: #047857;
  font-weight: 600;
  font-size: var(--font-size-md);
}

.sort-badge {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  color: #0891b2;
  background: #ecfeff;
  border-radius: 20px;
}

/* Filter Tags */
.filter-tags {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: #7c3aed;
  background: #f5f3ff;
  border-radius: 20px;
}

.filter-tag.search {
  color: #0891b2;
  background: #ecfeff;
}

.filter-tag button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  line-height: 1;
  color: inherit;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s;
  padding: 0;
}

.filter-tag button:hover {
  background: rgba(0, 0, 0, 0.2);
}

.clear-all {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  transition: all 0.2s;
}

.clear-all:hover {
  color: #dc2626;
  background: #fef2f2;
}

.spots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: var(--border-radius-xl);
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  opacity: 0.8;
}

.empty-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.empty-btn {
  padding: 10px 24px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: #047857;
  background: white;
  border: 1px solid #d1fae5;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.empty-btn:hover {
  background: #ecfdf5;
  border-color: #047857;
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Loading 状态 */
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: var(--border-radius-xl);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #047857;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .header-actions :deep(.base-select) {
    width: 100%;
  }

  .category-tabs {
    margin: 0 calc(-1 * var(--spacing-lg));
    padding: 0 var(--spacing-lg);
  }

  .results-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .spots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
