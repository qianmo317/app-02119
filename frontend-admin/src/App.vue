<template>
  <div class="app">
    <template v-if="!route.meta?.hideLayout">
      <AppHeader />
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <AppFooter />
    </template>
    <template v-else>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
    <Toast />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import Toast from '@/components/common/Toast.vue'

const route = useRoute()
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e8f5f0 0%, #f0f4f8 100%);
}

.main-content {
  flex: 1;
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  max-width: 1200px;
  margin: var(--spacing-lg) auto;
  width: calc(100% - var(--spacing-lg) * 2);
  background: white;
  border-radius: var(--border-radius-xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
