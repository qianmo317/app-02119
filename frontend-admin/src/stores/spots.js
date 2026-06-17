import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSpotsStore = defineStore('spots', () => {
  const spots = ref([
    {
      id: 1,
      name: '开平碉楼',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.8,
      address: '江门市开平市塘口镇',
      description: '世界文化遗产，中西合璧的建筑艺术瑰宝，见证华侨历史的独特建筑群。',
      fullDescription: '开平碉楼是中国乡土建筑的一个特殊类型，是集防卫、居住和中西建筑艺术于一体的多层塔楼式建筑。2007年被列入《世界遗产名录》。这里有1833座碉楼，分布在开平市的乡村中，是华侨文化的重要见证。自力村碉楼群、马降龙碉楼群、锦江里碉楼群等都是必打卡的经典景点。',
      tips: ['建议游览时间：3-4小时', '最佳拍照时间：下午4-6点', '可租借讲解器深入了解历史', '推荐路线：自力村→立园→马降龙'],
      openTime: '08:30-17:30',
      ticket: '180元（联票）',
      image: 'kaiping',
      hot: true,
      views: 12580
    },
    {
      id: 2,
      name: '小鸟天堂',
      category: 'nature',
      categoryName: '自然风光',
      rating: 4.6,
      address: '江门市新会区天马村',
      description: '巴金笔下的"鸟的天堂"，一棵大榕树成林，万鸟栖息的生态奇观。',
      fullDescription: '小鸟天堂是一个以独特的大榕树和群鸟生态为主题的景区。这棵有500多年历史的古榕树，独木成林，覆盖面积达20多亩，栖息着数万只鸟类。巴金先生曾两次到访并写下著名散文《鸟的天堂》。每天清晨和傍晚，成千上万的鸟儿在榕树间飞翔，场面十分壮观。',
      tips: ['清晨和傍晚是观鸟最佳时间', '带上望远镜效果更佳', '乘船游览体验更好', '建议游览时间：2小时'],
      openTime: '07:30-18:00',
      ticket: '50元',
      image: 'xiaoniao',
      hot: true,
      views: 9860
    },
    {
      id: 3,
      name: '古劳水乡',
      category: 'nature',
      categoryName: '自然风光',
      rating: 4.5,
      address: '江门市鹤山市古劳镇',
      description: '岭南水乡典范，纵横交错的河涌，保留着原汁原味的水乡风情。',
      fullDescription: '古劳水乡有着700多年的历史，是珠三角地区保存最完好的水乡之一。这里河涌纵横，小桥流水，古榕参天，保留着传统的岭南水乡风貌。可以乘坐小艇穿梭于河涌之间，感受宁静的水乡生活。荷花盛开的季节尤为美丽。',
      tips: ['推荐乘船游览', '可以品尝当地特色鱼生', '适合摄影爱好者', '6-8月荷花盛开最美'],
      openTime: '全天开放',
      ticket: '免费（船票30元）',
      image: 'gulao',
      views: 7650
    },
    {
      id: 4,
      name: '陈皮村',
      category: 'food',
      categoryName: '美食体验',
      rating: 4.7,
      address: '江门市新会区会城镇',
      description: '新会陈皮文化体验地，了解陈皮制作工艺，品尝陈皮美食。',
      fullDescription: '新会陈皮是中国国家地理标志产品，有着700多年的历史。陈皮村是一个集陈皮文化展示、体验、购物于一体的综合性景区。在这里可以了解陈皮的种植、采摘、晾晒、储存全过程，还能品尝各种陈皮美食，如陈皮骨、陈皮鸭、陈皮红豆沙等。',
      tips: ['可以DIY制作陈皮', '购买陈皮认准正宗新会产地', '陈皮宴值得一试', '秋季是采摘柑橘的最佳时节'],
      openTime: '09:00-18:00',
      ticket: '免费',
      image: 'chenpi',
      hot: true,
      views: 8920
    },
    {
      id: 5,
      name: '台山海角城',
      category: 'beach',
      categoryName: '海滨度假',
      rating: 4.4,
      address: '江门市台山市北陡镇',
      description: '广东最美海岸线之一，细软沙滩，清澈海水，度假休闲好去处。',
      fullDescription: '台山海角城位于台山市北陡镇，拥有绵延数公里的优质沙滩和清澈的海水。这里远离城市喧嚣，是周末度假的理想选择。可以游泳、冲浪、烧烤，也可以出海捕鱼，体验渔家生活。日落时分的海景尤为迷人。',
      tips: ['夏季是最佳游玩季节', '可以体验出海捕鱼', '海鲜大排档性价比高', '建议住一晚看日出日落'],
      openTime: '全天开放',
      ticket: '免费',
      image: 'taishan',
      views: 6540
    },
    {
      id: 6,
      name: '长堤历史文化街区',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.3,
      address: '江门市蓬江区长堤路',
      description: '百年骑楼老街，中西合璧的建筑风格，感受老江门的历史韵味。',
      fullDescription: '长堤历史文化街区是江门市区保存最完好的骑楼街区，建于清末民初，见证了江门作为侨乡的繁华历史。这里的骑楼建筑融合了中西方建筑风格，漫步其中可以感受到浓厚的历史氛围。街区内有众多老字号店铺和特色小吃。',
      tips: ['傍晚时分拍照效果最佳', '周边有很多老字号美食', '可以顺便逛逛五邑华侨博物馆', '夜景灯光很有氛围'],
      openTime: '全天开放',
      ticket: '免费',
      image: 'changdi',
      views: 5680
    },
    {
      id: 7,
      name: '立园',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.7,
      address: '江门市开平市塘口镇',
      description: '华侨园林建筑典范，中西合璧的私家园林，被誉为"华侨第一园"。',
      fullDescription: '立园是旅美华侨谢维立先生于1926年建造的私家园林，占地约19600平方米。园内建筑风格独特，将中国传统园林艺术与西方建筑风格完美融合，有"华侨第一园"之称。园内有别墅区、大花园、小花园三部分，亭台楼阁、假山流水，处处精致。',
      tips: ['建议游览时间：2小时', '可与碉楼联票购买更划算', '园内有导游讲解服务', '春季花开时节最美'],
      openTime: '08:30-17:30',
      ticket: '100元（含碉楼联票180元）',
      image: 'liyuan',
      views: 7230
    },
    {
      id: 8,
      name: '上下川岛',
      category: 'beach',
      categoryName: '海滨度假',
      rating: 4.6,
      address: '江门市台山市川岛镇',
      description: '广东最大的海岛旅游区，碧海蓝天，椰林沙滩，南国海岛风情。',
      fullDescription: '上下川岛是广东省最大的海岛旅游区，由上川岛和下川岛组成。上川岛面积较大，有飞沙滩、金沙滩等优质海滩；下川岛则更为原生态，王府洲是最受欢迎的海滩。岛上椰林婆娑，海水清澈，是度假休闲的绝佳去处。',
      tips: ['建议住岛上一晚', '上川岛适合家庭游，下川岛更原生态', '可以体验海钓和潜水', '旺季需提前预订船票和住宿'],
      openTime: '全天开放',
      ticket: '船票约90元/人',
      image: 'shangxia',
      hot: true,
      views: 11200
    },
    {
      id: 9,
      name: '赤坎古镇',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.5,
      address: '江门市开平市赤坎镇',
      description: '百年侨乡古镇，骑楼老街风情，《让子弹飞》取景地。',
      fullDescription: '赤坎古镇有着350多年的历史，是一座具有浓郁岭南特色和侨乡风情的古镇。镇内保存着大量的骑楼建筑，沿潭江而建，古朴典雅。这里曾是电影《让子弹飞》的取景地，吸引了众多游客前来打卡。古镇内有关族图书馆、司徒氏图书馆等历史建筑。',
      tips: ['可以品尝赤坎煲仔饭', '傍晚沿江散步很惬意', '与碉楼景区可安排同一天游览', '周末人较多建议早去'],
      openTime: '全天开放',
      ticket: '免费',
      image: 'chikan',
      views: 8450
    },
    {
      id: 10,
      name: '圭峰山国家森林公园',
      category: 'nature',
      categoryName: '自然风光',
      rating: 4.4,
      address: '江门市新会区圭峰路',
      description: '江门市区的天然氧吧，登高望远，俯瞰新会全景。',
      fullDescription: '圭峰山国家森林公园是江门市区最大的森林公园，山上绿树成荫，空气清新，是市民休闲健身的好去处。山顶有玉台寺，是岭南名刹之一。登上山顶可以俯瞰新会城区全景，日出日落时分景色尤为壮观。',
      tips: ['建议早起登山看日出', '山上有缆车可乘坐', '玉台寺值得一游', '带足饮用水'],
      openTime: '06:00-18:00',
      ticket: '免费（缆车另计）',
      image: 'guifeng',
      views: 6120
    },
    {
      id: 11,
      name: '恩平温泉',
      category: 'leisure',
      categoryName: '休闲娱乐',
      rating: 4.5,
      address: '江门市恩平市那吉镇',
      description: '中国温泉之乡，天然养生温泉，周末放松身心的好去处。',
      fullDescription: '恩平被誉为"中国温泉之乡"，拥有丰富的地热资源。这里的温泉水质优良，富含多种矿物质，对皮肤和身体都有很好的保健作用。主要温泉度假区有金山温泉、帝都温泉、锦江温泉等，设施完善，是周末休闲度假的理想选择。',
      tips: ['建议住一晚慢慢享受', '各温泉度假村风格不同可选择', '避开节假日人流高峰', '泡温泉前后多喝水'],
      openTime: '09:00-23:00',
      ticket: '128-268元不等',
      image: 'enping',
      views: 7890
    },
    {
      id: 12,
      name: '台山黑沙湾',
      category: 'beach',
      categoryName: '海滨度假',
      rating: 4.3,
      address: '江门市台山市赤溪镇',
      description: '独特的黑色沙滩，世界罕见的海蚀地貌，地质奇观打卡地。',
      fullDescription: '黑沙湾因沙滩上的沙子呈黑色而得名，是世界上少有的黑色沙滩之一。黑沙富含多种矿物质，据说对皮肤有保健作用。这里还有独特的海蚀地貌，礁石嶙峋，是摄影爱好者的天堂。',
      tips: ['黑沙据说有保健功效', '适合拍摄独特风光照', '可以捡贝壳和赶海', '注意潮汐时间'],
      openTime: '全天开放',
      ticket: '免费',
      image: 'taihsan',
      views: 5430
    },
    {
      id: 13,
      name: '五邑华侨华人博物馆',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.4,
      address: '江门市蓬江区院士路',
      description: '了解五邑侨乡历史文化的窗口，华侨奋斗史的生动展现。',
      fullDescription: '五邑华侨华人博物馆是全国最大的华侨专题博物馆之一，馆内收藏了大量珍贵的华侨文物和历史资料。通过丰富的展品和多媒体展示，生动再现了五邑华侨漂洋过海、艰苦创业的历史，以及他们对家乡和祖国的深厚感情。',
      tips: ['免费参观需提前预约', '建议请讲解员讲解', '参观时间约2小时', '周一闭馆'],
      openTime: '09:00-17:00（周一闭馆）',
      ticket: '免费',
      image: 'wuyi',
      views: 4560
    },
    {
      id: 14,
      name: '台山浪琴湾',
      category: 'beach',
      categoryName: '海滨度假',
      rating: 4.5,
      address: '江门市台山市北陡镇',
      description: '原生态海湾，礁石奇特，日落绝美，摄影爱好者必打卡。',
      fullDescription: '浪琴湾是台山最美的海湾之一，因海浪拍打礁石发出如琴声般的声音而得名。这里保持着原生态的自然风貌，礁石形态各异，海水清澈。日落时分，金色的阳光洒在海面上，美不胜收，是摄影爱好者的天堂。',
      tips: ['日落时分最美', '礁石区注意安全', '可以露营看星星', '自带食物和水'],
      openTime: '全天开放',
      ticket: '免费',
      image: 'langqing',
      views: 6780
    },
    {
      id: 15,
      name: '新会学宫',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.2,
      address: '江门市新会区学宫路',
      description: '岭南现存最完整的孔庙之一，感受传统儒学文化。',
      fullDescription: '新会学宫始建于北宋庆历四年（1044年），是广东省现存规模最大、保存最完整的孔庙之一。学宫建筑群包括棂星门、泮池、大成门、大成殿等，建筑风格典雅庄重，是了解中国传统儒学文化的好去处。',
      tips: ['建筑很有历史感', '可以了解科举文化', '参观时间约1小时', '附近有新会特色小吃'],
      openTime: '09:00-17:00',
      ticket: '免费',
      image: 'xinhui',
      views: 3890
    },
    {
      id: 16,
      name: '外海茶庵寺',
      category: 'heritage',
      categoryName: '文化遗产',
      rating: 4.3,
      address: '江门市江海区外海街道',
      description: '岭南名刹，陈白沙先生讲学之地，感受心学文化。',
      fullDescription: '茶庵寺始建于唐代，是岭南著名的佛教寺院。明代大儒陈白沙先生曾在此讲学，使茶庵寺成为岭南心学的重要发源地。寺内环境清幽，古木参天，是静心礼佛、了解岭南文化的好去处。',
      tips: ['环境清幽适合静心', '可以了解陈白沙心学', '寺内有素斋可品尝', '建议早上前往'],
      openTime: '08:00-17:00',
      ticket: '免费',
      image: 'waihai',
      views: 4120
    }
  ])

  const categories = ref([
    { id: 'all', name: '全部', icon: '🏠' },
    { id: 'heritage', name: '文化遗产', icon: '🏛️' },
    { id: 'nature', name: '自然风光', icon: '🌿' },
    { id: 'food', name: '美食体验', icon: '🍜' },
    { id: 'beach', name: '海滨度假', icon: '🏖️' },
    { id: 'leisure', name: '休闲娱乐', icon: '♨️' }
  ])

  const selectedCategory = ref('all')
  const searchKeyword = ref('')

  const filteredSpots = computed(() => {
    let result = spots.value

    if (selectedCategory.value !== 'all') {
      result = result.filter(s => s.category === selectedCategory.value)
    }

    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(s =>
        s.name.toLowerCase().includes(keyword) ||
        s.description.toLowerCase().includes(keyword) ||
        s.address.toLowerCase().includes(keyword)
      )
    }

    return result
  })

  const hotSpots = computed(() => {
    return [...spots.value].sort((a, b) => b.rating - a.rating).slice(0, 3)
  })

  function getSpotById(id) {
    return spots.value.find(s => s.id === Number(id))
  }

  function extractRegion(address) {
    const match = address.match(/江门市([^市]+市|[^区]+区)/)
    return match ? match[1] : ''
  }

  function getSimilarSpots(spotId, count = 3) {
    const currentSpot = getSpotById(spotId)
    if (!currentSpot) return []

    const otherSpots = spots.value.filter(s => s.id !== Number(spotId))
    const currentRegion = extractRegion(currentSpot.address)

    const sameCategory = otherSpots.filter(s => s.category === currentSpot.category)
    const sameCategorySameRegion = sameCategory.filter(s => extractRegion(s.address) === currentRegion)
    const sameCategoryOtherRegion = sameCategory.filter(s => extractRegion(s.address) !== currentRegion)
    const sameRegionOtherCategory = otherSpots.filter(s => s.category !== currentSpot.category && extractRegion(s.address) === currentRegion)
    const others = otherSpots.filter(s =>
      s.category !== currentSpot.category && extractRegion(s.address) !== currentRegion
    )

    const byViewsDesc = (a, b) => b.views - a.views
    sameCategorySameRegion.sort(byViewsDesc)
    sameCategoryOtherRegion.sort(byViewsDesc)
    sameRegionOtherCategory.sort(byViewsDesc)
    others.sort(byViewsDesc)

    const result = [
      ...sameCategorySameRegion,
      ...sameCategoryOtherRegion,
      ...sameRegionOtherCategory,
      ...others
    ]

    return result.slice(0, count)
  }

  function setCategory(category) {
    selectedCategory.value = category
  }

  function setSearchKeyword(keyword) {
    searchKeyword.value = keyword
  }

  return {
    spots,
    categories,
    selectedCategory,
    searchKeyword,
    filteredSpots,
    hotSpots,
    getSpotById,
    getSimilarSpots,
    setCategory,
    setSearchKeyword
  }
})
