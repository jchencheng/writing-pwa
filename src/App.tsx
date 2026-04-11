import React, { useState, useEffect, useCallback } from 'react';
import type { PracticeUnit, UserAnswer, PracticeReport } from './types';
import HomePage from './pages/HomePage';
import UnitDetailPage from './pages/UnitDetailPage';
import UnitStudyPage from './pages/UnitStudyPage';
import PracticeReportPage from './pages/PracticeReportPage';
import ErrorBookPage from './pages/ErrorBookPage';
import SettingsPage from './pages/SettingsPage';
import CustomUnitPage from './pages/CustomUnitPage';
import { defaultUnits } from './data/defaultUnits';

type Page = 'home' | 'unit' | 'study' | 'report' | 'errorBook' | 'settings' | 'customUnit';
type PracticeMode = 'retest' | 'retryErrors';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedUnit, setSelectedUnit] = useState<PracticeUnit | null>(null);
  const [units, setUnits] = useState<PracticeUnit[]>(defaultUnits);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [errorBook, setErrorBook] = useState<UserAnswer[]>([]);
  const [practiceProgress, setPracticeProgress] = useState<{ [unitId: string]: number }>({});
  const [practiceReport, setPracticeReport] = useState<PracticeReport | null>(null);
  const [lastPracticedUnitId, setLastPracticedUnitId] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('retest');
  const [customUnits, setCustomUnits] = useState<PracticeUnit[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUserAnswers = localStorage.getItem('userAnswers');
    const savedErrorBook = localStorage.getItem('errorBook');
    const savedProgress = localStorage.getItem('practiceProgress');
    const savedLastUnit = localStorage.getItem('lastPracticedUnitId');
    const savedCustomUnits = localStorage.getItem('customUnits');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedUserAnswers) {
      try {
        setUserAnswers(JSON.parse(savedUserAnswers));
      } catch (e) {
        console.error('Error parsing userAnswers:', e);
      }
    }

    if (savedErrorBook) {
      try {
        setErrorBook(JSON.parse(savedErrorBook));
      } catch (e) {
        console.error('Error parsing errorBook:', e);
      }
    }

    if (savedProgress) {
      try {
        setPracticeProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Error parsing practiceProgress:', e);
      }
    }

    if (savedLastUnit) {
      setLastPracticedUnitId(savedLastUnit);
    }

    if (savedCustomUnits) {
      try {
        const parsedCustomUnits = JSON.parse(savedCustomUnits);
        setCustomUnits(parsedCustomUnits);
        setUnits([...defaultUnits, ...parsedCustomUnits]);
      } catch (e) {
        console.error('Error parsing customUnits:', e);
      }
    }

    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem('errorBook', JSON.stringify(errorBook));
  }, [errorBook]);

  useEffect(() => {
    localStorage.setItem('practiceProgress', JSON.stringify(practiceProgress));
  }, [practiceProgress]);

  useEffect(() => {
    if (lastPracticedUnitId) {
      localStorage.setItem('lastPracticedUnitId', lastPracticedUnitId);
    }
  }, [lastPracticedUnitId]);

  useEffect(() => {
    localStorage.setItem('customUnits', JSON.stringify(customUnits));
  }, [customUnits]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleUnitSelect = useCallback((unit: PracticeUnit) => {
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    setPracticeMode('retest');
    setCurrentPage('unit');
  }, []);

  const handleStudyUnit = useCallback((unit: PracticeUnit) => {
    setSelectedUnit(unit);
    setLastPracticedUnitId(unit.id);
    setCurrentPage('study');
  }, []);

  const handlePracticeComplete = useCallback((report: PracticeReport) => {
    setPracticeReport(report);
    setCurrentPage('report');

    // Add incorrect answers to error book
    report.incorrectAnswers.forEach(error => {
      const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
      const existingIndex = errorBook.findIndex(e =>
        `${e.unitId}-${e.practiceId}-${e.blankIndex}` === errorId
      );

      if (existingIndex === -1) {
        setErrorBook(prev => [...prev, error]);
      }
    });
  }, [errorBook]);

  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedUnit(null);
    setPracticeReport(null);
  }, []);

  const handleViewErrorBook = useCallback(() => {
    setCurrentPage('errorBook');
  }, []);

  const handleViewSettings = useCallback(() => {
    setCurrentPage('settings');
  }, []);

  const handleAddCustomUnit = useCallback(() => {
    setCurrentPage('customUnit');
  }, []);

  const handleUnitCreated = useCallback((unit: PracticeUnit) => {
    const newCustomUnits = [...customUnits, unit];
    setCustomUnits(newCustomUnits);
    setUnits([...defaultUnits, ...newCustomUnits]);
    setCurrentPage('home');
  }, [customUnits]);

  const handleDeleteError = useCallback((errorId: string) => {
    setErrorBook(prev => prev.filter(error =>
      `${error.unitId}-${error.practiceId}-${error.blankIndex}` !== errorId
    ));
  }, []);

  const handleProgressUpdate = useCallback((unitId: string, progress: number) => {
    setPracticeProgress(prev => ({
      ...prev,
      [unitId]: progress
    }));
  }, []);

  const handlePositionUpdate = useCallback(() => {
    // Position is tracked in UnitDetailPage component state
    // This is a placeholder for future position persistence
  }, []);

  const handleAddError = useCallback((error: UserAnswer) => {
    const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
    const existingIndex = errorBook.findIndex(e =>
      `${e.unitId}-${e.practiceId}-${e.blankIndex}` === errorId
    );

    if (existingIndex === -1) {
      setErrorBook(prev => [...prev, error]);
    }
  }, [errorBook]);

  const handleRemoveError = useCallback((errorId: string) => {
    setErrorBook(prev => prev.filter(error =>
      `${error.unitId}-${error.practiceId}-${error.blankIndex}` !== errorId
    ));
  }, []);

  const handleRetry = useCallback(() => {
    if (selectedUnit) {
      setPracticeMode('retest');
      setCurrentPage('unit');
    }
  }, [selectedUnit]);

  const handleRetryErrors = useCallback(() => {
    if (selectedUnit) {
      setPracticeMode('retryErrors');
      setCurrentPage('unit');
    }
  }, [selectedUnit]);

  const handleImportData = useCallback((data: {
    userAnswers?: UserAnswer[];
    errorBook?: UserAnswer[];
    practiceProgress?: { [unitId: string]: number };
    customUnits?: PracticeUnit[];
  }) => {
    if (data.userAnswers) {
      setUserAnswers(data.userAnswers);
    }
    if (data.errorBook) {
      setErrorBook(data.errorBook);
    }
    if (data.practiceProgress) {
      setPracticeProgress(data.practiceProgress);
    }
    if (data.customUnits) {
      setCustomUnits(data.customUnits);
      setUnits([...defaultUnits, ...data.customUnits]);
    }
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            units={units}
            progress={practiceProgress}
            onUnitSelect={handleUnitSelect}
            onViewErrorBook={handleViewErrorBook}
            onViewSettings={handleViewSettings}
            onAddCustomUnit={handleAddCustomUnit}
            lastPracticedUnitId={lastPracticedUnitId}
            onStudyUnit={handleStudyUnit}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      case 'unit':
        if (!selectedUnit) return null;
        return (
          <UnitDetailPage
            unit={selectedUnit}
            onPracticeComplete={handlePracticeComplete}
            onBack={handleBackToHome}
            onProgressUpdate={handleProgressUpdate}
            onPositionUpdate={handlePositionUpdate}
            onAddError={handleAddError}
            onRemoveError={handleRemoveError}
            practiceMode={practiceMode}
            errorBook={errorBook}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      case 'study':
        if (!selectedUnit) return null;
        return (
          <UnitStudyPage
            unit={selectedUnit}
            onStartPractice={() => setCurrentPage('unit')}
            onBack={handleBackToHome}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      case 'report':
        if (!practiceReport || !selectedUnit) return null;
        return (
          <PracticeReportPage
            report={practiceReport}
            unit={selectedUnit}
            onBack={handleBackToHome}
            onRetry={handleRetry}
            onRetryErrors={handleRetryErrors}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      case 'errorBook':
        return (
          <ErrorBookPage
            errorBook={errorBook}
            units={units}
            onBack={handleBackToHome}
            onDeleteError={handleDeleteError}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
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
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      case 'customUnit':
        return (
          <CustomUnitPage
            onBack={handleBackToHome}
            onUnitCreated={handleUnitCreated}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {renderPage()}
    </div>
  );
};

export default App;
