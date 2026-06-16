<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="logo">
        <span class="logo-icon">🏙️</span>
        <span class="logo-text">周末江门</span>
        <span class="logo-badge">打卡指南</span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active">
          <span class="nav-icon">🏠</span>
          <span>首页</span>
        </router-link>
        <router-link to="/spots" class="nav-link" active-class="active">
          <span class="nav-icon">🗺️</span>
          <span>景点</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 28px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.logo-text {
  background: linear-gradient(135deg, #047857, #0d9488);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-badge {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: #047857;
  background: #ecfdf5;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 4px;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #047857;
  background: #f0fdf4;
}

.nav-link.active {
  color: #047857;
  background: #ecfdf5;
}

.nav-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .logo-text, .logo-badge {
    display: none;
  }

  .nav-link span:not(.nav-icon) {
    display: none;
  }

  .nav-link {
    padding: var(--spacing-sm);
  }

  .nav-icon {
    font-size: 20px;
  }
}
</style>
