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
    <div className="min-h-screen app-container">
      <header className="glass-nav sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] bg-clip-text text-transparent">
            错题本
          </h1>
          <button
            onClick={onToggleDarkMode}
            className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 page-transition">
        <div className="card practice-card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[18px] bg-gradient-to-r from-[#FFA8A8] to-[#FF8C8C] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#6B5063]">筛选错题</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedUnit('all')}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                selectedUnit === 'all' 
                  ? 'bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] text-white shadow-md' 
                  : 'bg-white border-2 border-[#F8A5D1]/30 text-[#6B5063] hover:border-[#F8A5D1] hover:bg-[#FFF5F8]'
              }`}
            >
              全部
            </button>
            {units.map(unit => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  selectedUnit === unit.id 
                    ? 'bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] text-white shadow-md' 
                    : 'bg-white border-2 border-[#F8A5D1]/30 text-[#6B5063] hover:border-[#F8A5D1] hover:bg-[#FFF5F8]'
                }`}
              >
                {unit.title}
              </button>
            ))}
          </div>
        </div>

        {errorBook.length === 0 ? (
          <div className="card practice-card text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FFF5F8] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#6B5063] mb-2">暂无错题</h3>
            <p className="text-[#8A6F81]">继续练习，错题会自动添加到这里</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUnits.map(unitId => {
              const unit = units.find(u => u.id === unitId);
              const errors = groupedErrors[unitId];
              return (
                <div key={unitId} className="card practice-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-[18px] bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#6B5063]">{unit?.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {errors && errors.map((error, index) => {
                      const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
                      return (
                        <div 
                          key={errorId} 
                          className="p-6 bg-[#FFD6D6]/40 rounded-[24px] border-2 border-[#FFA8A8]/40 scale-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <p className="flex-1 text-[#6B5063]">{error.question}</p>
                            <button
                              onClick={() => onDeleteError(errorId)}
                              className="text-[#FFA8A8] hover:text-[#FF8C8C] transition-colors ml-4"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 bg-white rounded-[18px]">
                              <span className="text-sm text-[#8A6F81]">你的答案：</span>
                              <span className="text-[#8A4A4A] ml-2 font-medium">{error.userAnswer || '(未填写)'}</span>
                            </div>
                            <div className="p-4 bg-white rounded-[18px]">
                              <span className="text-sm text-[#8A6F81]">正确答案：</span>
                              <span className="text-[#3A6960] ml-2 font-medium">{error.correctAnswer}</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-[18px] mb-4">
                            <p className="text-sm font-medium text-[#6B5063] mb-2">解析：</p>
                            <p className="text-[#8A6F81]">{error.explanation}</p>
                          </div>
                          <button className="btn-secondary text-sm btn-press">
                            重做此题
                          </button>
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
