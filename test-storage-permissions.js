// 测试存储权限和容量
console.log('=== Testing Storage Permissions and Capacity ===');

// 测试1: 检查localStorage是否可用
try {
  localStorage.setItem('test_permission', 'test');
  localStorage.removeItem('test_permission');
  console.log('✓ localStorage is available');
} catch (error) {
  console.error('✗ localStorage is not available:', error);
}

// 测试2: 检查sessionStorage是否可用
try {
  sessionStorage.setItem('test_permission', 'test');
  sessionStorage.removeItem('test_permission');
  console.log('✓ sessionStorage is available');
} catch (error) {
  console.error('✗ sessionStorage is not available:', error);
}

// 测试3: 检查localStorage容量
console.log('\n=== Testing localStorage Capacity ===');
try {
  // 逐步增加存储大小
  let size = 0;
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  while (size < maxSize) {
    const testKey = `test_${size}`;
    const testValue = 'x'.repeat(1024); // 1KB
    localStorage.setItem(testKey, testValue);
    size += 1024;
  }
  
  console.log(`✓ localStorage capacity test: ${size / (1024 * 1024).toFixed(2)}MB`);
  
  // 清理测试数据
  for (let i = 0; i < size; i += 1024) {
    localStorage.removeItem(`test_${i}`);
  }
} catch (error) {
  console.error('✗ localStorage capacity test failed:', error);
}

// 测试4: 检查sessionStorage容量
console.log('\n=== Testing sessionStorage Capacity ===');
try {
  // 逐步增加存储大小
  let size = 0;
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  while (size < maxSize) {
    const testKey = `test_${size}`;
    const testValue = 'x'.repeat(1024); // 1KB
    sessionStorage.setItem(testKey, testValue);
    size += 1024;
  }
  
  console.log(`✓ sessionStorage capacity test: ${size / (1024 * 1024).toFixed(2)}MB`);
  
  // 清理测试数据
  for (let i = 0; i < size; i += 1024) {
    sessionStorage.removeItem(`test_${i}`);
  }
} catch (error) {
  console.error('✗ sessionStorage capacity test failed:', error);
}

// 测试5: 检查存储键的数量限制
console.log('\n=== Testing Storage Key Count Limit ===');
try {
  let keyCount = 0;
  const maxKeys = 1000;
  
  while (keyCount < maxKeys) {
    localStorage.setItem(`key_${keyCount}`, 'value');
    keyCount++;
  }
  
  console.log(`✓ localStorage key count test: ${keyCount} keys`);
  
  // 清理测试数据
  for (let i = 0; i < keyCount; i++) {
    localStorage.removeItem(`key_${i}`);
  }
} catch (error) {
  console.error('✗ localStorage key count test failed:', error);
}

// 测试6: 检查数据类型支持
console.log('\n=== Testing Data Type Support ===');
try {
  // 测试对象
  const testObject = { a: 1, b: 'test' };
  localStorage.setItem('test_object', JSON.stringify(testObject));
  const loadedObject = JSON.parse(localStorage.getItem('test_object'));
  console.log('✓ Object storage test:', loadedObject);
  
  // 测试数组
  const testArray = [1, 2, 3, 4, 5];
  localStorage.setItem('test_array', JSON.stringify(testArray));
  const loadedArray = JSON.parse(localStorage.getItem('test_array'));
  console.log('✓ Array storage test:', loadedArray);
  
  // 测试数字
  const testNumber = 12345;
  localStorage.setItem('test_number', JSON.stringify(testNumber));
  const loadedNumber = JSON.parse(localStorage.getItem('test_number'));
  console.log('✓ Number storage test:', loadedNumber);
  
  // 清理测试数据
  localStorage.removeItem('test_object');
  localStorage.removeItem('test_array');
  localStorage.removeItem('test_number');
} catch (error) {
  console.error('✗ Data type test failed:', error);
}

console.log('\n=== Permission Test Complete ===');
