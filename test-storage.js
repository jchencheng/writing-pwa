// 测试localStorage数据存储情况
console.log('=== Testing localStorage ===');

// 检查localStorage中的所有键
const keys = Object.keys(localStorage);
console.log('LocalStorage keys:', keys);

// 检查特定的存储键
const storageKeys = {
  PROGRESS: 'writingPractice_progress',
  ERROR_BOOK: 'writingPractice_errorBook',
  LAST_PRACTICED_UNIT: 'writingPractice_lastPracticedUnitId',
  PRACTICE_POSITIONS: 'writingPractice_positions'
};

for (const [key, value] of Object.entries(storageKeys)) {
  const data = localStorage.getItem(value);
  console.log(`\n${key} (${value}):`);
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      console.log('Data:', parsedData);
    } catch (error) {
      console.log('Error parsing data:', error);
      console.log('Raw data:', data);
    }
  } else {
    console.log('No data found');
  }
}

// 检查sessionStorage
console.log('\n=== Testing sessionStorage ===');
const sessionKeys = Object.keys(sessionStorage);
console.log('SessionStorage keys:', sessionKeys);

for (const [key, value] of Object.entries(storageKeys)) {
  const data = sessionStorage.getItem(value);
  console.log(`\n${key} (${value}):`);
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      console.log('Data:', parsedData);
    } catch (error) {
      console.log('Error parsing data:', error);
      console.log('Raw data:', data);
    }
  } else {
    console.log('No data found');
  }
}
