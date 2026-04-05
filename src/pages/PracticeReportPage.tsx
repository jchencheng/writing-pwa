import React from 'react';
import type { PracticeUnit, PracticeReport } from '../types';

interface PracticeReportPageProps {
  report: PracticeReport;
  unit: PracticeUnit;
  onBack: () => void;
  onRetry: () => void;
  onRetryErrors: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const PracticeReportPage: React.FC<PracticeReportPageProps> = ({ report, unit, onBack, onRetry, onRetryErrors, darkMode, onToggleDarkMode }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

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
          <h1 className="text-lg font-bold text-primary-gradient">
            练习报告
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#4A6FA5] to-[#6B8FC7] flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{unit.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#4A6FA5]/20 to-[#6B8FC7]/20 border-2 border-[#4A6FA5]/30 scale-in">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#4A6FA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-[#64748B]">总题目数</p>
              </div>
              <p className="text-3xl font-bold stat-number">{report.totalCount}</p>
            </div>
            <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#6B8FC7]/30 to-[#4A6FA5]/30 border-2 border-[#6B8FC7]/50 scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#4A6FA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-[#64748B]">正确数</p>
              </div>
              <p className="text-3xl font-bold text-[#4A6FA5]">{report.correctCount}</p>
            </div>
            <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#FFA8A8]/30 to-[#FF8C8C]/30 border-2 border-[#FFA8A8]/50 scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#8A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-[#64748B]">错误数</p>
              </div>
              <p className="text-3xl font-bold text-[#8A4A4A]">{report.incorrectCount}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-3 items-center">
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>正确率</span>
              <span className="text-xl font-bold stat-number">{report.accuracy}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill progress-glow"
                style={{ width: `${report.accuracy}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8 flex items-center gap-3 p-4 bg-[#E6F0FA] rounded-[24px]">
            <svg className="w-6 h-6 text-[#4A6FA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p style={{ color: 'var(--text-primary)' }}>用时：<span className="font-semibold">{formatTime(report.timeSpent)}</span></p>
          </div>

          {report.incorrectAnswers.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="decorative-dot"></div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>错题汇总</h3>
                <div className="decorative-dot"></div>
              </div>
              <div className="space-y-4">
                {report.incorrectAnswers.map((error, index) => (
                  <div key={index} className="p-6 bg-[#E2E8F0]/40 rounded-[24px] border-2 border-[#94A3B8]/40 scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <p style={{ color: 'var(--text-primary)' }} className="mb-4">{error.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-white rounded-[18px]">
                        <span className="text-sm text-[#64748B]">你的答案：</span>
                        <span className="text-[#64748B] ml-2 font-medium">{error.userAnswer || '(未填写)'}</span>
                      </div>
                      <div className="p-4 bg-white rounded-[18px]">
                        <span className="text-sm text-[#64748B]">正确答案：</span>
                        <span className="text-[#4A6FA5] ml-2 font-medium">{error.correctAnswer}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-[18px]">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }} className="mb-2">解析：</p>
                      <p className="text-[#64748B]">{error.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={onBack}
              className="btn-secondary btn-press"
            >
              返回单元列表
            </button>
            <div className="flex flex-col sm:flex-row gap-4">
              {report.incorrectAnswers.length > 0 && (
                <button
                  onClick={onRetryErrors}
                  className="btn-secondary btn-press"
                >
                  重做此单元错题
                </button>
              )}
              <button
                onClick={onRetry}
                className="btn-primary btn-press"
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeReportPage;
