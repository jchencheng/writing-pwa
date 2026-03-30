import React from 'react';
import type { PracticeUnit, PracticeReport } from '../types';

interface PracticeReportPageProps {
  report: PracticeReport;
  unit: PracticeUnit;
  onBack: () => void;
  onRetry: () => void;
  onRetryErrors: () => void;
}

const PracticeReportPage: React.FC<PracticeReportPageProps> = ({ report, unit, onBack, onRetry, onRetryErrors }) => {
  // 格式化用时
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

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
          <h1 className="text-xl font-bold text-primary">练习报告</h1>
          <div className="w-12"></div> {/* 占位，保持标题居中 */}
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 报告卡片 */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">{unit.title}</h2>
          
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">总题目数</p>
              <p className="text-2xl font-bold text-primary">{report.totalCount}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">正确数</p>
              <p className="text-2xl font-bold text-green-600">{report.correctCount}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">错误数</p>
              <p className="text-2xl font-bold text-red-600">{report.incorrectCount}</p>
            </div>
          </div>

          {/* 正确率 */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">正确率</span>
              <span className="text-sm font-bold text-primary">{report.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${report.accuracy}%` }}
              ></div>
            </div>
          </div>

          {/* 用时 */}
          <div className="mb-8">
            <p className="text-sm text-gray-600">用时：{formatTime(report.timeSpent)}</p>
          </div>

          {/* 错题汇总 */}
          {report.incorrectAnswers.length > 0 && (
            <div className="mb-8">
              <h3 className="font-medium mb-4">错题汇总</h3>
              <div className="space-y-4">
                {report.incorrectAnswers.map((error, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-md border border-red-200">
                    <p className="mb-2">{error.question}</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-600">你的答案：</span>
                        <span className="text-red-600 ml-2">{error.userAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">正确答案：</span>
                        <span className="text-green-600 ml-2">{error.correctAnswer}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{error.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={onBack}
              className="btn-secondary"
            >
              返回单元列表
            </button>
            <div className="flex gap-4">
              {report.incorrectAnswers.length > 0 && (
                <button
                  onClick={onRetryErrors}
                  className="btn-secondary"
                >
                  重做此单元错题
                </button>
              )}
              <button
                onClick={onRetry}
                className="btn-primary"
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