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

    const paddedUserAnswers = [...userAnswers];
    while (paddedUserAnswers.length < currentPractice.blanks.length) {
      paddedUserAnswers.push('');
    }

    const userAnswersLower = paddedUserAnswers.map(answer => (answer || '').toLowerCase().trim());

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
  const questionParts = currentPractice.question.split(/\[ \]|\(\)|_+/);
  const progress = ((currentPracticeIndex + 1) / filteredPractices.length) * 100;
  const allCorrect = isCorrect.every(c => c);

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

            <h1 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-xs" style={{ color: 'var(--text-primary)' }}>
              {unit.title}
            </h1>

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

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              题目 {currentPracticeIndex + 1} / {filteredPractices.length}
            </span>
            <span className="tag tag-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {filteredPractices.length - currentPracticeIndex - 1} 题剩余
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 page-transition">
        {/* Question Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>填空练习</h2>
          </div>

          {/* Question */}
          <div className="mb-6">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {questionParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span>{part}</span>
                  {index < questionParts.length - 1 && (
                    <span className="inline-flex items-center mx-1">
                      <input
                        type="text"
                        className={`input w-32 sm:w-40 text-center mx-1 ${
                          showFeedback
                            ? (isCorrect[index] ? 'input-success' : 'input-error')
                            : ''
                        }`}
                        value={userAnswers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        disabled={showFeedback}
                        placeholder="?"
                      />
                      {showFeedback && (
                        <span className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          isCorrect[index] ? 'bg-gradient-primary' : 'bg-gradient-accent'
                        }`}>
                          {isCorrect[index] ? '✓' : '✗'}
                        </span>
                      )}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Translation */}
          {currentPractice.translation && (
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'var(--info-soft)', border: '1px solid var(--info-200)' }}>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--info-700)' }}>中文翻译</p>
                  <p style={{ color: 'var(--text-secondary)' }}>{currentPractice.translation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-5 rounded-xl mb-6 animate-fade-in-up ${
              allCorrect
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
                : 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20'
            }`} style={{ border: `1px solid ${allCorrect ? 'var(--success-200)' : 'var(--error-200)'}` }}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  allCorrect ? 'bg-gradient-primary' : 'bg-gradient-accent'
                }`}>
                  {allCorrect ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {allCorrect ? '回答正确！' : '答案解析'}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{currentPractice.explanation}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>正确答案：</span>
                    {currentPractice.blanks.map((blank, idx) => (
                      <span
                        key={idx}
                        className="tag tag-primary"
                      >
                        {blank.correctAnswer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentPracticeIndex === 0}
              className="btn btn-secondary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              上一题
            </button>

            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                提交答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-primary"
              >
                {currentPracticeIndex === filteredPractices.length - 1 ? (
                  <>
                    完成练习
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </>
                ) : (
                  <>
                    下一题
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitDetailPage;
