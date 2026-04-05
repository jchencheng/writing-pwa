import React, { useState, useEffect } from 'react';
import type { PracticeUnit, UserAnswer, PracticeReport } from '../types';

interface UnitDetailPageProps {
  unit: PracticeUnit;
  onPracticeComplete: (report: PracticeReport) => void;
  onBack: () => void;
  onProgressUpdate: (unitId: string, progress: number) => void;
  onPositionUpdate: (unitId: string, position: number) => void;
  onAddError: (error: UserAnswer) => void;
  onRemoveError: (errorId: string) => void;
  practiceMode?: 'retest' | 'retryErrors';
  errorBook?: UserAnswer[];
  initialPosition?: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const UnitDetailPage: React.FC<UnitDetailPageProps> = ({ 
  unit, 
  onPracticeComplete, 
  onBack, 
  onProgressUpdate, 
  onPositionUpdate, 
  onAddError, 
  onRemoveError, 
  practiceMode = 'retest',
  errorBook = [],
  initialPosition = 0,
  darkMode,
  onToggleDarkMode
}) => {
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(initialPosition);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [allUserAnswers, setAllUserAnswers] = useState<{[practiceId: string]: {userAnswers: string[], isCorrect: boolean[]}}>({});
  const [filteredPractices, setFilteredPractices] = useState(unit.practices);
  
  useEffect(() => {
    if (practiceMode === 'retryErrors') {
      const errorPracticeIds = new Set<string>();
      
      errorBook.forEach(error => {
        if (error.unitId === unit.id) {
          errorPracticeIds.add(error.practiceId);
        }
      });
      
      const errorPractices = unit.practices.filter(practice => {
        return errorPracticeIds.has(practice.id);
      });
      
      setFilteredPractices(errorPractices.length > 0 ? errorPractices : unit.practices);
    } else {
      setFilteredPractices(unit.practices);
    }
  }, [practiceMode, unit.practices, errorBook, unit.id]);

  useEffect(() => {
    const initialAnswers = filteredPractices[currentPracticeIndex].blanks.map(() => '');
    setUserAnswers(initialAnswers);
    setShowFeedback(false);
    setIsCorrect([]);
  }, [currentPracticeIndex, filteredPractices]);

  useEffect(() => {
    if (onPositionUpdate) {
      onPositionUpdate(unit.id, currentPracticeIndex);
    }
  }, [currentPracticeIndex, unit.id, onPositionUpdate]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const currentPractice = filteredPractices[currentPracticeIndex];
    const correctAnswers = currentPractice.blanks.map(blank => (blank.correctAnswer || '').toLowerCase().trim());
    
    // 确保 userAnswers 长度与 blanks 长度一致
    const paddedUserAnswers = [...userAnswers];
    while (paddedUserAnswers.length < currentPractice.blanks.length) {
      paddedUserAnswers.push('');
    }
    
    const userAnswersLower = paddedUserAnswers.map(answer => (answer || '').toLowerCase().trim());
    
    // 使用 correctAnswers 的长度来遍历，确保所有填空都被判定
    const correctness = correctAnswers.map((correctAnswer, index) => {
      const userAnswer = userAnswersLower[index] || '';
      return userAnswer === correctAnswer;
    });
    setIsCorrect(correctness);
    setShowFeedback(true);
    
    correctness.forEach((isCorrect, blankIndex) => {
      if (!isCorrect && onAddError) {
        const error: UserAnswer = {
          unitId: unit.id,
          practiceId: currentPractice.id,
          blankIndex,
          userAnswer: userAnswers[blankIndex],
          correctAnswer: currentPractice.blanks[blankIndex].correctAnswer,
          isCorrect: false,
          question: currentPractice.question,
          explanation: currentPractice.explanation
        };
        onAddError(error);
      } else if (isCorrect && onRemoveError) {
        const errorId = `${unit.id}-${currentPractice.id}-${blankIndex}`;
        onRemoveError(errorId);
      }
    });
    
    const updatedAnswers = {
      ...allUserAnswers,
      [currentPractice.id]: {
        userAnswers: [...userAnswers],
        isCorrect: [...correctness]
      }
    };
    
    const completedCount = currentPracticeIndex + 1;
    const totalCount = unit.practices.length;
    const progress = completedCount / totalCount;
    
    setAllUserAnswers(updatedAnswers);
    
    if (onProgressUpdate) {
      onProgressUpdate(unit.id, progress);
    }
  };

  const handleNext = () => {
    if (currentPracticeIndex < filteredPractices.length - 1) {
      const nextPosition = currentPracticeIndex + 1;
      setCurrentPracticeIndex(nextPosition);
    } else {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000);
      
      const totalQuestions = filteredPractices.length;
      
      let correctCount = 0;
      const incorrectAnswers: UserAnswer[] = [];
      
      filteredPractices.forEach((practice) => {
        const practiceResult = allUserAnswers[practice.id];
        if (practiceResult) {
          const isPracticeCorrect = practiceResult.isCorrect.every(correct => correct);
          if (isPracticeCorrect) {
            correctCount++;
          } else {
            practiceResult.isCorrect.forEach((isCorrect: boolean, blankIndex: number) => {
              if (!isCorrect) {
                incorrectAnswers.push({
                  unitId: unit.id,
                  practiceId: practice.id,
                  blankIndex,
                  userAnswer: practiceResult.userAnswers[blankIndex],
                  correctAnswer: practice.blanks[blankIndex].correctAnswer,
                  isCorrect: false,
                  question: practice.question,
                  explanation: practice.explanation
                });
              }
            });
          }
        } else {
          practice.blanks.forEach((blank, blankIndex) => {
            incorrectAnswers.push({
              unitId: unit.id,
              practiceId: practice.id,
              blankIndex,
              userAnswer: '',
              correctAnswer: blank.correctAnswer,
              isCorrect: false,
              question: practice.question,
              explanation: practice.explanation
            });
          });
        }
      });

      const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

      const report: PracticeReport = {
        unitId: unit.id,
        unitTitle: unit.title,
        totalCount: totalQuestions,
        correctCount,
        incorrectCount: totalQuestions - correctCount,
        accuracy,
        timeSpent,
        incorrectAnswers
      };
      
      onPracticeComplete(report);
    }
  };

