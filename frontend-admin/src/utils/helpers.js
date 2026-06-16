// 导入所有图片
import kaipingImg from '@/img/kaiping.webp'
import xiaoniaoImg from '@/img/xiaoniao.webp'
import gulaoImg from '@/img/gulao.webp'
import chenpiImg from '@/img/chenpi.webp'
import taishanImg from '@/img/taishan.webp'
import changdiImg from '@/img/changdi.webp'
import liyuanImg from '@/img/liyuan.webp'
import shangxiaImg from '@/img/shangxia.webp'
import chikanImg from '@/img/chikan.webp'
import guifengImg from '@/img/guifeng.webp'
import enpingImg from '@/img/enping.webp'
import taihsanImg from '@/img/taihsan.webp'
import wuyiImg from '@/img/wuyi.webp'
import langqingImg from '@/img/langqing.webp'
import xinhuiImg from '@/img/xinhui.webp'
import waihaiImg from '@/img/waihai.webp'

// 图片映射
const imageMap = {
  kaiping: kaipingImg,
  xiaoniao: xiaoniaoImg,
  gulao: gulaoImg,
  chenpi: chenpiImg,
  taishan: taishanImg,
  changdi: changdiImg,
  liyuan: liyuanImg,
  shangxia: shangxiaImg,
  chikan: chikanImg,
  guifeng: guifengImg,
  enping: enpingImg,
  taihsan: taihsanImg,
  wuyi: wuyiImg,
  langqing: langqingImg,
  xinhui: xinhuiImg,
  waihai: waihaiImg
}

// 获取景点图片
export function getPlaceholderImage(type, width = 400, height = 300) {
  // 如果有对应的真实图片，返回真实图片
  if (imageMap[type]) {
    return imageMap[type]
  }

  // 否则返回占位图
  const colors = {
    heritage: { bg: '#fefce8', text: '#854d0e', icon: '🏛️' },
    nature: { bg: '#f0fdf4', text: '#166534', icon: '🌿' },
    food: { bg: '#fef2f2', text: '#991b1b', icon: '🍜' },
    beach: { bg: '#f0f9ff', text: '#1e40af', icon: '🏖️' },
    water: { bg: '#ecfeff', text: '#0e7490', icon: '💧' },
    street: { bg: '#fefce8', text: '#854d0e', icon: '🏘️' },
    garden: { bg: '#f0fdf4', text: '#166534', icon: '🌸' },
    island: { bg: '#f0f9ff', text: '#1e40af', icon: '🏝️' },
    town: { bg: '#fefce8', text: '#854d0e', icon: '🏘️' },
    mountain: { bg: '#f0fdf4', text: '#166534', icon: '⛰️' },
    spa: { bg: '#fdf2f8', text: '#9d174d', icon: '♨️' },
    blackbeach: { bg: '#f3f4f6', text: '#374151', icon: '🖤' },
    museum: { bg: '#fefce8', text: '#854d0e', icon: '🏛️' },
    bay: { bg: '#f0f9ff', text: '#1e40af', icon: '🌊' },
    temple: { bg: '#fefce8', text: '#854d0e', icon: '🏯' },
    temple2: { bg: '#fefce8', text: '#854d0e', icon: '🛕' },
    leisure: { bg: '#fdf2f8', text: '#9d174d', icon: '🎯' },
    default: { bg: '#f9fafb', text: '#4b5563', icon: '📍' }
  }

  const config = colors[type] || colors.default

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${config.bg}" width="${width}" height="${height}"/>
    <rect fill="${config.text}" opacity="0.08" x="${width * 0.3}" y="${height * 0.25}" width="${width * 0.4}" height="${height * 0.35}" rx="10"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${config.text}" font-size="42">${config.icon}</text>
  </svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// 格式化评分
export function formatRating(rating) {
  return rating.toFixed(1)
}

// 防抖函数
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
