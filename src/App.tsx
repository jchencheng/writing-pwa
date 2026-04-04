import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import UnitDetailPage from './pages/UnitDetailPage';
import UnitStudyPage from './pages/UnitStudyPage';
import PracticeReportPage from './pages/PracticeReportPage';
import ErrorBookPage from './pages/ErrorBookPage';
import SettingsPage from './pages/SettingsPage';
import CustomUnitPage from './pages/CustomUnitPage';
import { practiceUnits } from './data/practiceData';
import type { PracticeUnit, UserAnswer, PracticeReport } from './types';

// 存储键名常量
const STORAGE_KEYS = {
  PROGRESS: 'writingPractice_progress',
  USER_ANSWERS: 'writingPractice_userAnswers',
  ERROR_BOOK: 'writingPractice_errorBook',
  LAST_PRACTICED_UNIT: 'writingPractice_lastPracticedUnitId',
  PRACTICE_POSITIONS: 'writingPractice_positions',
  DARK_MODE: 'writingPractice_darkMode',
  CUSTOM_UNITS: 'writingPractice_customUnits'
};

// IndexedDB 数据库名称和版本
const DB_NAME = 'WritingPracticeDB';
const DB_VERSION = 1;

// 打开 IndexedDB 数据库
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('Error opening IndexedDB:', request.error);
      reject(request.error);
    };
    
    request.onsuccess = () => {
      console.log('IndexedDB opened successfully');
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // 创建存储对象
      if (!db.objectStoreNames.contains('userData')) {
        db.createObjectStore('userData', { keyPath: 'key' });
        console.log('Created userData object store');
      }
    };
  });
};

