// 测试数据持久化功能
console.log('=== Testing Data Persistence ===');

// 模拟存储键名
const STORAGE_KEYS = {
  PROGRESS: 'writingPractice_progress',
  ERROR_BOOK: 'writingPractice_errorBook',
  LAST_PRACTICED_UNIT: 'writingPractice_lastPracticedUnitId',
  PRACTICE_POSITIONS: 'writingPractice_positions'
};

// 模拟用户完成练习
function simulatePractice() {
  console.log('\n=== Simulating Practice ===');
  
  // 模拟练习数据
  const progress = { 'unit1': 0.8, 'unit2': 0.5 };
  const errorBook = [
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
  ];
  const lastPracticedUnitId = 'unit1';
  const practicePositions = { 'unit1': 3, 'unit2': 0 };
  
  // 保存数据
  console.log('Saving practice data...');
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(errorBook));
  localStorage.setItem(STORAGE_KEYS.LAST_PRACTICED_UNIT, lastPracticedUnitId);
  localStorage.setItem(STORAGE_KEYS.PRACTICE_POSITIONS, JSON.stringify(practicePositions));
  
  // 同时保存到sessionStorage
  sessionStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  sessionStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(errorBook));
  sessionStorage.setItem(STORAGE_KEYS.LAST_PRACTICED_UNIT, lastPracticedUnitId);
  sessionStorage.setItem(STORAGE_KEYS.PRACTICE_POSITIONS, JSON.stringify(practicePositions));
  
  console.log('Practice data saved successfully');
  console.log('Progress:', progress);
  console.log('Error book:', errorBook);
  console.log('Last practiced unit:', lastPracticedUnitId);
  console.log('Practice positions:', practicePositions);
  
  return { progress, errorBook, lastPracticedUnitId, practicePositions };
}

// 模拟页面重新加载
function simulatePageReload() {
  console.log('\n=== Simulating Page Reload ===');
  
  // 加载数据
  console.log('Loading data after reload...');
  const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  const savedErrorBook = localStorage.getItem(STORAGE_KEYS.ERROR_BOOK);
  const savedLastPracticedUnitId = localStorage.getItem(STORAGE_KEYS.LAST_PRACTICED_UNIT);
  const savedPositions = localStorage.getItem(STORAGE_KEYS.PRACTICE_POSITIONS);
  
  console.log('Loaded from localStorage:');
  console.log('Progress:', savedProgress ? JSON.parse(savedProgress) : null);
  console.log('Error book:', savedErrorBook ? JSON.parse(savedErrorBook) : null);
  console.log('Last practiced unit:', savedLastPracticedUnitId);
  console.log('Practice positions:', savedPositions ? JSON.parse(savedPositions) : null);
  
  // 同时检查sessionStorage
  const sessionProgress = sessionStorage.getItem(STORAGE_KEYS.PROGRESS);
  const sessionErrorBook = sessionStorage.getItem(STORAGE_KEYS.ERROR_BOOK);
  const sessionLastPracticedUnitId = sessionStorage.getItem(STORAGE_KEYS.LAST_PRACTICED_UNIT);
  const sessionPositions = sessionStorage.getItem(STORAGE_KEYS.PRACTICE_POSITIONS);
  
  console.log('\nLoaded from sessionStorage:');
  console.log('Progress:', sessionProgress ? JSON.parse(sessionProgress) : null);
  console.log('Error book:', sessionErrorBook ? JSON.parse(sessionErrorBook) : null);
  console.log('Last practiced unit:', sessionLastPracticedUnitId);
  console.log('Practice positions:', sessionPositions ? JSON.parse(sessionPositions) : null);
  
  return {
    progress: savedProgress ? JSON.parse(savedProgress) : null,
    errorBook: savedErrorBook ? JSON.parse(savedErrorBook) : null,
    lastPracticedUnitId: savedLastPracticedUnitId,
    positions: savedPositions ? JSON.parse(savedPositions) : null
  };
}

// 运行测试
function runTest() {
  console.log('Starting persistence test...');
  
  // 清除现有数据
  console.log('Clearing existing storage...');
  localStorage.clear();
  sessionStorage.clear();
  
  // 模拟练习
  const practiceData = simulatePractice();
  
  // 模拟页面重新加载
  const loadedData = simulatePageReload();
  
  // 验证数据一致性
  console.log('\n=== Verifying Data Consistency ===');
  console.log('Progress matches:', JSON.stringify(loadedData.progress) === JSON.stringify(practiceData.progress));
  console.log('Error book matches:', JSON.stringify(loadedData.errorBook) === JSON.stringify(practiceData.errorBook));
  console.log('Last practiced unit matches:', loadedData.lastPracticedUnitId === practiceData.lastPracticedUnitId);
  console.log('Positions match:', JSON.stringify(loadedData.positions) === JSON.stringify(practiceData.practicePositions));
  
  console.log('\n=== Test Complete ===');
}

// 运行测试
runTest();
