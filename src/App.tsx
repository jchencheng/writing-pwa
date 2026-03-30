import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import UnitDetailPage from './pages/UnitDetailPage';
import PracticeReportPage from './pages/PracticeReportPage';
import ErrorBookPage from './pages/ErrorBookPage';
import SettingsPage from './pages/SettingsPage';
import { practiceUnits } from './data/practiceData';
import type { PracticeUnit, UserAnswer, PracticeReport } from './types';

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
  set: (key: string, value: any): boolean => {
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
  get: (key: string) => {
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

// 主应用组件
const App: React.FC = () => {
  // 状态管理
  const [currentPage, setCurrentPage] = useState<'home' | 'unit' | 'report' | 'errorBook' | 'settings'>('home');
  const [selectedUnit, setSelectedUnit] = useState<PracticeUnit | null>(null);
  const [practiceReport, setPracticeReport] = useState<PracticeReport | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [errorBook, setErrorBook] = useState<UserAnswer[]>([]);
  const [practiceProgress, setPracticeProgress] = useState<{ [unitId: string]: number }>({});
  const [lastPracticedUnitId, setLastPracticedUnitId] = useState<string | null>(null);
  const [practicePositions, setPracticePositions] = useState<{ [unitId: string]: number }>({});

  // 从存储加载数据
  useEffect(() => {
    const loadData = () => {
      console.log('=== Loading data from storage ===');
      
      // 直接检查localStorage和sessionStorage
      console.log('\n=== Direct storage check ===');
      console.log('localStorage keys:', Object.keys(localStorage));
      console.log('sessionStorage keys:', Object.keys(sessionStorage));
      
      // 检查特定键
      for (const [key, value] of Object.entries(STORAGE_KEYS)) {
        console.log(`\n${key} (${value}):`);
        console.log('localStorage:', localStorage.getItem(value));
        console.log('sessionStorage:', sessionStorage.getItem(value));
      }
      
      // 加载所有数据
      const savedProgress = storage.get(STORAGE_KEYS.PROGRESS);
      const savedErrorBook = storage.get(STORAGE_KEYS.ERROR_BOOK);
      const savedUserAnswers = storage.get(STORAGE_KEYS.USER_ANSWERS);
      const savedLastPracticedUnitId = storage.get(STORAGE_KEYS.LAST_PRACTICED_UNIT);
      const savedPositions = storage.get(STORAGE_KEYS.PRACTICE_POSITIONS);
      
      console.log('\n=== Loaded data ===');
      console.log('Loaded progress:', savedProgress);
      console.log('Loaded error book:', savedErrorBook);
      console.log('Loaded user answers:', savedUserAnswers);
      console.log('Loaded last practiced unit:', savedLastPracticedUnitId);
      console.log('Loaded positions:', savedPositions);
      
      // 设置状态
      if (savedProgress) {
        console.log('Setting practice progress:', savedProgress);
        setPracticeProgress(savedProgress);
      }
      
      if (savedErrorBook) {
        console.log('Setting error book:', savedErrorBook);
        setErrorBook(savedErrorBook);
      }
      
      if (savedUserAnswers) {
        console.log('Setting user answers:', savedUserAnswers);
        setUserAnswers(savedUserAnswers);
      }
      
      if (savedLastPracticedUnitId) {
        console.log('Setting last practiced unit:', savedLastPracticedUnitId);
        setLastPracticedUnitId(savedLastPracticedUnitId);
      }
      
      if (savedPositions) {
        console.log('Setting practice positions:', savedPositions);
        setPracticePositions(savedPositions);
      }
      
      console.log('=== Data loaded successfully ===');
    };
    
    // 延迟加载，确保组件已经渲染
    setTimeout(loadData, 100);
  }, []);

  // 保存数据到存储
  const saveData = useCallback(() => {
    console.log('=== Saving data to storage ===');
    
    const data = {
      progress: practiceProgress,
      errorBook,
      userAnswers,
      lastPracticedUnitId,
      positions: practicePositions
    };
    
    console.log('Data to save:', data);
    
    // 保存所有数据
    const progressSaved = storage.set(STORAGE_KEYS.PROGRESS, practiceProgress);
    const errorBookSaved = storage.set(STORAGE_KEYS.ERROR_BOOK, errorBook);
    const userAnswersSaved = storage.set(STORAGE_KEYS.USER_ANSWERS, userAnswers);
    const lastPracticedUnitSaved = storage.set(STORAGE_KEYS.LAST_PRACTICED_UNIT, lastPracticedUnitId);
    const positionsSaved = storage.set(STORAGE_KEYS.PRACTICE_POSITIONS, practicePositions);
    
    console.log('Save results:', {
      progressSaved,
      errorBookSaved,
      userAnswersSaved,
      lastPracticedUnitSaved,
      positionsSaved
    });
    
    console.log('=== Data saved successfully ===');
  }, [practiceProgress, errorBook, userAnswers, lastPracticedUnitId, practicePositions]);

  // 当状态变化时保存数据
  useEffect(() => {
    // 只有当状态不是初始值时才保存数据
    // 避免首次渲染时覆盖存储中的数据
    if (Object.keys(practiceProgress).length > 0 || 
        errorBook.length > 0 || 
        userAnswers.length > 0 || 
        lastPracticedUnitId !== null || 
        Object.keys(practicePositions).length > 0) {
      saveData();
    }
  }, [practiceProgress, errorBook, userAnswers, lastPracticedUnitId, practicePositions]);

  // 导航到单元详情页
  const handleUnitSelect = useCallback((unit: PracticeUnit) => {
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    setCurrentPage('unit');
  }, []);

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
    setPracticeReport(null);
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
    
    console.log('=== Data imported successfully ===');
  }, []);

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            units={practiceUnits}
            progress={practiceProgress}
            onUnitSelect={handleUnitSelect}
            onViewErrorBook={handleViewErrorBook}
            onViewSettings={handleViewSettings}
            lastPracticedUnitId={lastPracticedUnitId}
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
            initialPosition={practicePositions[selectedUnit!.id] || 0}
          />
        );
      case 'report':
        return (
          <PracticeReportPage
            report={practiceReport!}
            unit={selectedUnit!}
            onBack={handleBackToHome}
            onRetry={() => setCurrentPage('unit')}
          />
        );
      case 'errorBook':
        return (
          <ErrorBookPage
            errorBook={errorBook}
            units={practiceUnits}
            onBack={handleBackToHome}
            onDeleteError={(errorId) => {
              setErrorBook(prev => prev.filter((error: UserAnswer) => 
                `${error.unitId}-${error.practiceId}-${error.blankIndex}` !== errorId
              ));
            }}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            userAnswers={userAnswers}
            errorBook={errorBook}
            practiceProgress={practiceProgress}
            onBack={handleBackToHome}
            onImportData={handleImportData}
          />
        );
      default:
        return (
          <HomePage
            units={practiceUnits}
            progress={practiceProgress}
            onUnitSelect={handleUnitSelect}
            onViewErrorBook={handleViewErrorBook}
            onViewSettings={handleViewSettings}
            lastPracticedUnitId={lastPracticedUnitId}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {renderCurrentPage()}
    </div>
  );
};

export default App;