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

  const isExcellent = report.accuracy >= 90;
  const isGood = report.accuracy >= 70 && report.accuracy < 90;
  const isPass = report.accuracy >= 60 && report.accuracy < 70;

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

            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>练习报告</h1>

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
        {/* Result Card */}
        <div className="card p-6 mb-6">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              isExcellent ? 'bg-gradient-primary' : isGood ? 'bg-gradient-accent' : 'bg-gradient-primary'
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{unit.title}</h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              {isExcellent ? '太棒了！' : isGood ? '做得不错！' : isPass ? '继续努力！' : '还有提升空间！'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>{report.totalCount}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>总题数</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--success)' }}>{report.correctCount}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>正确</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--error)' }}>{report.incorrectCount}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>错误</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{formatTime(report.timeSpent)}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>用时</p>
            </div>
          </div>

          {/* Accuracy */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>正确率</span>
              <span className="text-2xl font-bold" style={{ color: isExcellent ? 'var(--success)' : isGood ? 'var(--accent)' : 'var(--primary)' }}>
                {report.accuracy}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${isExcellent ? 'progress-fill-success' : isGood ? 'progress-fill-accent' : ''}`}
                style={{ width: `${report.accuracy}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              className="btn btn-secondary flex-1"
            >
              返回首页
            </button>
            {report.incorrectAnswers.length > 0 && (
              <button
                onClick={onRetryErrors}
                className="btn btn-accent flex-1"
              >
                重做错题
              </button>
            )}
            <button
              onClick={onRetry}
              className="btn btn-primary flex-1"
            >
              重新测试
            </button>
          </div>
        </div>

        {/* Errors Section */}
        {report.incorrectAnswers.length > 0 && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--error-soft)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>错题回顾</h3>
            </div>

            <div className="space-y-4">
              {report.incorrectAnswers.map((error, index) => (
                <div
                  key={index}
                  className="card p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="mb-3" style={{ color: 'var(--text-primary)' }}>{error.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--error-soft)' }}>
                      <p className="text-xs mb-1" style={{ color: 'var(--error-600)' }}>你的答案</p>
                      <p className="font-medium" style={{ color: 'var(--error)' }}>{error.userAnswer || '(未填写)'}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--success-soft)' }}>
                      <p className="text-xs mb-1" style={{ color: 'var(--success-600)' }}>正确答案</p>
                      <p className="font-medium" style={{ color: 'var(--success)' }}>{error.correctAnswer}</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{error.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticeReportPage;
