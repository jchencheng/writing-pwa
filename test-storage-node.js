// Node.js存储测试脚本
// 模拟localStorage和sessionStorage
const { JSDOM } = require('jsdom');

// 创建一个DOM环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  pretendToBeVisual: true,
  resources: 'usable'
});

// 模拟localStorage和sessionStorage
const localStorage = dom.window.localStorage;
const sessionStorage = dom.window.sessionStorage;

// 存储键名常量
const STORAGE_KEYS = {
  PROGRESS: 'writingPractice_progress',
  USER_ANSWERS: 'writingPractice_userAnswers',
  ERROR_BOOK: 'writingPractice_errorBook',
  LAST_PRACTICED_UNIT: 'writingPractice_lastPracticedUnitId',
  PRACTICE_POSITIONS: 'writingPractice_positions'
};

// 存储工具函数
const storage = {
  // 保存数据
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      
      // 尝试保存到localStorage
      try {
        localStorage.setItem(key, serializedValue);
        console.log(`Saved to localStorage: ${key}`);
      } catch (localError) {
        console.error('Error saving to localStorage:', localError);
      }
      
      // 尝试保存到sessionStorage
      try {
        sessionStorage.setItem(key, serializedValue);
        console.log(`Saved to sessionStorage: ${key}`);
      } catch (sessionError) {
        console.error('Error saving to sessionStorage:', sessionError);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving to storage:', error);
      return false;
    }
  },
  
  // 获取数据
  get: (key) => {
    try {
      console.log(`Attempting to load ${key} from storage`);
      
      // 先从localStorage获取
      try {
        console.log('Checking localStorage for', key);
        const localStorageValue = localStorage.getItem(key);
        console.log('localStorage value:', localStorageValue);
        if (localStorageValue) {
          try {
            const parsedValue = JSON.parse(localStorageValue);
            console.log(`Loaded from localStorage: ${key}`, parsedValue);
            return parsedValue;
          } catch (parseError) {
            console.error('Error parsing localStorage value:', parseError);
          }
        }
      } catch (localError) {
        console.error('Error reading from localStorage:', localError);
      }
      
      // 再从sessionStorage获取
      try {
        console.log('Checking sessionStorage for', key);
        const sessionStorageValue = sessionStorage.getItem(key);
        console.log('sessionStorage value:', sessionStorageValue);
        if (sessionStorageValue) {
          try {
            const parsedValue = JSON.parse(sessionStorageValue);
            console.log(`Loaded from sessionStorage: ${key}`, parsedValue);
            return parsedValue;
          } catch (parseError) {
            console.error('Error parsing sessionStorage value:', parseError);
          }
        }
      } catch (sessionError) {
        console.error('Error reading from sessionStorage:', sessionError);
      }
      
      console.log(`No data found for ${key}`);
      return null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }
};

// 测试数据
const testData = {
  progress: { 'unit1': 0.5, 'unit2': 0.3 },
  errorBook: [
    {
      unitId: 'unit1',
      practiceId: 'practice1',
      blankIndex: 0,
      userAnswer: 'wrong',
      correctAnswer: 'correct',
      isCorrect: false,
      question: 'This is a [ ] question',
      explanation: 'Explanation for the question'
    }
  ],
  lastPracticedUnitId: 'unit1',
  practicePositions: { 'unit1': 2, 'unit2': 0 }
};

// 测试保存操作
console.log('=== Testing Save Operations ===');
const progressSaved = storage.set(STORAGE_KEYS.PROGRESS, testData.progress);
const errorBookSaved = storage.set(STORAGE_KEYS.ERROR_BOOK, testData.errorBook);
const lastPracticedUnitSaved = storage.set(STORAGE_KEYS.LAST_PRACTICED_UNIT, testData.lastPracticedUnitId);
const positionsSaved = storage.set(STORAGE_KEYS.PRACTICE_POSITIONS, testData.practicePositions);

console.log('Save results:', {
  progressSaved,
  errorBookSaved,
  lastPracticedUnitSaved,
  positionsSaved
});

// 测试加载操作
console.log('\n=== Testing Load Operations ===');
const loadedProgress = storage.get(STORAGE_KEYS.PROGRESS);
const loadedErrorBook = storage.get(STORAGE_KEYS.ERROR_BOOK);
const loadedLastPracticedUnitId = storage.get(STORAGE_KEYS.LAST_PRACTICED_UNIT);
const loadedPositions = storage.get(STORAGE_KEYS.PRACTICE_POSITIONS);

console.log('Loaded data:', {
  progress: loadedProgress,
  errorBook: loadedErrorBook,
  lastPracticedUnitId: loadedLastPracticedUnitId,
  positions: loadedPositions
});

// 测试数据一致性
console.log('\n=== Testing Data Consistency ===');
console.log('Progress matches:', JSON.stringify(loadedProgress) === JSON.stringify(testData.progress));
console.log('Error book matches:', JSON.stringify(loadedErrorBook) === JSON.stringify(testData.errorBook));
console.log('Last practiced unit matches:', loadedLastPracticedUnitId === testData.lastPracticedUnitId);
console.log('Positions match:', JSON.stringify(loadedPositions) === JSON.stringify(testData.positions));

console.log('\n=== Test Complete ===');