// 存储工具函数
const storage = {
  // 保存数据
  set: async (key: string, value: any): Promise<boolean> => {
    try {
      const db = await openDB();
      const transaction = db.transaction('userData', 'readwrite');
      const store = transaction.objectStore('userData');
      
      const request = store.put({ key, value });
      
      return new Promise((resolve) => {
        request.onsuccess = () => {
          console.log(`Saved to IndexedDB: ${key}`);
          resolve(true);
        };
        
        request.onerror = () => {
          console.error('Error saving to IndexedDB:', request.error);
          resolve(false);
        };
      });
    } catch (error) {
      console.error('Error saving to storage:', error);
      return false;
    }
  },
  
  // 获取数据
  get: async (key: string) => {
    try {
      console.log(`Attempting to load ${key} from IndexedDB`);
      const db = await openDB();
      const transaction = db.transaction('userData', 'readonly');
      const store = transaction.objectStore('userData');
      
      const request = store.get(key);
      
      return new Promise((resolve) => {
        request.onsuccess = () => {
          if (request.result) {
            console.log(`Loaded from IndexedDB: ${key}`, request.result.value);
            resolve(request.result.value);
          } else {
            console.log(`No data found for ${key} in IndexedDB`);
            resolve(null);
          }
        };
        
        request.onerror = () => {
          console.error('Error reading from IndexedDB:', request.error);
          resolve(null);
        };
      });
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }
};

// 主应用组件
const App: React.FC = () => {
  // 状态管理
  const [currentPage, setCurrentPage] = useState<'home' | 'study' | 'unit' | 'report' | 'errorBook' | 'settings' | 'custom'>('home');
  const [selectedUnit, setSelectedUnit] = useState<PracticeUnit | null>(null);
  const [practiceReport, setPracticeReport] = useState<PracticeReport | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [errorBook, setErrorBook] = useState<UserAnswer[]>([]);
  const [practiceProgress, setPracticeProgress] = useState<{ [unitId: string]: number }>({});
  const [lastPracticedUnitId, setLastPracticedUnitId] = useState<string | null>(null);
  const [practicePositions, setPracticePositions] = useState<{ [unitId: string]: number }>({});
  const [practiceMode, setPracticeMode] = useState<'retest' | 'retryErrors'>('retest');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [customUnits, setCustomUnits] = useState<PracticeUnit[]>([]);

  // 从存储加载数据
  useEffect(() => {
    const loadData = async () => {
      console.log('=== Loading data from storage ===');
      
      try {
        // 加载所有数据
        const [
          savedProgress,
          savedErrorBook,
          savedUserAnswers,
          savedLastPracticedUnitId,
          savedPositions,
          savedDarkMode,
          savedCustomUnits
        ] = await Promise.all([
          storage.get(STORAGE_KEYS.PROGRESS),
          storage.get(STORAGE_KEYS.ERROR_BOOK),
          storage.get(STORAGE_KEYS.USER_ANSWERS),
          storage.get(STORAGE_KEYS.LAST_PRACTICED_UNIT),
          storage.get(STORAGE_KEYS.PRACTICE_POSITIONS),
          storage.get(STORAGE_KEYS.DARK_MODE),
          storage.get(STORAGE_KEYS.CUSTOM_UNITS)
        ]);
        
        console.log('\n=== Loaded data ===');
        console.log('Loaded progress:', savedProgress);
        console.log('Loaded error book:', savedErrorBook);
        console.log('Loaded user answers:', savedUserAnswers);
        console.log('Loaded last practiced unit:', savedLastPracticedUnitId);
        console.log('Loaded positions:', savedPositions);
        console.log('Loaded dark mode:', savedDarkMode);
        console.log('Loaded custom units:', savedCustomUnits);
        
        // 设置状态
        if (savedProgress && typeof savedProgress === 'object') {
          console.log('Setting practice progress:', savedProgress);
          setPracticeProgress(savedProgress as { [unitId: string]: number });
        }
        
        if (savedErrorBook && Array.isArray(savedErrorBook)) {
          console.log('Setting error book:', savedErrorBook);
          setErrorBook(savedErrorBook as UserAnswer[]);
        }
        
        if (savedUserAnswers && Array.isArray(savedUserAnswers)) {
          console.log('Setting user answers:', savedUserAnswers);
          setUserAnswers(savedUserAnswers as UserAnswer[]);
        }
        
        if (savedLastPracticedUnitId && typeof savedLastPracticedUnitId === 'string') {
          console.log('Setting last practiced unit:', savedLastPracticedUnitId);
          setLastPracticedUnitId(savedLastPracticedUnitId);
        }
        
        if (savedPositions && typeof savedPositions === 'object') {
          console.log('Setting practice positions:', savedPositions);
          setPracticePositions(savedPositions as { [unitId: string]: number });
        }
        
        if (savedDarkMode !== null && typeof savedDarkMode === 'boolean') {
          console.log('Setting dark mode:', savedDarkMode);
          setDarkMode(savedDarkMode);
        }
        
        if (savedCustomUnits && Array.isArray(savedCustomUnits)) {
          console.log('Setting custom units:', savedCustomUnits);
          setCustomUnits(savedCustomUnits as PracticeUnit[]);
        }
        
        console.log('=== Data loaded successfully ===');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    // 延迟加载，确保组件已经渲染
    setTimeout(loadData, 100);
  }, []);

  // 保存数据到存储
  const saveData = useCallback(async () => {
    console.log('=== Saving data to storage ===');
    
    const data = {
      progress: practiceProgress,
      errorBook,
      userAnswers,
      lastPracticedUnitId,
      positions: practicePositions,
      darkMode,
      customUnits
    };
    
    console.log('Data to save:', data);
    
    try {
      // 保存所有数据
      const [
        progressSaved,
        errorBookSaved,
        userAnswersSaved,
        lastPracticedUnitSaved,
        positionsSaved,
        darkModeSaved,
        customUnitsSaved
      ] = await Promise.all([
        storage.set(STORAGE_KEYS.PROGRESS, practiceProgress),
        storage.set(STORAGE_KEYS.ERROR_BOOK, errorBook),
        storage.set(STORAGE_KEYS.USER_ANSWERS, userAnswers),
        storage.set(STORAGE_KEYS.LAST_PRACTICED_UNIT, lastPracticedUnitId),
        storage.set(STORAGE_KEYS.PRACTICE_POSITIONS, practicePositions),
        storage.set(STORAGE_KEYS.DARK_MODE, darkMode),
        storage.set(STORAGE_KEYS.CUSTOM_UNITS, customUnits)
      ]);
      
      console.log('Save results:', {
        progressSaved,
        errorBookSaved,
        userAnswersSaved,
        lastPracticedUnitSaved,
        positionsSaved,
        darkModeSaved,
        customUnitsSaved
      });
      
      console.log('=== Data saved successfully ===');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [practiceProgress, errorBook, userAnswers, lastPracticedUnitId, practicePositions, darkMode, customUnits]);

  // 当状态变化时保存数据
  useEffect(() => {
    // 只有当状态不是初始值时才保存数据
    // 避免首次渲染时覆盖存储中的数据
    if (Object.keys(practiceProgress).length > 0 || 
        errorBook.length > 0 || 
        userAnswers.length > 0 || 
        lastPracticedUnitId !== null || 
        Object.keys(practicePositions).length > 0 ||
        customUnits.length > 0) {
      saveData();
    }
  }, [practiceProgress, errorBook, userAnswers, lastPracticedUnitId, practicePositions, customUnits]);

  // 导航到单元详情页
  const handleUnitSelect = useCallback((unit: PracticeUnit) => {
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    // 检查单元是否已完成（进度为100%）
    const unitProgress = practiceProgress[unit.id] || 0;
    if (unitProgress >= 1 && practiceReport && practiceReport.unitId === unit.id) {
      // 单元已完成，跳转到练习报告
      setCurrentPage('report');
    } else {
      // 单元未完成，先跳转到学习页面
      setCurrentPage('study');
    }
  }, [practiceReport, practiceProgress]);

  // 处理进度更新
  const handleProgressUpdate = useCallback((unitId: string, progress: number) => {
    setPracticeProgress(prev => {
      const newProgress = {
        ...prev,
        [unitId]: progress
      };
      return newProgress;
    });
  }, []);

  // 处理题目位置更新
  const handlePositionUpdate = useCallback((unitId: string, position: number) => {
    setPracticePositions(prev => {
      const newPositions = {
        ...prev,
        [unitId]: position
      };
      return newPositions;
    });
  }, []);

  // 处理添加错题
  const handleAddError = useCallback((error: UserAnswer) => {
    setErrorBook(prev => {
      // 去重
      const existingErrorIds = new Set(prev.map(e => `${e.unitId}-${e.practiceId}-${e.blankIndex}`));
      const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
      
      if (!existingErrorIds.has(errorId)) {
        return [...prev, error];
      }
      return prev;
    });
  }, []);
  
  // 处理移除错题
  const handleRemoveError = useCallback((errorId: string) => {
    setErrorBook(prev => prev.filter((error: UserAnswer) => 
      `${error.unitId}-${error.practiceId}-${error.blankIndex}` !== errorId
    ));
  }, []);

  // 导航到练习报告页
  const handlePracticeComplete = useCallback((report: PracticeReport) => {
    if (!report || !report.unitId) return;
    
    setPracticeReport(report);
    setCurrentPage('report');

    // 更新进度
    const newProgress = report.correctCount / report.totalCount;
    setPracticeProgress(prev => ({
      ...prev,
      [report.unitId]: newProgress
    }));

    // 更新错题本
    if (report.incorrectAnswers && report.incorrectAnswers.length > 0) {
      setErrorBook(prev => {
        const existingErrorIds = new Set(prev.map(e => `${e.unitId}-${e.practiceId}-${e.blankIndex}`));
        const newErrors = report.incorrectAnswers.filter((error: UserAnswer) => {
          const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
          return !existingErrorIds.has(errorId);
        });
        return [...prev, ...newErrors];
      });
    }
  }, []);

  // 导航到错题本
  const handleViewErrorBook = useCallback(() => {
    setCurrentPage('errorBook');
  }, []);

  // 导航回首页
  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedUnit(null);
    // 不清除 practiceReport，以便重新进入单元时跳转到练习报告
  }, []);

  // 导航到设置页面
  const handleViewSettings = useCallback(() => {
    setCurrentPage('settings');
  }, []);

  // 处理导入数据
  const handleImportData = useCallback((data: any) => {
    console.log('=== Importing data ===');
    console.log('Imported data:', data);

    if (data.practiceProgress) {
      setPracticeProgress(data.practiceProgress);
    }
    if (data.userAnswers) {
      setUserAnswers(data.userAnswers);
    }
    if (data.errorBook) {
      setErrorBook(data.errorBook);
    }
    if (data.lastPracticedUnitId) {
      setLastPracticedUnitId(data.lastPracticedUnitId);
    }
    if (data.practicePositions) {
      setPracticePositions(data.practicePositions);
    }
    if (data.customUnits) {
      setCustomUnits(data.customUnits);
    }

    console.log('=== Data imported successfully ===');
  }, []);

  // 从学习页面开始练习
  const handleStartPractice = useCallback(() => {
    setCurrentPage('unit');
  }, []);

  // 切换深色模式
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // 导航到学习页面
  const handleStudyUnit = useCallback((unit: PracticeUnit) => {
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    setCurrentPage('study');
  }, []);

  // 导航到自定义单元页面
  const handleAddCustomUnit = useCallback(() => {
    setCurrentPage('custom');
  }, []);

  // 处理自定义单元创建
  const handleUnitCreated = useCallback((unit: PracticeUnit) => {
    setCustomUnits(prev => [...prev, unit]);
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    setCurrentPage('study');
  }, []);

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            units={[...practiceUnits, ...customUnits]}
            progress={practiceProgress}
            onUnitSelect={handleUnitSelect}
            onViewErrorBook={handleViewErrorBook}
            onViewSettings={handleViewSettings}
            onAddCustomUnit={handleAddCustomUnit}
            lastPracticedUnitId={lastPracticedUnitId}
            onStudyUnit={handleStudyUnit}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'study':
        return (
          <UnitStudyPage
            unit={selectedUnit!}
            onStartPractice={handleStartPractice}
            onBack={handleBackToHome}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'unit':
        return (
          <UnitDetailPage
            unit={selectedUnit!}
            onPracticeComplete={handlePracticeComplete}
            onBack={handleBackToHome}
            onProgressUpdate={handleProgressUpdate}
            onPositionUpdate={handlePositionUpdate}
            onAddError={handleAddError}
            onRemoveError={handleRemoveError}
            practiceMode={practiceMode}
            errorBook={errorBook}
            initialPosition={practicePositions[selectedUnit!.id] || 0}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'report':
        return (
          <PracticeReportPage
            report={practiceReport!}
            unit={selectedUnit!}
            onBack={handleBackToHome}
            onRetry={() => {
              setPracticeMode('retest');
              setCurrentPage('unit');
            }}
            onRetryErrors={() => {
              setPracticeMode('retryErrors');
              setCurrentPage('unit');
            }}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'errorBook':
        return (
          <ErrorBookPage
            errorBook={errorBook}
            units={[...practiceUnits, ...customUnits]}
            onBack={handleBackToHome}
            onDeleteError={(errorId) => {
              setErrorBook(prev => prev.filter((error: UserAnswer) => 
                `${error.unitId}-${error.practiceId}-${error.blankIndex}` !== errorId
              ));
            }}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'custom':
        return (
          <CustomUnitPage
            onBack={handleBackToHome}
            onUnitCreated={handleUnitCreated}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            userAnswers={userAnswers}
            errorBook={errorBook}
            practiceProgress={practiceProgress}
            customUnits={customUnits}
            onBack={handleBackToHome}
            onImportData={handleImportData}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      default:
        return (
          <HomePage
            units={[...practiceUnits, ...customUnits]}
            progress={practiceProgress}
            onUnitSelect={handleUnitSelect}
            onViewErrorBook={handleViewErrorBook}
            onViewSettings={handleViewSettings}
            onAddCustomUnit={handleAddCustomUnit}
            lastPracticedUnitId={lastPracticedUnitId}
            onStudyUnit={handleStudyUnit}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {renderCurrentPage()}
    </div>
  );
};

export default App;