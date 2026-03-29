import React, { useState } from 'react';
import type { Practice as PracticeType, Blank } from '../types';

interface PracticeProps {
  practice: PracticeType;
  onSubmit: (practiceId: string, blanks: Blank[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCount: number;
}

const Practice: React.FC<PracticeProps> = ({
  practice,
  onSubmit,
  onNext,
  onPrevious,
  currentIndex,
  totalCount
}) => {
  const [blanks, setBlanks] = useState<Blank[]>(practice.blanks.map(blank => ({ ...blank })));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (blankId: string, value: string) => {
    setBlanks(blanks.map(blank => 
      blank.id === blankId ? { ...blank, userAnswer: value } : blank
    ));
  };

  const handleSubmit = () => {
    const updatedBlanks = blanks.map(blank => ({
      ...blank,
      isCorrect: blank.userAnswer?.toLowerCase() === blank.correctAnswer.toLowerCase()
    }));
    setBlanks(updatedBlanks);
    setIsSubmitted(true);
    onSubmit(practice.id, updatedBlanks);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsSubmitted(false);
    onPrevious();
  };

  const renderQuestion = () => {
    // 分割问题，处理 [ ] 标记的填空
    const parts = practice.question.split(/\[\s*\]/);
    return (
      <div className="text-lg mb-8 leading-relaxed">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span className="text-text">{part}</span>
            {index < parts.length - 1 && (
              <div className="inline-flex items-center mx-2">
                <span className="text-primary font-medium mr-1">[{index + 1}]</span>
                <input
                  type="text"
                  className={`px-5 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${isSubmitted ? (blanks[index].isCorrect ? 'border-success focus:ring-success bg-success/5' : 'border-error focus:ring-error bg-error/5') : 'border-gray-300 focus:ring-primary'}`}
                  value={blanks[index].userAnswer || ''}
                  onChange={(e) => handleInputChange(blanks[index].id, e.target.value)}
                  disabled={isSubmitted}
                  placeholder="请输入答案"
                  style={{ minWidth: '140px' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-card">
      {/* 进度指示器 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary">练习 {currentIndex + 1} / {totalCount}</span>
          <span className="text-sm text-secondary">{Math.round(((currentIndex + 1) / totalCount) * 100)}% 完成</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* 问题 */}
      <div className="mb-8">
        <h3 className="text-2xl font-title font-semibold text-text mb-4">填空练习</h3>
        {renderQuestion()}
        {/* 中文翻译 */}
        {practice.translation && (
          <div className="mt-4 p-4 bg-neutral-light rounded-md border border-gray-200">
            <p className="text-sm font-medium text-text mb-2">中文翻译：</p>
            <p className="text-text">{practice.translation}</p>
          </div>
        )}
      </div>
      
      {/* 反馈 */}
      {isSubmitted && (
        <div className={`p-6 rounded-xl mb-8 ${blanks.every(b => b.isCorrect) ? 'bg-success/5 text-success border border-success/20' : 'bg-error/5 text-error border border-error/20'}`}>
          <div className="flex items-start">
            <svg className={`w-6 h-6 mr-4 flex-shrink-0 ${blanks.every(b => b.isCorrect) ? 'text-success' : 'text-error'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {blanks.every(b => b.isCorrect) ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <div>
              <h4 className={`text-lg font-medium mb-3 ${blanks.every(b => b.isCorrect) ? 'text-success' : 'text-error'}`}>
                {blanks.every(b => b.isCorrect) ? '回答正确！' : '回答错误'}
              </h4>
              <p className="mb-4 text-text">{practice.feedback}</p>
              {blanks.some(b => !b.isCorrect) && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-text mb-3">正确答案：</p>
                  <ul className="space-y-2">
                    {blanks.map((blank, index) => (
                      <li key={blank.id} className="flex items-center">
                        <span className="w-16 text-sm text-secondary">第 {index + 1} 空:</span>
                        <span className="text-sm font-medium text-text">{blank.correctAnswer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto px-5 py-3 bg-white border border-gray-200 text-text rounded-md font-medium hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center sm:justify-start"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          上一题
        </button>
        
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center sm:justify-end"
          >
            提交答案
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center sm:justify-end"
          >
            {currentIndex === totalCount - 1 ? '完成练习' : '下一题'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Practice;
