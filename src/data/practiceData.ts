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
    title: 'Unit 2 动词搭配',
    description: '学习常用动词与介词的搭配，提高写作准确性',
    level: 'intermediate',
    completedCount: 0,
    practiceCount: 10,
    practices: [
      {
        id: 'p1',
        question: 'I [ ] looking forward to meeting you again.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'am',
            options: ['am', 'is', 'are', 'was']
          }
        ],
        explanation: 'look forward to是固定搭配，表示期待，主语是I，所以用am。',
        feedback: '正确！look forward to是固定搭配，表示期待，后面接动名词。'
      },
      {
        id: 'p2',
        question: 'She [ ] care of her younger brother every day.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'takes',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take care of是固定搭配，表示照顾，主语是第三人称单数she，所以用takes。',
        feedback: '正确！take care of是固定搭配，表示照顾，主语是第三人称单数时用takes。'
      },
      {
        id: 'p3',
        question: 'They [ ] part in the school play last year.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'took',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take part in是固定搭配，表示参加，这里使用一般过去时，所以用took。',
        feedback: '正确！take part in是固定搭配，表示参加，过去式是took。'
      },
      {
        id: 'p4',
        question: 'We [ ] advantage of the good weather to go hiking.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'took',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take advantage of是固定搭配，表示利用，这里使用一般过去时，所以用took。',
        feedback: '正确！take advantage of是固定搭配，表示利用，过去式是took。'
      },
      {
        id: 'p5',
        question: 'He [ ] attention to the teacher in class.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'pays',
            options: ['pay', 'pays', 'paid', 'paying']
          }
        ],
        explanation: 'pay attention to是固定搭配，表示注意，主语是第三人称单数he，所以用pays。',
        feedback: '正确！pay attention to是固定搭配，表示注意，主语是第三人称单数时用pays。'
      },
      {
        id: 'p6',
        question: 'I [ ] pride in my work.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'take',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take pride in是固定搭配，表示为...感到骄傲，主语是I，所以用take。',
        feedback: '正确！take pride in是固定搭配，表示为...感到骄傲，主语I后用动词原形。'
      },
      {
        id: 'p7',
        question: 'She [ ] care of the garden every weekend.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'takes',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take care of是固定搭配，表示照顾，主语是第三人称单数she，所以用takes。',
        feedback: '正确！take care of是固定搭配，表示照顾，主语是第三人称单数时用takes。'
      },
      {
        id: 'p8',
        question: 'They [ ] part in the competition next month.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'will take',
            options: ['take', 'takes', 'took', 'will take']
          }
        ],
        explanation: 'take part in是固定搭配，表示参加，这里使用一般将来时，所以用will take。',
        feedback: '正确！take part in是固定搭配，表示参加，一般将来时用will take。'
      },
      {
        id: 'p9',
        question: 'We [ ] care of our health by eating well and exercising regularly.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'take',
            options: ['take', 'takes', 'took', 'taking']
          }
        ],
        explanation: 'take care of是固定搭配，表示照顾，主语是we，所以用take。',
        feedback: '正确！take care of是固定搭配，表示照顾，主语we后用动词原形。'
      },
      {
        id: 'p10',
        question: 'He [ ] attention to detail in his work.',
        blanks: [
          {
            id: 'b1',
            correctAnswer: 'pays',
            options: ['pay', 'pays', 'paid', 'paying']
          }
        ],
        explanation: 'pay attention to是固定搭配，表示注意，主语是第三人称单数he，所以用pays。',
        feedback: '正确！pay attention to是固定搭配，表示注意，主语是第三人称单数时用pays。'
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
