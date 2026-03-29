import type { PracticeUnit } from '../types';

export const mockPracticeUnits: PracticeUnit[] = [
  {
    id: '1',
    title: '基础短语练习',
    description: '掌握常用英语基础短语，提升写作表达能力',
    level: 'beginner',
    practiceCount: 5,
    completedCount: 0,
    practices: [
      {
        id: '1-1',
        question: 'I ______ to school every day.',
        blanks: [
          {
            id: '1-1-1',
            correctAnswer: 'go'
          }
        ],
        explanation: '"go to school" 是固定短语，表示去上学。',
        feedback: '正确！"go to school" 是固定短语，表示去上学。'
      },
      {
        id: '1-2',
        question: 'She ______ watching TV in the evening.',
        blanks: [
          {
            id: '1-2-1',
            correctAnswer: 'likes'
          }
        ],
        explanation: '"like doing something" 表示喜欢做某事，主语是第三人称单数，所以用likes。',
        feedback: '正确！"like doing something" 表示喜欢做某事。'
      },
      {
        id: '1-3',
        question: 'They ______ a party last weekend.',
        blanks: [
          {
            id: '1-3-1',
            correctAnswer: 'had'
          }
        ],
        explanation: '"have a party" 表示举办派对，过去式是 "had"。',
        feedback: '正确！"have a party" 表示举办派对，过去式是 "had"。'
      },
      {
        id: '1-4',
        question: 'We ______ going to the park tomorrow.',
        blanks: [
          {
            id: '1-4-1',
            correctAnswer: 'are'
          }
        ],
        explanation: '"be going to" 表示将来计划做某事，主语是we，所以用are。',
        feedback: '正确！"be going to" 表示将来计划做某事。'
      },
      {
        id: '1-5',
        question: 'He ______ his homework every night.',
        blanks: [
          {
            id: '1-5-1',
            correctAnswer: 'does'
          }
        ],
        explanation: '"do homework" 表示做作业，第三人称单数形式是 "does"。',
        feedback: '正确！"do homework" 表示做作业，第三人称单数形式是 "does"。'
      }
    ]
  },
  {
    id: '2',
    title: '商务写作常用表达',
    description: '学习商务场景中的常用英语表达，提高商务写作能力',
    level: 'intermediate',
    practiceCount: 5,
    completedCount: 0,
    practices: [
      {
        id: '2-1',
        question: 'Please ______ the attached document.',
        blanks: [
          {
            id: '2-1-1',
            correctAnswer: 'review'
          }
        ],
        explanation: '"review the document" 表示审阅文件。',
        feedback: '正确！"review the document" 表示审阅文件。'
      },
      {
        id: '2-2',
        question: 'We ______ forward to hearing from you.',
        blanks: [
          {
            id: '2-2-1',
            correctAnswer: 'look'
          }
        ],
        explanation: '"look forward to" 表示期待，后面接动名词。',
        feedback: '正确！"look forward to" 表示期待。'
      },
      {
        id: '2-3',
        question: 'Could you ______ me with this issue?',
        blanks: [
          {
            id: '2-3-1',
            correctAnswer: 'help'
          }
        ],
        explanation: '"help someone with something" 表示帮助某人做某事。',
        feedback: '正确！"help someone with something" 表示帮助某人做某事。'
      },
      {
        id: '2-4',
        question: 'I ______ to inform you that the meeting has been cancelled.',
        blanks: [
          {
            id: '2-4-1',
            correctAnswer: 'regret'
          }
        ],
        explanation: '"regret to inform" 表示遗憾地通知，后面接动词不定式。',
        feedback: '正确！"regret to inform" 表示遗憾地通知。'
      },
      {
        id: '2-5',
        question: 'Please ______ your response by Friday.',
        blanks: [
          {
            id: '2-5-1',
            correctAnswer: 'submit'
          }
        ],
        explanation: '"submit your response" 表示提交你的回复。',
        feedback: '正确！"submit your response" 表示提交你的回复。'
      }
    ]
  },
  {
    id: '3',
    title: '学术写作表达',
    description: '掌握学术写作中的常用表达，提高学术论文写作能力',
    level: 'advanced',
    practiceCount: 5,
    completedCount: 0,
    practices: [
      {
        id: '3-1',
        question: 'The study ______ that exercise improves mental health.',
        blanks: [
          {
            id: '3-1-1',
            correctAnswer: 'demonstrates'
          }
        ],
        explanation: '"demonstrate" 在学术写作中表示证明、展示，主语是第三人称单数，所以用demonstrates。',
        feedback: '正确！"demonstrate" 在学术写作中表示证明、展示。'
      },
      {
        id: '3-2',
        question: 'Furthermore, the results ______ with previous research.',
        blanks: [
          {
            id: '3-2-1',
            correctAnswer: 'align'
          }
        ],
        explanation: '"align with" 表示与...一致，主语是复数，所以用动词原形。',
        feedback: '正确！"align with" 表示与...一致。'
      },
      {
        id: '3-3',
        question: 'This phenomenon can be ______ to several factors.',
        blanks: [
          {
            id: '3-3-1',
            correctAnswer: 'attributed'
          }
        ],
        explanation: '"be attributed to" 表示归因于，这里使用被动语态。',
        feedback: '正确！"be attributed to" 表示归因于。'
      },
      {
        id: '3-4',
        question: 'The findings ______ the need for further investigation.',
        blanks: [
          {
            id: '3-4-1',
            correctAnswer: 'highlight'
          }
        ],
        explanation: '"highlight" 在学术写作中表示强调、突出，主语是复数，所以用动词原形。',
        feedback: '正确！"highlight" 在学术写作中表示强调、突出。'
      },
      {
        id: '3-5',
        question: 'In ______, the study provides valuable insights into the topic.',
        blanks: [
          {
            id: '3-5-1',
            correctAnswer: 'conclusion'
          }
        ],
        explanation: '"in conclusion" 是学术写作中常用的总结短语。',
        feedback: '正确！"in conclusion" 是学术写作中常用的总结短语。'
      }
    ]
  },
  {
    id: '4',
    title: '日常对话常用表达',
    description: '学习日常对话中的常用英语表达，提高口语交流能力',
    level: 'beginner',
    practiceCount: 5,
    completedCount: 0,
    practices: [
      {
        id: '4-1',
        question: 'How ______ are you?',
        blanks: [
          {
            id: '4-1-1',
            correctAnswer: 'are'
          }
        ],
        explanation: '"How are you?" 是常用的问候语，主语是you，所以用are。',
        feedback: '正确！"How are you?" 是常用的问候语。'
      },
      {
        id: '4-2',
        question: 'Im ______, thank you.',
        blanks: [
          {
            id: '4-2-1',
            correctAnswer: 'fine'
          }
        ],
        explanation: '"Im fine" 是对 "How are you?" 的常见回答。',
        feedback: '正确！"Im fine" 是对 "How are you?" 的常见回答。'
      },
      {
        id: '4-3',
        question: 'Nice to ______ you.',
        blanks: [
          {
            id: '4-3-1',
            correctAnswer: 'meet'
          }
        ],
        explanation: '"Nice to meet you" 是初次见面时的礼貌用语，to后面接动词原形。',
        feedback: '正确！"Nice to meet you" 是初次见面时的礼貌用语。'
      },
      {
        id: '4-4',
        question: 'Whats your ______?',
        blanks: [
          {
            id: '4-4-1',
            correctAnswer: 'name'
          }
        ],
        explanation: '"Whats your name?" 是询问对方姓名的常用表达。',
        feedback: '正确！"Whats your name?" 是询问对方姓名的常用表达。'
      },
      {
        id: '4-5',
        question: 'Where are you ______?',
        blanks: [
          {
            id: '4-5-1',
            correctAnswer: 'from'
          }
        ],
        explanation: '"Where are you from?" 是询问对方来自哪里的常用表达。',
        feedback: '正确！"Where are you from?" 是询问对方来自哪里的常用表达。'
      }
    ]
  }
];
