import React from 'react';
import type { PracticeUnit } from '../types';

interface UnitStudyPageProps {
  unit: PracticeUnit;
  onStartPractice: () => void;
  onBack: () => void;
}

const UnitStudyPage: React.FC<UnitStudyPageProps> = ({ unit, onStartPractice, onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* 导航栏 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="btn-secondary flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
          <h1 className="text-xl font-bold text-primary">{unit.title}</h1>
          <div className="w-12"></div> {/* 占位，保持标题居中 */}
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 学习卡片 */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">学习准备</h2>
          
          <p className="text-secondary mb-6">
            在开始练习之前，请先学习以下词组和表达，它们将在本单元的练习中出现。
          </p>
          
          {/* 词组列表 */}
          <div className="space-y-4 mb-8">
            {unit.phrases && unit.phrases.length > 0 ? (
              unit.phrases.map((phrase, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-primary">{phrase.english}</p>
                    <p className="text-gray-600 mt-1">{phrase.chinese}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">本单元暂无学习词组</p>
              </div>
            )}
          </div>
          
          {/* 单元描述 */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-8">
            <h3 className="font-medium mb-2">单元说明</h3>
            <p className="text-secondary">{unit.description}</p>
          </div>
          
          {/* 开始练习按钮 */}
          <div className="flex justify-center">
            <button
              onClick={onStartPractice}
              className="btn-primary"
            >
              开始练习
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitStudyPage;