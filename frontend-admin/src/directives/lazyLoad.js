// 自定义指令：图片懒加载
export const lazyLoad = {
  mounted(el, binding) {
    // 生成加载中占位图 - 使用 encodeURIComponent 避免中文编码问题
    const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#f3f4f6" width="400" height="300"/>
      <circle cx="200" cy="140" r="20" fill="none" stroke="#9ca3af" stroke-width="3" stroke-dasharray="80" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 200 140" to="360 200 140" dur="1s" repeatCount="indefinite"/>
      </circle>
    </svg>`
    const loadingPlaceholder = `data:image/svg+xml,${encodeURIComponent(loadingSvg)}`

    el.src = loadingPlaceholder
    el.classList.add('lazy-image')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = binding.value
            el.classList.add('lazy-loaded')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    el._lazyObserver = observer
  },

  unmounted(el) {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect()
    }
  }
}
