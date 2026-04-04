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

  return (
    <div className="min-h-screen app-container">
      {/* 导航栏 */}
      <header className="glass-nav sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] bg-clip-text text-transparent">
              英语写作练习
            </h1>
          </div>
          <div className="flex items-center gap-3">
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
            <button
              onClick={onViewErrorBook}
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              错题本
            </button>
            <button
              onClick={onViewSettings}
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              设置
            </button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8 page-transition">
        {/* 进度总览和继续练习 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* 进度总览 */}
          <div className="card practice-card float-animation">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[18px] bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#6B5063]">练习进度总览</h2>
            </div>
            <div className="mb-3 flex justify-between items-center">
              <span className="text-sm text-[#8A6F81]">总进度</span>
              <span className="text-lg font-bold stat-number">{calculateTotalProgress()}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill progress-glow"
                style={{ width: `${calculateTotalProgress()}%` }}
              ></div>
            </div>
          </div>
          
          {/* 继续上次练习 */}
          {lastPracticedUnit && (
            <div className="card practice-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-[18px] bg-gradient-to-r from-[#B4E4D8] to-[#9DDACD] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#3A6960]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#6B5063]">继续上次练习</h2>
              </div>
              <p className="text-[#8A6F81] mb-4">{lastPracticedUnit.title}</p>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-[#8A6F81]">练习进度</span>
                <span className="text-sm font-medium text-[#6B5063]">{Math.round((progress[lastPracticedUnit.id] || 0) * 100)}%</span>
              </div>
              <div className="progress-bar mb-4">
                <div 
                  className="progress-fill"
                  style={{ width: `${(progress[lastPracticedUnit.id] || 0) * 100}%` }}
                ></div>
              </div>
              <button 
                className="btn-primary w-full btn-press"
                onClick={() => onUnitSelect(lastPracticedUnit)}
              >
                继续练习
              </button>
            </div>
          )}
        </div>

        {/* 添加自定义单元 */}
        <div className="mb-8">
          <button
            onClick={onAddCustomUnit}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 rounded-[24px] btn-press"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-lg font-medium">添加自定义练习单元</span>
          </button>
        </div>

        {/* 练习单元列表 */}
        <div className="flex items-center gap-2 mb-6">
          <div className="decorative-dot"></div>
          <h2 className="text-xl font-semibold text-[#6B5063]">练习单元</h2>
          <div className="decorative-dot"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => {
            const unitProgressValue = progress[unit.id] || 0;
            const unitProgress = Math.round(unitProgressValue * 100);
            return (
              <div 
                key={unit.id} 
                className="card practice-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-[#6B5063]">{unit.title}</h3>
                  <span className="tag-primary text-xs">{unit.level}</span>
                </div>
                <p className="text-sm text-[#8A6F81] mb-4">{unit.description}</p>
                <div className="mb-3 flex justify-between items-center">
                  <span className="text-xs text-[#8A6F81]">完成进度</span>
                  <span className="text-xs font-medium text-[#6B5063]">{unitProgress}%</span>
                </div>
                <div className="progress-bar mb-4">
                  <div 
                    className="progress-fill"
                    style={{ width: `${unitProgress}%` }}
                  ></div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="btn-primary flex-1 text-sm py-2 btn-press"
                    onClick={() => handleUnitClick(unit)}
                  >
                    开始练习
                  </button>
                  <button 
                    className="btn-secondary flex-1 text-sm py-2 btn-press"
                    onClick={() => onStudyUnit(unit)}
                  >
                    学习词组
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 底部 */}
      <footer className="mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#8A6F81] text-sm">
            © 2026 英语写作练习 | 通过填空练习强化英语短语与单词记忆
          </p>
        </div>
      </footer>

      {/* 单元选项对话框 */}
      {showUnitOptions && selectedUnit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full scale-in shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#6B5063] mb-2">{selectedUnit.title}</h3>
              <p className="text-[#8A6F81]">此单元已完成，您想如何继续？</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="btn-primary w-full btn-press"
                onClick={handleRetryErrors}
              >
                重做此单元错题
              </button>
              <button
                className="btn-secondary w-full btn-press"
                onClick={handleRetest}
              >
                重新测试
              </button>
              <button
                className="text-[#8A6F81] py-3 px-4 rounded-[18px] hover:bg-[#FFF5F8] transition-colors btn-press"
                onClick={() => {
                  setShowUnitOptions(false);
                  setSelectedUnit(null);
                }}
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