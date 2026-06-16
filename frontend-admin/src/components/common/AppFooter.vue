<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-info">
        <p class="footer-title">🏙️ 周末江门打卡</p>
        <p class="footer-desc">发现侨乡之美，探索岭南风情</p>
      </div>
      <div class="footer-links">
        <router-link to="/" class="footer-link">首页</router-link>
        <span class="divider">·</span>
        <router-link to="/spots" class="footer-link">景点列表</router-link>
      </div>
      <p class="copyright">© 2026 周末江门 · 用心发现美好</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  color: var(--text-secondary);
  padding: var(--spacing-xl) var(--spacing-lg);
  margin-top: auto;
  border-top: 1px solid #e2e8f0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.footer-desc {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.footer-link {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #047857;
  background: #ecfdf5;
}

.divider {
  color: var(--text-muted);
  user-select: none;
}

.copyright {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}
</style>
