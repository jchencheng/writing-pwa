import React, { useState } from 'react';
import type { PracticeUnit } from '../types';

interface HomePageProps {
  units: PracticeUnit[];
  progress: { [unitId: string]: number };
  onUnitSelect: (unit: PracticeUnit) => void;
  onViewErrorBook: () => void;
  onViewSettings: () => void;
  onAddCustomUnit: () => void;
  lastPracticedUnitId: string | null;
  onStudyUnit: (unit: PracticeUnit) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  units,
  progress,
  onUnitSelect,
  onViewErrorBook,
  onViewSettings,
  onAddCustomUnit,
  lastPracticedUnitId,
  onStudyUnit,
  darkMode,
  onToggleDarkMode
}) => {
  const [showUnitOptions, setShowUnitOptions] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PracticeUnit | null>(null);

  const lastPracticedUnit = lastPracticedUnitId ? units.find(unit => unit.id === lastPracticedUnitId) : null;

  const calculateTotalProgress = (): number => {
    if (units.length === 0) return 0;
    const totalProgress = units.reduce((sum, unit) => sum + (progress[unit.id] || 0), 0);
    return Math.round((totalProgress / units.length) * 100);
  };

  const handleUnitClick = (unit: PracticeUnit) => {
    const unitProgress = progress[unit.id] || 0;
    if (unitProgress >= 1) {
      setSelectedUnit(unit);
      setShowUnitOptions(true);
    } else {
      onUnitSelect(unit);
    }
  };

  const handleRetryErrors = () => {
    if (selectedUnit) {
      onUnitSelect(selectedUnit);
      setShowUnitOptions(false);
      setSelectedUnit(null);
    }
  };

  const handleRetest = () => {
    if (selectedUnit) {
      onUnitSelect(selectedUnit);
      setShowUnitOptions(false);
      setSelectedUnit(null);
    }
  };

  const totalProgress = calculateTotalProgress();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="navbar">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gradient hidden sm:block">
                English Writing
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleDarkMode}
                className="icon-btn"
                title={darkMode ? "切换到浅色模式" : "切换到深色模式"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={onViewErrorBook}
                className="btn btn-secondary btn-sm hidden sm:flex"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                错题本
              </button>

              <button
                onClick={onViewSettings}
                className="btn btn-secondary btn-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline">设置</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="card p-6 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>学习进度</h2>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>总体完成情况</p>
              </div>
            </div>
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{totalProgress}%</span>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{units.length} 个单元</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
            </div>
          </div>

          {/* Continue Learning */}
          {lastPracticedUnit ? (
            <div className="card p-6 animate-fade-in-up stagger-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{lastPracticedUnit.title}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>继续上次学习</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>进度</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{Math.round((progress[lastPracticedUnit.id] || 0) * 100)}%</span>
              </div>
              <div className="progress-bar mb-4">
                <div className="progress-fill" style={{ width: `${(progress[lastPracticedUnit.id] || 0) * 100}%` }} />
              </div>
              <button
                onClick={() => onUnitSelect(lastPracticedUnit)}
                className="btn btn-primary w-full"
              >
                继续练习
              </button>
            </div>
          ) : (
            <div className="card p-6 animate-fade-in-up stagger-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--primary-soft)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>开始学习</h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>选择一个单元开始你的学习之旅</p>
            </div>
          )}
        </div>

        {/* Add Custom Unit Button */}
        <button
          onClick={onAddCustomUnit}
          className="w-full card p-4 mb-8 flex items-center justify-center gap-3 group animate-fade-in-up stagger-2"
          style={{ borderStyle: 'dashed', borderWidth: '2px' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--accent-soft)' }}>
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>添加自定义练习单元</span>
        </button>

        {/* Units Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>练习单元</h2>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => {
            const unitProgressValue = progress[unit.id] || 0;
            const unitProgress = Math.round(unitProgressValue * 100);
            const isCompleted = unitProgress >= 100;

            return (
              <div
                key={unit.id}
                className="card card-interactive p-5 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{unit.title}</h3>
                  <span className={`tag ${isCompleted ? 'tag-success' : 'tag-primary'}`}>
                    {isCompleted ? '已完成' : unit.level}
                  </span>
                </div>

                <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {unit.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>进度</span>
                    <span className="text-sm font-semibold" style={{ color: isCompleted ? 'var(--success)' : 'var(--primary)' }}>{unitProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${isCompleted ? 'progress-fill-success' : ''}`}
                      style={{ width: `${unitProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleUnitClick(unit)}
                    className="btn btn-primary flex-1 btn-sm"
                  >
                    {isCompleted ? '复习' : '开始练习'}
                  </button>
                  <button
                    onClick={() => onStudyUnit(unit)}
                    className="btn btn-secondary btn-sm"
                  >
                    学习
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            English Writing Practice — 通过填空练习强化英语短语与单词记忆
          </p>
        </div>
      </footer>

      {/* Unit Options Modal */}
      {showUnitOptions && selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowUnitOptions(false);
              setSelectedUnit(null);
            }}
          />
          <div className="relative card p-6 w-full max-w-md animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{selectedUnit.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>此单元已完成，您想如何继续？</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRetryErrors}
                className="btn btn-primary w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                重做错题
              </button>

              <button
                onClick={handleRetest}
                className="btn btn-secondary w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重新测试
              </button>

              <button
                onClick={() => {
                  setShowUnitOptions(false);
                  setSelectedUnit(null);
                }}
                className="btn btn-ghost w-full"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
