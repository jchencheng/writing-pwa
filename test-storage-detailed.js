// 详细测试localStorage数据存储情况
console.log('=== Detailed Storage Test ===');

// 模拟存储键名
const STORAGE_KEYS = {
  PROGRESS: 'writingPractice_progress',
  ERROR_BOOK: 'writingPractice_errorBook',
  LAST_PRACTICED_UNIT: 'writingPractice_lastPracticedUnitId',
  PRACTICE_POSITIONS: 'writingPractice_positions'
};

// 模拟存储工具函数
const storage = {
  // 保存数据
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      // 同时保存到localStorage和sessionStorage
      localStorage.setItem(key, serializedValue);
      sessionStorage.setItem(key, serializedValue);
      console.log(`Saved ${key}:`, value);
      return true;
    } catch (error) {
      console.error('Error saving to storage:', error);
      return false;
    }
  },
  
  // 获取数据
  get: (key) => {
    try {
      // 先从localStorage获取
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue) {
        console.log(`Loaded ${key} from localStorage:`, JSON.parse(localStorageValue));
        return JSON.parse(localStorageValue);
      }
      
      // 再从sessionStorage获取
      const sessionStorageValue = sessionStorage.getItem(key);
      if (sessionStorageValue) {
        console.log(`Loaded ${key} from sessionStorage:`, JSON.parse(sessionStorageValue));
        return JSON.parse(sessionStorageValue);
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
console.log('\n=== Testing Save Operations ===');
const progressSaved = storage.set(STORAGE_KEYS.PROGRESS, testData.progress);
const errorBookSaved = storage.set(STORAGE_KEYS.ERROR_BOOK, testData.errorBook);
const lastPracticedUnitSaved = storage.set(STORAGE_KEYS.LAST_PRACTICED_UNIT, testData.lastPracticedUnitId);
const positionsSaved = storage.set(STORAGE_KEYS.PRACTICE_POSITIONS, testData.practicePositions);

console.log('\nSave results:', {
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

console.log('\nLoaded data:', {
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

// 测试localStorage容量
console.log('\n=== Testing localStorage Capacity ===');
try {
  const testString = 'x'.repeat(500000); // 500KB test string
  localStorage.setItem('test容量测试', testString);
  console.log('localStorage capacity test: PASSED');
  localStorage.removeItem('test容量测试');
} catch (error) {
  console.error('localStorage capacity test: FAILED', error);
}

// 测试sessionStorage容量
console.log('\n=== Testing sessionStorage Capacity ===');
try {
  const testString = 'x'.repeat(500000); // 500KB test string
  sessionStorage.setItem('test容量测试', testString);
  console.log('sessionStorage capacity test: PASSED');
  sessionStorage.removeItem('test容量测试');
} catch (error) {
  console.error('sessionStorage capacity test: FAILED', error);
}

// 测试存储键的数量
console.log('\n=== Testing Storage Key Count ===');
console.log('localStorage key count:', Object.keys(localStorage).length);
console.log('sessionStorage key count:', Object.keys(sessionStorage).length);

console.log('\n=== Test Complete ===');
