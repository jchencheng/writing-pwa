import React from 'react';
import type { PracticeUnit } from '../types';

interface UnitStudyPageProps {
  unit: PracticeUnit;
  onStartPractice: () => void;
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const UnitStudyPage: React.FC<UnitStudyPageProps> = ({ unit, onStartPractice, onBack, darkMode, onToggleDarkMode }) => {
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
            {unit.title}
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
            <div className="w-12 h-12 rounded-[18px] bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#6B5063]">学习准备</h2>
          </div>
          
          <p className="text-[#8A6F81] mb-8 text-lg">
            在开始练习之前，请先学习以下词组和表达，它们将在本单元的练习中出现。
          </p>
          
          <div className="space-y-4 mb-8">
            {unit.phrases && unit.phrases.length > 0 ? (
              unit.phrases.map((phrase, index) => (
                <div 
                  key={index} 
                  className="phrase-card p-6 rounded-[24px] scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="text-xl font-semibold text-[#6B5063] mb-2">{phrase.english}</p>
                  <p className="text-[#8A6F81]">{phrase.chinese}</p>
                </div>
              ))
            ) : (
              <div className="p-6 bg-[#FFF5F8] rounded-[24px] border-2 border-[#F8A5D1]/20">
                <p className="text-[#8A6F81]">本单元暂无学习词组</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-gradient-to-br from-[#F8A5D1]/15 to-[#FF85A2]/15 rounded-[24px] border-2 border-[#F8A5D1]/30 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-[#6B5063]">单元说明</h3>
            </div>
            <p className="text-[#8A6F81]">{unit.description}</p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onStartPractice}
              className="btn-primary text-lg px-8 py-4 btn-press flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              开始练习
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitStudyPage;
