// Test localStorage functionality
console.log('Testing localStorage...');

// Test setting data
localStorage.setItem('testKey', 'testValue');
console.log('Set testKey:', localStorage.getItem('testKey'));

// Test updating data
localStorage.setItem('testKey', 'updatedValue');
console.log('Updated testKey:', localStorage.getItem('testKey'));

// Test removing data
localStorage.removeItem('testKey');
console.log('Removed testKey:', localStorage.getItem('testKey'));

// Test clearing all data
localStorage.setItem('testKey1', 'value1');
localStorage.setItem('testKey2', 'value2');
console.log('Before clear - testKey1:', localStorage.getItem('testKey1'));
console.log('Before clear - testKey2:', localStorage.getItem('testKey2'));
localStorage.clear();
console.log('After clear - testKey1:', localStorage.getItem('testKey1'));
console.log('After clear - testKey2:', localStorage.getItem('testKey2'));

console.log('localStorage test completed.');