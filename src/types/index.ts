// 练习单元类型
export interface PracticeUnit {
  id: string;
  title: string;
  description: string;
  practices: Practice[];
  level: 'beginner' | 'intermediate' | 'advanced';
  completedCount: number;
  practiceCount: number;
}

// 练习题目类型
export interface Practice {
  id: string;
  question: string; // 题目内容，使用 [ ] 标记填空
  blanks: Blank[];
  explanation: string; // 题目解析
  feedback: string; // 反馈信息
  translation?: string; // 中文翻译
}

// 填空类型
export interface Blank {
  id: string;
  correctAnswer: string;
  options?: string[]; // 可选的答案选项
  userAnswer?: string; // 用户答案
  isCorrect?: boolean; // 是否正确
}

// 用户答案类型
export interface UserAnswer {
  unitId: string;
  practiceId: string;
  blankIndex: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  question: string;
  explanation: string;
}

// 练习报告类型
export interface PracticeReport {
  unitId: string;
  unitTitle: string;
  totalCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  timeSpent: number; // 用时（秒）
  incorrectAnswers: UserAnswer[];
}

// 统计数据类型
export interface Statistics {
  totalPractices: number;
  completedPractices: number;
  totalAccuracy: number;
  levelDistribution: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  errorPatterns: string[];
}
