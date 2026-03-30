import React, { useState } from 'react';
import type { PracticeUnit } from '../types';

interface HomePageProps {
  units: PracticeUnit[];
  progress: { [unitId: string]: number };
  onUnitSelect: (unit: PracticeUnit) => void;
  onViewErrorBook: () => void;
  onViewSettings: () => void;
  lastPracticedUnitId: string | null;
  onStudyUnit: (unit: PracticeUnit) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  units, 
  progress, 
  onUnitSelect, 
  onViewErrorBook, 
  onViewSettings, 
  lastPracticedUnitId,
  onStudyUnit 
}) => {
  // 状态管理
  const [showUnitOptions, setShowUnitOptions] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PracticeUnit | null>(null);
  
  // 获取最后练习的单元
  const lastPracticedUnit = lastPracticedUnitId ? units.find(unit => unit.id === lastPracticedUnitId) : null;
  
  // 计算总进度
  const calculateTotalProgress = (): number => {
    if (units.length === 0) return 0;
    const totalProgress = units.reduce((sum, unit) => sum + (progress[unit.id] || 0), 0);
    return Math.round((totalProgress / units.length) * 100);
  };
  
  // 处理单元点击
  const handleUnitClick = (unit: PracticeUnit) => {
    const unitProgress = progress[unit.id] || 0;
    // 如果单元已完成（进度为100%），显示选项对话框
    if (unitProgress >= 1) {
      setSelectedUnit(unit);
      setShowUnitOptions(true);
    } else {
      // 否则直接进入单元
      onUnitSelect(unit);
    }
  };
  
  // 处理重做错题
  const handleRetryErrors = () => {
    if (selectedUnit) {
      // 这里可以添加逻辑来标记用户想要重做错题
      onUnitSelect(selectedUnit);
      setShowUnitOptions(false);
      setSelectedUnit(null);
    }
  };
  
  // 处理重新测试
  const handleRetest = () => {
    if (selectedUnit) {
      // 这里可以添加逻辑来标记用户想要重新测试
      onUnitSelect(selectedUnit);
      setShowUnitOptions(false);
      setSelectedUnit(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* 导航栏 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">英语写作练习</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={onViewErrorBook}
              className="btn-secondary flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              错题本
            </button>
            <button
              onClick={onViewSettings}
              className="btn-secondary flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              设置
            </button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 进度总览和继续练习 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 进度总览 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">练习进度总览</h2>
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-600">总进度</span>
              <span className="text-sm font-medium">{calculateTotalProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateTotalProgress()}%` }}
              ></div>
            </div>
          </div>
          
          {/* 继续上次练习 */}
          {lastPracticedUnit && (
            <div className="card flex flex-col justify-center p-6">
              <h2 className="text-xl font-semibold mb-4">继续上次练习</h2>
              <p className="text-secondary mb-4">{lastPracticedUnit.title}</p>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">练习进度</span>
                <span className="text-sm font-medium">{Math.round((progress[lastPracticedUnit.id] || 0) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(progress[lastPracticedUnit.id] || 0) * 100}%` }}
                ></div>
              </div>
              <button 
                className="btn-primary w-full"
                onClick={() => onUnitSelect(lastPracticedUnit)}
              >
                继续练习
              </button>
            </div>
          )}
        </div>

        {/* 练习单元列表 */}
        <h2 className="text-xl font-semibold mb-4">练习单元</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => {
            const unitProgressValue = progress[unit.id] || 0;
            const unitProgress = Math.round(unitProgressValue * 100);
            console.log(`Unit ${unit.id} (${unit.title}): progress value = ${unitProgressValue}, display = ${unitProgress}%`);
            return (
              <div 
                key={unit.id} 
                className="card cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleUnitClick(unit)}
              >
                <h3 className="text-lg font-medium mb-2">{unit.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{unit.description}</p>
                <div className="mb-2 flex justify-between">
                  <span className="text-xs text-gray-600">完成进度</span>
                  <span className="text-xs font-medium">{unitProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${unitProgress}%` }}
                  ></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    className="btn-primary w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnitClick(unit);
                    }}
                  >
                    开始练习
                  </button>
                  <button 
                    className="btn-secondary w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStudyUnit(unit);
                    }}
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
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2026 英语写作练习 | 通过填空练习强化英语短语与单词记忆</p>
        </div>
      </footer>

      {/* 单元选项对话框 */}
      {showUnitOptions && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">{selectedUnit.title}</h3>
            <p className="text-gray-600 mb-6">此单元已完成，您想如何继续？</p>
            <div className="flex flex-col gap-3">
              <button
                className="btn-primary py-2 px-4 rounded-md"
                onClick={handleRetryErrors}
              >
                重做此单元错题
              </button>
              <button
                className="btn-secondary py-2 px-4 rounded-md"
                onClick={handleRetest}
              >
                重新测试
              </button>
              <button
                className="text-gray-500 py-2 px-4 rounded-md hover:bg-gray-100"
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