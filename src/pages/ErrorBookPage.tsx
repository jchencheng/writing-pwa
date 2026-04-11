import React, { useState } from 'react';
import type { UserAnswer, PracticeUnit } from '../types';

interface ErrorBookPageProps {
  errorBook: UserAnswer[];
  units: PracticeUnit[];
  onBack: () => void;
  onDeleteError: (errorId: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const ErrorBookPage: React.FC<ErrorBookPageProps> = ({ errorBook, units, onBack, onDeleteError, darkMode, onToggleDarkMode }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const groupErrorsByUnit = () => {
    const grouped: { [unitId: string]: UserAnswer[] } = {};

    errorBook.forEach(error => {
      if (!grouped[error.unitId]) {
        grouped[error.unitId] = [];
      }
      grouped[error.unitId].push(error);
    });

    return grouped;
  };

  const groupedErrors = groupErrorsByUnit();
  const filteredUnits = selectedUnit === 'all' ? Object.keys(groupedErrors) : [selectedUnit];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="navbar">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="btn btn-secondary btn-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回
            </button>

            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>错题本</h1>

            <button
              onClick={onToggleDarkMode}
              className="icon-btn"
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 page-transition">
        {/* Filter */}
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedUnit('all')}
              className={`btn btn-sm ${selectedUnit === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              全部 ({errorBook.length})
            </button>
            {units.map(unit => {
              const unitErrors = groupedErrors[unit.id]?.length || 0;
              if (unitErrors === 0) return null;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit.id)}
                  className={`btn btn-sm ${selectedUnit === unit.id ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {unit.title} ({unitErrors})
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {errorBook.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--success-soft)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>暂无错题</h3>
            <p style={{ color: 'var(--text-tertiary)' }}>继续练习，错题会自动添加到这里</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUnits.map(unitId => {
              const unit = units.find(u => u.id === unitId);
              const errors = groupedErrors[unitId];
              if (!errors || errors.length === 0) return null;

              return (
                <div key={unitId} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-soft)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{unit?.title}</h3>
                    <span className="tag tag-primary ml-auto">{errors.length} 题</span>
                  </div>

                  <div className="space-y-3">
                    {errors.map((error, index) => {
                      const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
                      return (
                        <div
                          key={errorId}
                          className="card p-4 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="flex-1 text-sm" style={{ color: 'var(--text-primary)' }}>{error.question}</p>
                            <button
                              onClick={() => onDeleteError(errorId)}
                              className="icon-btn flex-shrink-0"
                              style={{ color: 'var(--error)' }}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--error-soft)' }}>
                              <p className="text-xs mb-1" style={{ color: 'var(--error-600)' }}>你的答案</p>
                              <p className="font-medium text-sm" style={{ color: 'var(--error)' }}>{error.userAnswer || '(未填写)'}</p>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--success-soft)' }}>
                              <p className="text-xs mb-1" style={{ color: 'var(--success-600)' }}>正确答案</p>
                              <p className="font-medium text-sm" style={{ color: 'var(--success)' }}>{error.correctAnswer}</p>
                            </div>
                          </div>
                          <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>{error.explanation}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ErrorBookPage;
