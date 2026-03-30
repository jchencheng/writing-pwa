import type { PracticeUnit } from '../types';

// 练习单元数据
export const practiceUnits: PracticeUnit[] = [
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
          {
            id: 'b1',
            correctAnswer: 'key',
            options: ['key', 'important', 'major', 'vital']
          },
          {
            id: 'b2',
            correctAnswer: 'part',
            options: ['part', 'component', 'element', 'aspect']
          }
        ],
        explanation: 'key part 表示关键部分，符合句子语境。',
        feedback: '正确！key part 表示关键部分，在当代商业领域，广告是业务的关键部分。',
        translation: '在当代商业领域，广告是业务的关键部分。'
      },
      {
        id: 'p2',
        question: 'Advertisements [ ] customers [ ] the products and services that are available.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'inform',
            options: ['inform', 'tell', 'notify', 'educate']
          },
          {
            id: 'b2',
            correctAnswer: 'about',
            options: ['about', 'of', 'on', 'regarding']
          }
        ],
        explanation: 'inform... about 表示告知某人关于某事，符合句子语境。',
        feedback: '正确！inform... about 表示告知，广告让消费者了解现有的产品和服务。',
        translation: '广告让消费者了解现有的产品和服务。'
      },
      {
        id: 'p3',
        question: 'Advertising helps to [ ] [ ] and [ ] the economy.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'increase',
            options: ['increase', 'boost', 'raise', 'enhance']
          },
          {
            id: 'b2',
            correctAnswer: 'sales',
            options: ['sales', 'revenue', 'profits', 'income']
          },
          {
            id: 'b3',
            correctAnswer: 'stimulate',
            options: ['stimulate', 'boost', 'drive', 'promote']
          }
        ],
        explanation: 'increase sales 表示增加销量，stimulate the economy 表示刺激经济，符合句子语境。',
        feedback: '正确！increase sales 表示增加销量，stimulate the economy 表示刺激经济，广告有助于增加销量并刺激经济。',
        translation: '广告有助于增加销量并刺激经济。'
      },
      {
        id: 'p4',
        question: 'Furthermore, the advertising sector is a [ ] [ ] that provides [ ] [ ] for many people.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'creative',
            options: ['creative', 'innovative', 'imaginative', 'original']
          },
          {
            id: 'b2',
            correctAnswer: 'industry',
            options: ['industry', 'sector', 'field', 'domain']
          },
          {
            id: 'b3',
            correctAnswer: 'employment',
            options: ['employment', 'job', 'work', 'career']
          },
          {
            id: 'b4',
            correctAnswer: 'opportunities',
            options: ['opportunities', 'chances', 'positions', 'roles']
          }
        ],
        explanation: 'creative industry 表示创意产业，employment opportunities 表示就业机会，符合句子语境。',
        feedback: '正确！creative industry 表示创意产业，employment opportunities 表示就业机会，广告业是一个创意产业，它为许多人提供了就业机会。',
        translation: '此外，广告业是一个创意产业，它为许多人提供了就业机会。'
      },
      {
        id: 'p5',
        question: 'Without advertising, [ ] [ ] would rise, and many free services, such as commercial news websites, would not be [ ].',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'unemployment',
            options: ['unemployment', 'joblessness', 'idleness', 'inactivity']
          },
          {
            id: 'b2',
            correctAnswer: 'rate',
            options: ['rate', 'level', 'percentage', 'figure']
          },
          {
            id: 'b3',
            correctAnswer: 'viable',
            options: ['viable', 'sustainable', 'feasible', 'workable']
          }
        ],
        explanation: 'unemployment rate 表示失业率，viable 表示可行的、能生存的，符合句子语境。',
        feedback: '正确！unemployment rate 表示失业率，viable 表示可行的，没有广告，失业率会上升，许多免费服务如商业新闻网站将无法维持生存。',
        translation: '如果没有广告，失业率会上升，许多免费服务如商业新闻网站将无法维持生存。'
      },
      {
        id: 'p6',
        question: 'Critics argue that advertising [ ] people to buy things they do not really need by creating [ ] [ ].',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'manipulates',
            options: ['manipulates', 'persuades', 'encourages', 'influences']
          },
          {
            id: 'b2',
            correctAnswer: 'artificial',
            options: ['artificial', 'false', 'fake', 'unreal']
          },
          {
            id: 'b3',
            correctAnswer: 'needs',
            options: ['needs', 'wants', 'desires', 'demands']
          }
        ],
        explanation: 'manipulate 表示操纵，artificial needs 表示人为需求，符合句子语境。',
        feedback: '正确！manipulate 表示操纵，artificial needs 表示人为需求，批评者认为广告通过创造人为需求来操纵人们购买不需要的东西。',
        translation: '批评者认为广告通过创造人为需求来操纵人们购买不需要的东西。'
      },
      {
        id: 'p7',
        question: 'Many adverts [ ] [ ]  by showing images of a "perfect" lifestyle that is often unattainable.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'sell',
            options: ['sell', 'promote', 'market', 'pitch']
          },
          {
            id: 'b2',
            correctAnswer: 'dreams',
            options: ['dreams', 'ideals', 'aspirations', 'hopes']
          },
          
        ],
        explanation: 'sell dreams 表示兜售梦想，符合句子语境。',
        feedback: '正确！sell dreams 表示兜售梦想，许多广告通过展示难以企及的“完美”生活方式来兜售梦想。',
        translation: '许多广告通过展示难以企及的“完美”生活方式来兜售梦想。'
      },
      {
        id: 'p8',
        question: 'As a result, people may feel [ ] if they cannot afford the [ ] [ ] they see on screen.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'dissatisfied',
            options: ['dissatisfied', 'unhappy', 'discontented', 'frustrated']
          },
          {
            id: 'b2',
            correctAnswer: 'consumer',
            options: ['consumer', 'luxury', 'expensive', 'desired']
          },
          {
            id: 'b3',
            correctAnswer: 'goods',
            options: ['goods', 'products', 'items', 'things']
          }
        ],
        explanation: 'dissatisfied 表示不满足的，consumer goods 表示消费品，符合句子语境。',
        feedback: '正确！dissatisfied 表示不满足的，consumer goods 表示消费品，如果人们买不起屏幕上看到的消费品，他们可能会感到不满足。',
        translation: '结果，如果人们买不起屏幕上看到的消费品，他们可能会感到不满足。'
      },
      {
        id: 'p9',
        question: 'Children are particularly [ ] to the [ ] [ ] of persuasive advertising.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'vulnerable',
            options: ['vulnerable', 'susceptible', 'sensitive', 'receptive']
          },
          {
            id: 'b2',
            correctAnswer: 'negative',
            options: ['negative', 'harmful', 'detrimental', 'adverse']
          },
          {
            id: 'b3',
            correctAnswer: 'impacts',
            options: ['impacts', 'effects', 'influences', 'consequences']
          }
        ],
        explanation: 'vulnerable 表示脆弱的，negative impacts 表示负面影响，符合句子语境。',
        feedback: '正确！vulnerable 表示脆弱的，negative impacts 表示负面影响，儿童特别容易受到说服性广告的负面影响。',
        translation: '儿童特别容易受到说服性广告的负面影响，因为他们比较脆弱。'
      },
      {
        id: 'p10',
        question: 'Advertisers often target children with [ ] [ ] and clever packaging.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'bright',
            options: ['bright', 'vibrant', 'colorful', 'lively']
          },
          {
            id: 'b2',
            correctAnswer: 'colours',
            options: ['colours', 'colors', 'hues', 'shades']
          }
        ],
        explanation: 'bright colours 表示鲜艳的颜色，符合句子语境。',
        feedback: '正确！bright colours 表示鲜艳的颜色，广告商经常利用鲜艳的颜色和巧妙的包装来针对儿童。',
        translation: '广告商经常利用鲜艳的颜色和巧妙的包装来针对儿童。'
      },
      {
        id: 'p11',
        question: 'This leads to "pester power," where children [ ] their parents to buy products that may be [ ] [ ] their health.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'pester',
            options: ['pester', 'nag', 'bother', 'annoy']
          },
          {
            id: 'b2',
            correctAnswer: 'detrimental',
            options: ['detrimental', 'harmful', 'damaging', 'injurious']
          },
          {
            id: 'b3',
            correctAnswer: 'to',
            options: ['to', 'for', 'with', 'on']
          }
        ],
        explanation: 'pester 表示纠缠，detrimental to 表示对...有害，符合句子语境。',
        feedback: '正确！pester 表示纠缠，detrimental to 表示对...有害，这导致了“纠缠力量”，即孩子们纠缠父母购买可能对健康有害的产品。',
        translation: '这导致了“纠缠力量”，即孩子们纠缠父母购买可能对健康有害的产品。'
      },
      {
        id: 'p12',
        question: 'To [ ] the negative effects, the government should [ ] [ ] [ ] on advertising aimed at children.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'mitigate',
            options: ['mitigate', 'reduce', 'alleviate', 'lessen']
          },
          {
            id: 'b2',
            correctAnswer: 'impose',
            options: ['impose', 'enforce', 'put', 'place']
          },
          {
            id: 'b3',
            correctAnswer: 'strict',
            options: ['strict', 'severe', 'stringent', 'rigorous']
          },
          {
            id: 'b4',
            correctAnswer: 'restrictions',
            options: ['restrictions', 'limits', 'regulations', 'controls']
          }
        ],
        explanation: 'mitigate 表示减轻，impose strict restrictions 表示施加严格限制，符合句子语境。',
        feedback: '正确！mitigate 表示减轻，impose strict restrictions 表示施加严格限制，为了减轻负面影响，政府应当对针对儿童的广告施加严格限制。',
        translation: '为了减轻负面影响，政府应当对针对儿童的广告施加严格限制。'
      },
      {
        id: 'p13',
        question: 'For instance, the advertising of [ ] [ ] during children\'s TV programmes should be [ ] [ ].',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'junk',
            options: ['junk', 'unhealthy', 'processed', 'fast']
          },
          {
            id: 'b2',
            correctAnswer: 'food',
            options: ['food', 'snacks', 'meals', 'products']
          },
          {
            id: 'b3',
            correctAnswer: 'strictly',
            options: ['strictly', 'completely', 'fully', 'totally']
          },
          {
            id: 'b4',
            correctAnswer: 'prohibited',
            options: ['prohibited', 'banned', 'forbidden', 'outlawed']
          }
        ],
        explanation: 'junk food 表示垃圾食品，strictly prohibited 表示严格禁止，符合句子语境。',
        feedback: '正确！junk food 表示垃圾食品，strictly prohibited 表示严格禁止，在儿童节目期间播放垃圾食品广告应当被严格禁止。',
        translation: '例如，在儿童节目期间播放垃圾食品广告应当被严格禁止。'
      }
    ]
  },
  {
    id: 'unit2',
    title: 'Unit 2 动物与环境 (Animals & Environment)',
    description: '掌握动物与环境相关的英语表达，提升写作能力',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 10,
    phrases: [
      { english: 'advance medical and scientific knowledge', chinese: '推动医学和科学知识的发展' },
      { english: 'medical discoveries involved experimentation on animals', chinese: '医学发现涉及动物实验' },
      { english: 'minimise the suffering that animals experience', chinese: '减少动物所经历的痛苦' },
      { english: 'banned in many countries', chinese: '在许多国家被禁止' },
      { english: 'do not justify the suffering caused', chinese: '不足以证明所造成的痛苦是合理的' },
      { english: 'alternative methods of research', chinese: '研究的替代方法' },
      { english: 'no moral right', chinese: '没有道德权利' },
      { english: 'possible without eating meat', chinese: '不吃肉也是可能的' },
      { english: 'reduce the risk of diseases like cancer', chinese: '降低患癌症等疾病的风险' },
      { english: 'treatment of animals in factory farms', chinese: '工厂化农场对待动物的方式' },
      { english: 'balanced diet', chinese: '均衡的饮食' },
      { english: 'main ingredient in traditional meals', chinese: '传统膳食中的主要成分' },
      { english: 'below humans in the food chain', chinese: '在食物链中处于人类之下' },
      { english: 'produce organic food', chinese: '生产有机食品' },
      { english: 'play an important role in wildlife conservation', chinese: '在野生动物保护中发挥重要作用' },
      { english: 'provide job opportunities', chinese: '提供就业机会' },
      { english: 'artificial environments', chinese: '人造环境' },
      { english: 'lose the freedom to hunt for food', chinese: '失去捕食的自由' },
      { english: 'protecting natural habitats', chinese: '保护自然栖息地' },
      { english: 'entertainment and profit', chinese: '娱乐和盈利' }
    ],
    practices: [
      {
        id: 'p1',
        question: 'Animals are utilized in pivotal scientific research. Consequently, animal testing significantly helps to [ ] [ ] [ ] [ ] [ ], as evidenced by the fact that many groundbreaking [ ] [ ] [ ] [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'advance', options: ['advance', 'promote', 'develop', 'enhance'] },
          { id: 'b2', correctAnswer: 'medical', options: ['medical', 'health', 'scientific', 'biological'] },
          { id: 'b3', correctAnswer: 'and', options: ['and', 'or', 'as', 'but'] },
          { id: 'b4', correctAnswer: 'scientific', options: ['scientific', 'medical', 'technical', 'research'] },
          { id: 'b5', correctAnswer: 'knowledge', options: ['knowledge', 'research', 'understanding', 'studies'] },
          { id: 'b6', correctAnswer: 'medical', options: ['medical', 'scientific', 'health', 'biological'] },
          { id: 'b7', correctAnswer: 'discoveries', options: ['discoveries', 'findings', 'research', 'studies'] },
          { id: 'b8', correctAnswer: 'involved', options: ['involved', 'required', 'included', 'needed'] },
          { id: 'b9', correctAnswer: 'experimentation', options: ['experimentation', 'testing', 'research', 'studies'] },
          { id: 'b10', correctAnswer: 'on', options: ['on', 'with', 'using', 'involving'] },
          { id: 'b11', correctAnswer: 'animals', options: ['animals', 'creatures', 'organisms', 'species'] }
        ],
        explanation: 'advance medical and scientific knowledge 表示推动医学和科学知识的发展，medical discoveries involved experimentation on animals 表示医学发现涉及动物实验，符合句子语境。',
        feedback: '正确！advance medical and scientific knowledge 表示推动医学和科学知识的发展，medical discoveries involved experimentation on animals 表示医学发现涉及动物实验。',
        translation: '动物被用于关键的科学研究。因此，动物实验显著有助于推动医学和科学知识的发展，这一点可以从许多突破性的医学发现涉及动物实验这一事实中得到证明。'
      },
      {
        id: 'p2',
        question: 'While ethical concerns exist, researchers aim to [ ] [ ] [ ] [ ] [ ] [ ] [ ]. Furthermore, it is worth noting that testing for the cosmetics industry is now [ ] [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'minimise', options: ['minimise', 'reduce', 'decrease', 'lessen'] },
          { id: 'b2', correctAnswer: 'the', options: ['the', 'a', 'any', 'some'] },
          { id: 'b3', correctAnswer: 'suffering', options: ['suffering', 'pain', 'distress', 'discomfort'] },
          { id: 'b4', correctAnswer: 'that', options: ['that', 'which', 'what', 'who'] },
          { id: 'b5', correctAnswer: 'animals', options: ['animals', 'creatures', 'organisms', 'species'] },
          { id: 'b6', correctAnswer: 'experience', options: ['experience', 'endure', 'suffer', 'undergo'] },
          { id: 'b7', correctAnswer: 'banned', options: ['banned', 'prohibited', 'forbidden', 'outlawed'] },
          { id: 'b8', correctAnswer: 'in', options: ['in', 'by', 'across', 'throughout'] },
          { id: 'b9', correctAnswer: 'many', options: ['many', 'numerous', 'several', 'various'] },
          { id: 'b10', correctAnswer: 'countries', options: ['countries', 'nations', 'states', 'regions'] }
        ],
        explanation: 'minimise the suffering that animals experience 表示减少动物所经历的痛苦，banned in many countries 表示在许多国家被禁止，符合句子语境。',
        feedback: '正确！minimise the suffering that animals experience 表示减少动物所经历的痛苦，banned in many countries 表示在许多国家被禁止。',
        translation: '虽然存在伦理担忧，但研究人员旨在减少动物所经历的痛苦。此外，值得注意的是，化妆品行业的测试现在在许多国家被禁止。'
      },
      {
        id: 'p3',
        question: 'Conversely, animal rights activists argue that the purported benefits of research using animals simply [ ] [ ] [ ] [ ] [ ] [ ] [ ]. They emphasize that there are [ ] [ ] [ ] [ ], asserting that humans have [ ] [ ] [ ] to do experiments on animals.',
        blanks: [
          { id: 'b1', correctAnswer: 'do', options: ['do', 'can', 'will', 'may'] },
          { id: 'b2', correctAnswer: 'not', options: ['not', 'never', 'no', 'nor'] },
          { id: 'b3', correctAnswer: 'justify', options: ['justify', 'validate', 'warrant', 'support'] },
          { id: 'b4', correctAnswer: 'the', options: ['the', 'a', 'any', 'some'] },
          { id: 'b5', correctAnswer: 'suffering', options: ['suffering', 'pain', 'distress', 'discomfort'] },
          { id: 'b6', correctAnswer: 'caused', options: ['caused', 'resulted', 'created', 'produced'] },
          { id: 'b7', correctAnswer: 'alternative', options: ['alternative', 'other', 'different', 'substitute'] },
          { id: 'b8', correctAnswer: 'methods', options: ['methods', 'ways', 'approaches', 'techniques'] },
          { id: 'b9', correctAnswer: 'of', options: ['of', 'for', 'in', 'with'] },
          { id: 'b10', correctAnswer: 'research', options: ['research', 'study', 'investigation', 'exploration'] },
          { id: 'b11', correctAnswer: 'no', options: ['no', 'not', 'neither', 'nor'] },
          { id: 'b12', correctAnswer: 'moral', options: ['moral', 'ethical', 'right', 'just'] },
          { id: 'b13', correctAnswer: 'right', options: ['right', 'entitlement', 'permission', 'authority'] }
        ],
        explanation: 'do not justify the suffering caused 表示不足以证明所造成的痛苦是合理的，alternative methods of research 表示研究的替代方法，no moral right 表示没有道德权利，符合句子语境。',
        feedback: '正确！do not justify the suffering caused 表示不足以证明所造成的痛苦是合理的，alternative methods of research 表示研究的替代方法，no moral right 表示没有道德权利。',
        translation: '相反，动物权利活动家认为，使用动物进行研究的所谓好处根本不足以证明所造成的痛苦是合理的。他们强调，有研究的替代方法，并断言人类没有道德权利对动物进行实验。'
      },
      {
        id: 'p4',
        question: 'Many vegetarians contend that a healthy diet is [ ] [ ] [ ] [ ], making it unnecessary to kill animals for food.',
        blanks: [
          { id: 'b1', correctAnswer: 'possible', options: ['possible', 'achievable', 'feasible', 'doable'] },
          { id: 'b2', correctAnswer: 'without', options: ['without', 'no', 'not', 'lacking'] },
          { id: 'b3', correctAnswer: 'eating', options: ['eating', 'consuming', 'having', 'taking'] },
          { id: 'b4', correctAnswer: 'meat', options: ['meat', 'flesh', 'animal products', 'protein'] }
        ],
        explanation: 'possible without eating meat 表示不吃肉也是可能的，符合句子语境。',
        feedback: '正确！possible without eating meat 表示不吃肉也是可能的。',
        translation: '许多素食者认为，健康的饮食可以不吃肉，因此没有必要为了食物而杀死动物。'
      },
      {
        id: 'p5',
        question: 'Additionally, adopting a plant-based diet may [ ] [ ] [ ] [ ] [ ] [ ] [ ], while simultaneously allowing people to question the [ ] [ ] [ ] [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'reduce', options: ['reduce', 'lower', 'decrease', 'minimise'] },
          { id: 'b2', correctAnswer: 'the', options: ['the', 'a', 'any', 'some'] },
          { id: 'b3', correctAnswer: 'risk', options: ['risk', 'chance', 'probability', 'likelihood'] },
          { id: 'b4', correctAnswer: 'of', options: ['of', 'for', 'from', 'against'] },
          { id: 'b5', correctAnswer: 'diseases', options: ['diseases', 'illnesses', 'ailments', 'conditions'] },
          { id: 'b6', correctAnswer: 'like', options: ['like', 'such as', 'including', 'such'] },
          { id: 'b7', correctAnswer: 'cancer', options: ['cancer', 'tumor', 'malignancy', 'carcinoma'] },
          { id: 'b8', correctAnswer: 'treatment', options: ['treatment', 'handling', 'treatment', 'management'] },
          { id: 'b9', correctAnswer: 'of', options: ['of', 'for', 'towards', 'regarding'] },
          { id: 'b10', correctAnswer: 'animals', options: ['animals', 'creatures', 'organisms', 'species'] },
          { id: 'b11', correctAnswer: 'in', options: ['in', 'at', 'within', 'inside'] },
          { id: 'b12', correctAnswer: 'factory', options: ['factory', 'industrial', 'commercial', 'mass'] },
          { id: 'b13', correctAnswer: 'farms', options: ['farms', 'facilities', 'operations', 'enterprises'] }
        ],
        explanation: 'reduce the risk of diseases like cancer 表示降低患癌症等疾病的风险，treatment of animals in factory farms 表示工厂化农场对待动物的方式，符合句子语境。',
        feedback: '正确！reduce the risk of diseases like cancer 表示降低患癌症等疾病的风险，treatment of animals in factory farms 表示工厂化农场对待动物的方式。',
        translation: '此外，采用植物性饮食可能会降低患癌症等疾病的风险，同时让人们质疑工厂化农场对待动物的方式。'
      },
      {
        id: 'p6',
        question: 'On the other hand, critics argue that vegetarians do not eat a [ ] [ ], and point out that in many cultures, meat is the [ ] [ ] [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'balanced', options: ['balanced', 'healthy', 'nutritious', 'well-rounded'] },
          { id: 'b2', correctAnswer: 'diet', options: ['diet', 'meal', 'food', 'nutrition'] },
          { id: 'b3', correctAnswer: 'main', options: ['main', 'primary', 'principal', 'chief'] },
          { id: 'b4', correctAnswer: 'ingredient', options: ['ingredient', 'component', 'element', 'part'] },
          { id: 'b5', correctAnswer: 'in', options: ['in', 'of', 'for', 'within'] },
          { id: 'b6', correctAnswer: 'traditional', options: ['traditional', 'cultural', 'customary', 'conventional'] },
          { id: 'b7', correctAnswer: 'meals', options: ['meals', 'dishes', 'foods', 'cuisines'] }
        ],
        explanation: 'balanced diet 表示均衡的饮食，main ingredient in traditional meals 表示传统膳食中的主要成分，符合句子语境。',
        feedback: '正确！balanced diet 表示均衡的饮食，main ingredient in traditional meals 表示传统膳食中的主要成分。',
        translation: '另一方面，批评者认为素食者没有均衡的饮食，并指出在许多文化中，肉类是传统膳食中的主要成分。'
      },
      {
        id: 'p7',
        question: 'Meat-eaters argue that animals are [ ] [ ] [ ] [ ] [ ] [ ], making it completely natural for us to kill them for food. Therefore, our aim should be to improve farming methods so that farms can [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'below', options: ['below', 'under', 'beneath', 'lower than'] },
          { id: 'b2', correctAnswer: 'humans', options: ['humans', 'people', 'human beings', 'mankind'] },
          { id: 'b3', correctAnswer: 'in', options: ['in', 'on', 'within', 'along'] },
          { id: 'b4', correctAnswer: 'the', options: ['the', 'a', 'any', 'some'] },
          { id: 'b5', correctAnswer: 'food', options: ['food', 'eating', 'consumption', 'nourishment'] },
          { id: 'b6', correctAnswer: 'chain', options: ['chain', 'web', 'system', 'hierarchy'] },
          { id: 'b7', correctAnswer: 'produce', options: ['produce', 'create', 'generate', 'make'] },
          { id: 'b8', correctAnswer: 'organic', options: ['organic', 'natural', 'pure', 'unprocessed'] },
          { id: 'b9', correctAnswer: 'food', options: ['food', 'products', 'goods', 'items'] }
        ],
        explanation: 'below humans in the food chain 表示在食物链中处于人类之下，produce organic food 表示生产有机食品，符合句子语境。',
        feedback: '正确！below humans in the food chain 表示在食物链中处于人类之下，produce organic food 表示生产有机食品。',
        translation: '肉食者认为，动物在食物链中处于人类之下，因此我们为了食物而杀死它们是完全自然的。因此，我们的目标应该是改进 farming methods，使农场能够生产有机食品。'
      },
      {
        id: 'p8',
        question: 'Proponents assert that zoos [ ] [ ] [ ] [ ] [ ] [ ] [ ], and they [ ] [ ] [ ] for local communities.',
        blanks: [
          { id: 'b1', correctAnswer: 'play', options: ['play', 'have', 'take', 'perform'] },
          { id: 'b2', correctAnswer: 'an', options: ['an', 'a', 'the', 'some'] },
          { id: 'b3', correctAnswer: 'important', options: ['important', 'significant', 'crucial', 'vital'] },
          { id: 'b4', correctAnswer: 'role', options: ['role', 'part', 'function', 'position'] },
          { id: 'b5', correctAnswer: 'in', options: ['in', 'for', 'with', 'on'] },
          { id: 'b6', correctAnswer: 'wildlife', options: ['wildlife', 'animal', 'species', 'fauna'] },
          { id: 'b7', correctAnswer: 'conservation', options: ['conservation', 'protection', 'preservation', 'safeguarding'] },
          { id: 'b8', correctAnswer: 'provide', options: ['provide', 'offer', 'supply', 'give'] },
          { id: 'b9', correctAnswer: 'job', options: ['job', 'employment', 'work', 'career'] },
          { id: 'b10', correctAnswer: 'opportunities', options: ['opportunities', 'chances', 'possibilities', 'prospects'] }
        ],
        explanation: 'play an important role in wildlife conservation 表示在野生动物保护中发挥重要作用，provide job opportunities 表示提供就业机会，符合句子语境。',
        feedback: '正确！play an important role in wildlife conservation 表示在野生动物保护中发挥重要作用，provide job opportunities 表示提供就业机会。',
        translation: '支持者断言，动物园在野生动物保护中发挥重要作用，并且为当地社区提供就业机会。'
      },
      {
        id: 'p9',
        question: 'Nevertheless, opponents point out that zoo animals are kept in [ ] [ ]. As a result, they [ ] [ ] [ ] [ ] [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'artificial', options: ['artificial', 'man-made', 'synthetic', 'unnatural'] },
          { id: 'b2', correctAnswer: 'environments', options: ['environments', 'habitats', 'settings', 'surroundings'] },
          { id: 'b3', correctAnswer: 'lose', options: ['lose', 'lose', 'forfeit', 'surrender'] },
          { id: 'b4', correctAnswer: 'the', options: ['the', 'a', 'any', 'some'] },
          { id: 'b5', correctAnswer: 'freedom', options: ['freedom', 'liberty', 'independence', 'autonomy'] },
          { id: 'b6', correctAnswer: 'to', options: ['to', 'for', 'of', 'in'] },
          { id: 'b7', correctAnswer: 'hunt', options: ['hunt', 'search', 'look', 'seek'] },
          { id: 'b8', correctAnswer: 'for', options: ['for', 'after', 'about', 'in'] },
          { id: 'b9', correctAnswer: 'food', options: ['food', 'prey', 'nourishment', 'sustenance'] }
        ],
        explanation: 'artificial environments 表示人造环境，lose the freedom to hunt for food 表示失去捕食的自由，符合句子语境。',
        feedback: '正确！artificial environments 表示人造环境，lose the freedom to hunt for food 表示失去捕食的自由。',
        translation: '然而，反对者指出，动物园动物被关在人造环境中。结果，它们失去了捕食的自由。'
      },
      {
        id: 'p10',
        question: 'Critics firmly believe that the best way to save endangered species is by [ ] [ ] [ ], arguing that we have no right to use animals for [ ] [ ] [ ].',
        blanks: [
          { id: 'b1', correctAnswer: 'protecting', options: ['protecting', 'preserving', 'safeguarding', 'defending'] },
          { id: 'b2', correctAnswer: 'natural', options: ['natural', 'wild', 'untamed', 'pristine'] },
          { id: 'b3', correctAnswer: 'habitats', options: ['habitats', 'environments', 'homes', 'ecosystems'] },
          { id: 'b4', correctAnswer: 'entertainment', options: ['entertainment', 'amusement', 'recreation', 'pleasure'] },
          { id: 'b5', correctAnswer: 'and', options: ['and', 'or', 'as', 'but'] },
          { id: 'b6', correctAnswer: 'profit', options: ['profit', 'gain', 'benefit', 'advantage'] }
        ],
        explanation: 'protecting natural habitats 表示保护自然栖息地，entertainment and profit 表示娱乐和盈利，符合句子语境。',
        feedback: '正确！protecting natural habitats 表示保护自然栖息地，entertainment and profit 表示娱乐和盈利。',
        translation: '批评者坚信，拯救濒危物种的最佳方法是保护自然栖息地，他们认为我们没有权利将动物用于娱乐和盈利。'
      }
    ]
  },
  {
    id: 'unit3',
    title: 'Unit 3 介词短语',
    description: '掌握常用介词短语，丰富写作表达',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 10,
    practices: [
      {
        id: 'p1',
        question: 'The book is [ ] the table.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'on',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'on表示在...上面，所以用on。',
        feedback: '正确！on表示在...上面，用于表示物体表面的位置。'
      },
      {
        id: 'p2',
        question: 'She lives [ ] New York City.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'in',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'in表示在...里面（大地点），所以用in。',
        feedback: '正确！in表示在...里面，用于表示大地点的位置。'
      },
      {
        id: 'p3',
        question: 'We met [ ] the park entrance.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'at',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'at表示在...（小地点），所以用at。',
        feedback: '正确！at表示在...，用于表示小地点的位置。'
      },
      {
        id: 'p4',
        question: 'The cat is [ ] the bed.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'under',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'under表示在...下面，所以用under。',
        feedback: '正确！under表示在...下面，用于表示物体下方的位置。'
      },
      {
        id: 'p5',
        question: 'He arrived [ ] time for the meeting.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'on',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'on time是固定搭配，表示准时，所以用on。',
        feedback: '正确！on time是固定搭配，表示准时。'
      },
      {
        id: 'p6',
        question: 'She is interested [ ] learning English.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'in',
            options: ['on', 'in', 'at', 'under']
          }
        ],
        explanation: 'be interested in是固定搭配，表示对...感兴趣，所以用in。',
        feedback: '正确！be interested in是固定搭配，表示对...感兴趣，后面接动名词。'
      },
      {
        id: 'p7',
        question: 'We are proud [ ] our achievements.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'of',
            options: ['on', 'in', 'at', 'of']
          }
        ],
        explanation: 'be proud of是固定搭配，表示为...感到骄傲，所以用of。',
        feedback: '正确！be proud of是固定搭配，表示为...感到骄傲。'
      },
      {
        id: 'p8',
        question: 'He is good [ ] playing basketball.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'at',
            options: ['on', 'in', 'at', 'of']
          }
        ],
        explanation: 'be good at是固定搭配，表示擅长，所以用at。',
        feedback: '正确！be good at是固定搭配，表示擅长，后面接动名词。'
      },
      {
        id: 'p9',
        question: 'She is afraid [ ] heights.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'of',
            options: ['on', 'in', 'at', 'of']
          }
        ],
        explanation: 'be afraid of是固定搭配，表示害怕，所以用of。',
        feedback: '正确！be afraid of是固定搭配，表示害怕。'
      },
      {
        id: 'p10',
        question: 'We are looking forward [ ] the weekend.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'to',
            options: ['on', 'in', 'at', 'to']
          }
        ],
        explanation: 'look forward to是固定搭配，表示期待，所以用to。',
        feedback: '正确！look forward to是固定搭配，表示期待，后面接名词或动名词。'
      }
    ]
  },
  {
    id: 'unit4',
    title: 'Unit 4 测试单元',
    description: '包含Unit 1中的3个测试题，用于手动测试网站功能',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 3,
    practices: [
      {
        id: 'p1',
        question: 'In the realm of contemporary commerce, advertising is a [ ] [ ] of business.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'key',
            options: ['key', 'important', 'major', 'vital']
          },
          {
            id: 'b2',
            correctAnswer: 'part',
            options: ['part', 'component', 'element', 'aspect']
          }
        ],
        explanation: 'key part 表示关键部分，符合句子语境。',
        feedback: '正确！key part 表示关键部分，在当代商业领域，广告是业务的关键部分。',
        translation: '在当代商业领域，广告是业务的关键部分。'
      },
      {
        id: 'p2',
        question: 'Advertisements [ ] customers [ ] the products and services that are available.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'inform',
            options: ['inform', 'tell', 'notify', 'educate']
          },
          {
            id: 'b2',
            correctAnswer: 'about',
            options: ['about', 'of', 'on', 'regarding']
          }
        ],
        explanation: 'inform... about 表示告知某人关于某事，符合句子语境。',
        feedback: '正确！inform... about 表示告知，广告让消费者了解现有的产品和服务。',
        translation: '广告让消费者了解现有的产品和服务。'
      },
      {
        id: 'p3',
        question: 'Advertising helps to [ ] [ ] and [ ] the economy.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'increase',
            options: ['increase', 'boost', 'raise', 'enhance']
          },
          {
            id: 'b2',
            correctAnswer: 'sales',
            options: ['sales', 'revenue', 'profits', 'income']
          },
          {
            id: 'b3',
            correctAnswer: 'stimulate',
            options: ['stimulate', 'boost', 'drive', 'promote']
          }
        ],
        explanation: 'increase sales 表示增加销量，stimulate the economy 表示刺激经济，符合句子语境。',
        feedback: '正确！increase sales 表示增加销量，stimulate the economy 表示刺激经济，广告有助于增加销量并刺激经济。',
        translation: '广告有助于增加销量并刺激经济。'
      }
    ]
  }
];