  const handlePrevious = () => {
    if (currentPracticeIndex > 0) {
      const prevPosition = currentPracticeIndex - 1;
      setCurrentPracticeIndex(prevPosition);
    }
  };

  const currentPractice = filteredPractices[currentPracticeIndex];
  // 支持多种挖空格式：[ ], (), _, __, ___ 等
  const questionParts = currentPractice.question.split(/\[ \]|\(\)|_+/);

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
        <div className="mb-8">
          <div className="flex justify-between mb-3 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A6FA5] to-[#6B8FC7] flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentPracticeIndex + 1}</span>
              </div>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>/ {filteredPractices.length}</span>
            </div>
            <span className="tag-primary">{Math.round(((currentPracticeIndex + 1) / filteredPractices.length) * 100)}% 完成</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentPracticeIndex + 1) / filteredPractices.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card practice-card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[18px] bg-gradient-to-r from-[#4A6FA5] to-[#6B8FC7] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>题目 {currentPracticeIndex + 1}</h2>
          </div>
          
          <div className="mb-8">
            <div className="sentence-blank mb-8">
              {questionParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span style={{ color: 'var(--text-primary)' }}>{part}</span>
                  {index < questionParts.length - 1 && (
                    <div className="inline-block mx-1">
                      <input
                        type="text"
                        className={`text-lg px-4 py-2 rounded-[18px] transition-all duration-300 ${
                          showFeedback 
                            ? (isCorrect[index] 
                                ? 'input-correct pulse-success' 
                                : 'input-error')
                            : 'input-field'
                        }`}
                        value={userAnswers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        disabled={showFeedback}
                        placeholder="______"
                        style={{ minWidth: '120px' }}
                      />
                      {showFeedback && (
                        <span className={`ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          isCorrect[index] 
                            ? 'bg-[#6B8FC7] text-white' 
                            : 'bg-[#FFA8A8] text-white'
                        }`}>
                          {isCorrect[index] ? '✓' : '✗'}
                        </span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

          {currentPractice.translation && (
            <div className={`mt-6 p-6 rounded-[24px] border-2 mb-8 ${
              darkMode 
                ? 'bg-blue-900/20 border-[#6B8FC7]/30' 
                : 'bg-[#E6F0FA] border-[#6B8FC7]/20'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <svg className={`w-5 h-5 ${darkMode ? 'text-[#6B8FC7]' : 'text-[#4A6FA5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#334155]'}`}>中文翻译：</p>
              </div>
              <p className={`${darkMode ? 'text-white' : 'text-[#64748B]'}`}>{currentPractice.translation}</p>
            </div>
          )}

          {showFeedback && (
            <div className={`mt-8 p-6 rounded-[24px] border-2 scale-in ${
              isCorrect.every(c => c) 
                ? (darkMode 
                    ? 'bg-blue-900/20 border-[#6B8FC7]/50' 
                    : 'bg-[#E6F0FA] border-[#6B8FC7]')
                : (darkMode 
                    ? 'bg-red-900/20 border-[#FFA8A8]/50' 
                    : 'bg-[#FFD6D6]/50 border-[#FFA8A8]/50')
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {isCorrect.every(c => c) ? (
                  <svg className={`w-6 h-6 ${darkMode ? 'text-[#6B8FC7]' : 'text-[#4A6FA5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className={`w-6 h-6 ${darkMode ? 'text-[#FFA8A8]' : 'text-[#8A4A4A]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>答案解析</h3>
                  <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{currentPractice.explanation}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>正确答案：</span>
                    <span className={`px-4 py-2 rounded-[18px] font-medium ${
                      darkMode 
                        ? 'bg-blue-900/30 text-white' 
                        : 'bg-[#E6F0FA] text-[#334155]'
                    }`}>
                      {currentPractice.blanks.map(blank => blank.correctAnswer).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentPracticeIndex === 0}
              className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 btn-press"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              上一题
            </button>
            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2 btn-press"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                提交答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 btn-press"
              >
                {currentPracticeIndex === filteredPractices.length - 1 ? '完成练习' : '下一题'}
                {currentPracticeIndex !== filteredPractices.length - 1 && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            )}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitDetailPage;
