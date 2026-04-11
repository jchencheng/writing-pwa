import type { PracticeUnit } from '../types';

// 默认练习单元数据
export const defaultUnits: PracticeUnit[] = [
  {
    id: 'unit1',
    title: 'Unit 1 广告 (Advertising)',
    description: '掌握广告相关的英语表达，提升写作能力',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 13,
    phrases: [
      { english: 'key part', chinese: '关键部分' },
      { english: 'inform about', chinese: '告知关于' },
      { english: 'play a role', chinese: '发挥作用' },
      { english: 'aim to', chinese: '旨在' },
      { english: 'create awareness', chinese: '创造 awareness' },
      { english: 'influence consumers', chinese: '影响消费者' },
      { english: 'promote products', chinese: '推广产品' },
      { english: 'increase sales', chinese: '增加销售' },
      { english: 'build brand', chinese: '建立品牌' },
      { english: 'target audience', chinese: '目标受众' }
    ],
    practices: [
      {
        id: 'p1',
        question: 'In the realm of contemporary commerce, advertising is a [ ] [ ] of business.',
        blanks: [
          { id: 'b1', correctAnswer: 'key', options: ['key', 'important', 'major', 'vital'] },
          { id: 'b2', correctAnswer: 'part', options: ['part', 'component', 'element', 'aspect'] }
        ],
        explanation: 'key part 表示关键部分，符合句子语境。',
        feedback: '正确！key part 表示关键部分，在当代商业领域，广告是业务的关键部分。',
        translation: '在当代商业领域，广告是业务的关键部分。'
      },
      {
        id: 'p2',
        question: 'Advertisements [ ] customers [ ] the products and services that are available.',
        blanks: [
          { id: 'b1', correctAnswer: 'inform', options: ['inform', 'tell', 'notify', 'advise'] },
          { id: 'b2', correctAnswer: 'about', options: ['about', 'of', 'regarding', 'concerning'] }
        ],
        explanation: 'inform about 是固定搭配，表示告知关于某事。',
        feedback: '正确！inform about 表示告知关于某事。',
        translation: '广告告知顾客可用的产品和服务。'
      },
      {
        id: 'p3',
        question: 'Advertising [ ] a [ ] in shaping consumer behavior.',
        blanks: [
          { id: 'b1', correctAnswer: 'plays', options: ['plays', 'has', 'takes', 'makes'] },
          { id: 'b2', correctAnswer: 'role', options: ['role', 'part', 'function', 'position'] }
        ],
        explanation: 'play a role 是固定搭配，表示发挥作用。',
        feedback: '正确！play a role 表示发挥作用。',
        translation: '广告在塑造消费者行为方面发挥作用。'
      },
      {
        id: 'p4',
        question: 'Companies [ ] to [ ] brand awareness through various media channels.',
        blanks: [
          { id: 'b1', correctAnswer: 'aim', options: ['aim', 'try', 'attempt', 'seek'] },
          { id: 'b2', correctAnswer: 'create', options: ['create', 'build', 'establish', 'develop'] }
        ],
        explanation: 'aim to 表示旨在，create awareness 表示创造意识。',
        feedback: '正确！aim to create 表示旨在创造。',
        translation: '公司旨在通过各种媒体渠道创造品牌意识。'
      },
      {
        id: 'p5',
        question: 'Effective advertising can [ ] consumers to make purchasing decisions.',
        blanks: [
          { id: 'b1', correctAnswer: 'influence', options: ['influence', 'affect', 'impact', 'persuade'] }
        ],
        explanation: 'influence 表示影响，符合句子语境。',
        feedback: '正确！influence 表示影响。',
        translation: '有效的广告可以影响消费者做出购买决定。'
      }
    ]
  },
  {
    id: 'unit2',
    title: 'Unit 2 科技 (Technology)',
    description: '学习科技相关的英语词汇和表达',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 10,
    phrases: [
      { english: 'digital age', chinese: '数字时代' },
      { english: 'social media', chinese: '社交媒体' },
      { english: 'artificial intelligence', chinese: '人工智能' },
      { english: 'machine learning', chinese: '机器学习' },
      { english: 'data analysis', chinese: '数据分析' },
      { english: 'cloud computing', chinese: '云计算' },
      { english: 'mobile devices', chinese: '移动设备' },
      { english: 'online platform', chinese: '在线平台' },
      { english: 'virtual reality', chinese: '虚拟现实' },
      { english: 'internet connection', chinese: '互联网连接' }
    ],
    practices: [
      {
        id: 'p1',
        question: 'We live in the [ ] [ ] where technology affects every aspect of our lives.',
        blanks: [
          { id: 'b1', correctAnswer: 'digital', options: ['digital', 'modern', 'new', 'technological'] },
          { id: 'b2', correctAnswer: 'age', options: ['age', 'era', 'time', 'period'] }
        ],
        explanation: 'digital age 表示数字时代，是常用表达。',
        feedback: '正确！digital age 表示数字时代。',
        translation: '我们生活在数字时代，技术影响着我们生活的方方面面。'
      },
      {
        id: 'p2',
        question: '[ ] [ ] has become an essential part of modern communication.',
        blanks: [
          { id: 'b1', correctAnswer: 'Social', options: ['Social', 'Digital', 'Online', 'Modern'] },
          { id: 'b2', correctAnswer: 'media', options: ['media', 'network', 'platform', 'communication'] }
        ],
        explanation: 'social media 表示社交媒体，是固定搭配。',
        feedback: '正确！social media 表示社交媒体。',
        translation: '社交媒体已成为现代交流的重要组成部分。'
      },
      {
        id: 'p3',
        question: '[ ] [ ] is transforming the way businesses operate.',
        blanks: [
          { id: 'b1', correctAnswer: 'Artificial', options: ['Artificial', 'Machine', 'Computer', 'Digital'] },
          { id: 'b2', correctAnswer: 'intelligence', options: ['intelligence', 'learning', 'thinking', 'reasoning'] }
        ],
        explanation: 'artificial intelligence 表示人工智能，是专业术语。',
        feedback: '正确！artificial intelligence 表示人工智能。',
        translation: '人工智能正在改变企业的运营方式。'
      },
      {
        id: 'p4',
        question: 'Companies use [ ] [ ] to understand customer behavior.',
        blanks: [
          { id: 'b1', correctAnswer: 'data', options: ['data', 'information', 'statistics', 'numbers'] },
          { id: 'b2', correctAnswer: 'analysis', options: ['analysis', 'processing', 'examination', 'evaluation'] }
        ],
        explanation: 'data analysis 表示数据分析，是商业常用术语。',
        feedback: '正确！data analysis 表示数据分析。',
        translation: '公司使用数据分析来理解客户行为。'
      },
      {
        id: 'p5',
        question: '[ ] [ ] allows users to access data from anywhere.',
        blanks: [
          { id: 'b1', correctAnswer: 'Cloud', options: ['Cloud', 'Online', 'Remote', 'Virtual'] },
          { id: 'b2', correctAnswer: 'computing', options: ['computing', 'storage', 'services', 'technology'] }
        ],
        explanation: 'cloud computing 表示云计算，是现代技术术语。',
        feedback: '正确！cloud computing 表示云计算。',
        translation: '云计算允许用户从任何地方访问数据。'
      }
    ]
  },
  {
    id: 'unit3',
    title: 'Unit 3 环境 (Environment)',
    description: '学习环境相关的英语词汇和表达',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 8,
    phrases: [
      { english: 'climate change', chinese: '气候变化' },
      { english: 'global warming', chinese: '全球变暖' },
      { english: 'renewable energy', chinese: '可再生能源' },
      { english: 'carbon emissions', chinese: '碳排放' },
      { english: 'sustainable development', chinese: '可持续发展' },
      { english: 'environmental protection', chinese: '环境保护' },
      { english: 'natural resources', chinese: '自然资源' },
      { english: 'ecosystem balance', chinese: '生态平衡' },
      { english: 'green technology', chinese: '绿色技术' },
      { english: 'waste reduction', chinese: '减少废物' }
    ],
    practices: [
      {
        id: 'p1',
        question: '[ ] [ ] is one of the most pressing issues facing our planet today.',
        blanks: [
          { id: 'b1', correctAnswer: 'Climate', options: ['Climate', 'Weather', 'Atmospheric', 'Global'] },
          { id: 'b2', correctAnswer: 'change', options: ['change', 'warming', 'crisis', 'problem'] }
        ],
        explanation: 'climate change 表示气候变化，是环境领域核心术语。',
        feedback: '正确！climate change 表示气候变化。',
        translation: '气候变化是当今地球面临的最紧迫问题之一。'
      },
      {
        id: 'p2',
        question: '[ ] [ ] is causing rising sea levels and extreme weather.',
        blanks: [
          { id: 'b1', correctAnswer: 'Global', options: ['Global', 'World', 'Planetary', 'International'] },
          { id: 'b2', correctAnswer: 'warming', options: ['warming', 'heating', 'temperature', 'climate'] }
        ],
        explanation: 'global warming 表示全球变暖，是环境科学术语。',
        feedback: '正确！global warming 表示全球变暖。',
        translation: '全球变暖正在导致海平面上升和极端天气。'
      },
      {
        id: 'p3',
        question: 'We need to invest in [ ] [ ] to reduce our dependence on fossil fuels.',
        blanks: [
          { id: 'b1', correctAnswer: 'renewable', options: ['renewable', 'sustainable', 'clean', 'alternative'] },
          { id: 'b2', correctAnswer: 'energy', options: ['energy', 'power', 'resources', 'fuel'] }
        ],
        explanation: 'renewable energy 表示可再生能源，是环保术语。',
        feedback: '正确！renewable energy 表示可再生能源。',
        translation: '我们需要投资可再生能源来减少对化石燃料的依赖。'
      },
      {
        id: 'p4',
        question: 'Reducing [ ] [ ] is essential for protecting the environment.',
        blanks: [
          { id: 'b1', correctAnswer: 'carbon', options: ['carbon', 'greenhouse', 'CO2', 'pollution'] },
          { id: 'b2', correctAnswer: 'emissions', options: ['emissions', 'release', 'output', 'discharge'] }
        ],
        explanation: 'carbon emissions 表示碳排放，是环境领域常用术语。',
        feedback: '正确！carbon emissions 表示碳排放。',
        translation: '减少碳排放对于保护环境至关重要。'
      },
      {
        id: 'p5',
        question: '[ ] [ ] requires balancing economic growth with environmental protection.',
        blanks: [
          { id: 'b1', correctAnswer: 'Sustainable', options: ['Sustainable', 'Green', 'Eco-friendly', 'Responsible'] },
          { id: 'b2', correctAnswer: 'development', options: ['development', 'growth', 'progress', 'expansion'] }
        ],
        explanation: 'sustainable development 表示可持续发展，是联合国倡导的理念。',
        feedback: '正确！sustainable development 表示可持续发展。',
        translation: '可持续发展需要在经济增长和环境保护之间取得平衡。'
      }
    ]
  }
];
