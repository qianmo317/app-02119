# 周末江门市打卡点

## How to Run

```bash
# 使用 Docker Compose 运行
docker-compose up --build -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

本地开发运行：
```bash
cd frontend-admin
npm install
npm run dev -- --port 8084
```

## Services

| 服务名称 | 端口 | 描述 |
|---------|------|------|
| frontend-admin | 8081 | Vue3 前端应用（Docker） |
| frontend-admin | 8084 | Vue3 前端应用（本地开发） |

## 测试账号

无需登录，直接访问即可使用所有功能。

## 题目内容

基于Vue框架设计一个以“周末江门市打卡点”为主题的小型网站
要求：网站不少于3个页面，网站内容包含以下知识点（但不限于）：
1. 组件切换
2. 数据传递
3. 样式设计
4. 数据绑定
5. 指令
6. 插槽

---

## 项目介绍

这是一个展示江门市周末打卡景点的 Vue3 单页应用，帮助游客发现江门市的特色景点、美食和文化体验。

### 技术栈

- Vue 3 + Composition API
- Vue Router 4
- Pinia 状态管理
- Vite 构建工具

### 页面结构

1. **首页 (HomePage)** - 展示热门打卡点推荐、分类浏览、精选路线和城市概览
2. **景点列表 (SpotListPage)** - 分类浏览所有打卡点，支持筛选、搜索和排序
3. **景点详情 (SpotDetailPage)** - 查看景点详细信息、开放时间、门票和游玩攻略

### 知识点覆盖

| 知识点 | 实现位置 |
|--------|----------|
| 组件切换 | Vue Router 路由切换、Tab组件动态切换 |
| 数据传递 | Props/Emits父子通信、Pinia全局状态 |
| 样式设计 | Scoped CSS、CSS变量主题、响应式布局 |
| 数据绑定 | v-model双向绑定、计算属性、侦听器 |
| 指令 | v-if/v-show/v-for、自定义指令v-lazy |
| 插槽 | 默认插槽、具名插槽（BaseCard组件） |

### 项目结构

```
├── .gitignore                       # Git忽略配置
├── docker-compose.yml               # Docker编排配置
├── README.md                        # 项目说明文档
└── frontend-admin/                  # 前端项目目录
    ├── src/
    │   ├── components/              # 组件目录
    │   │   ├── business/            # 业务组件
    │   │   │   ├── SearchBar.vue    # 搜索栏
    │   │   │   └── SpotCard.vue     # 景点卡片
    │   │   └── common/              # 通用UI组件
    │   │       ├── AppFooter.vue    # 页脚
    │   │       ├── AppHeader.vue    # 页头导航
    │   │       ├── BaseButton.vue   # 按钮组件
    │   │       ├── BaseCard.vue     # 卡片组件
    │   │       ├── BaseInput.vue    # 输入框组件
    │   │       ├── BaseSelect.vue   # 下拉选择组件
    │   │       ├── RatingStars.vue  # 评分星星
    │   │       ├── TabGroup.vue     # 标签页组件
    │   │       └── Toast.vue        # 提示消息
    │   ├── directives/              # 自定义指令
    │   │   └── lazyLoad.js          # 图片懒加载指令
    │   ├── img/                     # 景点图片资源（16张）
    │   ├── router/                  # 路由配置
    │   │   └── index.js             # 路由定义
    │   ├── stores/                  # Pinia状态管理
    │   │   ├── spots.js             # 景点数据状态
    │   │   └── toast.js             # 提示消息状态
    │   ├── styles/                  # 全局样式
    │   │   └── main.css             # 主样式文件
    │   ├── utils/                   # 工具函数
    │   │   └── helpers.js           # 辅助函数（图片处理等）
    │   ├── views/                   # 页面视图
    │   │   ├── HomePage.vue         # 首页
    │   │   ├── SpotDetailPage.vue   # 景点详情页
    │   │   └── SpotListPage.vue     # 景点列表页
    │   ├── App.vue                  # 根组件
    │   └── main.js                  # 入口文件
    ├── public/                      # 公共资源
    │   └── favicon.svg              # 网站图标
    ├── index.html                   # HTML模板
    ├── package.json                 # 项目依赖
    ├── vite.config.js               # Vite配置
    ├── Dockerfile                   # Docker构建文件
    └── nginx.conf                   # Nginx配置
```
