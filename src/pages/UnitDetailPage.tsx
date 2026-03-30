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
  initialPosition = 0 
}) => {
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(initialPosition);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [allUserAnswers, setAllUserAnswers] = useState<{[practiceId: string]: {userAnswers: string[], isCorrect: boolean[]}}>({});
  const [filteredPractices, setFilteredPractices] = useState(unit.practices);
  
  // 根据练习模式过滤题目
  useEffect(() => {
    if (practiceMode === 'retryErrors') {
      // 从错题本中获取当前单元的错题
      const errorPracticeIds = new Set<string>();
      
      // 收集当前单元的所有错题对应的练习ID
      errorBook.forEach(error => {
        if (error.unitId === unit.id) {
          errorPracticeIds.add(error.practiceId);
        }
      });
      
      // 过滤出有错误记录的题目
      const errorPractices = unit.practices.filter(practice => {
        return errorPracticeIds.has(practice.id);
      });
      
      setFilteredPractices(errorPractices.length > 0 ? errorPractices : unit.practices);
    } else {
      // 重新测试模式，显示所有题目
      setFilteredPractices(unit.practices);
    }
    // 不要强制重置为0，保持使用initialPosition或当前位置
  }, [practiceMode, unit.practices, errorBook, unit.id]);

  // 初始化用户答案数组
  useEffect(() => {
    const initialAnswers = filteredPractices[currentPracticeIndex].blanks.map(() => '');
    setUserAnswers(initialAnswers);
    setShowFeedback(false);
    setIsCorrect([]);
  }, [currentPracticeIndex, filteredPractices]);

  // 监听位置变化并更新
  useEffect(() => {
    if (onPositionUpdate) {
      onPositionUpdate(unit.id, currentPracticeIndex);
    }
  }, [currentPracticeIndex, unit.id, onPositionUpdate]);

  // 处理答案输入
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  // 提交答案
  const handleSubmit = () => {
    const currentPractice = filteredPractices[currentPracticeIndex];
    const correctAnswers = currentPractice.blanks.map(blank => blank.correctAnswer.toLowerCase().trim());
    const userAnswersLower = userAnswers.map(answer => answer.toLowerCase().trim());
    
    const correctness = userAnswersLower.map((answer, index) => answer === correctAnswers[index]);
    setIsCorrect(correctness);
    setShowFeedback(true);
    
    // 检查是否有错题，如果有就添加到错题本；如果答对了，就从错题本中移除
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
        // 如果用户答对了，从错题本中移除该题目
        const errorId = `${unit.id}-${currentPractice.id}-${blankIndex}`;
        onRemoveError(errorId);
      }
    });
    
    // 保存当前练习的答案和正确性
    const updatedAnswers = {
      ...allUserAnswers,
      [currentPractice.id]: {
        userAnswers: [...userAnswers],
        isCorrect: [...correctness]
      }
    };
    
    // 计算当前进度：已完成的题目数 / 总题目数
    const completedCount = currentPracticeIndex + 1;
    const totalCount = unit.practices.length;
    const progress = completedCount / totalCount;
    
    // 保存答案
    setAllUserAnswers(updatedAnswers);
    
    // 每做一道题就更新进度
    if (onProgressUpdate) {
      onProgressUpdate(unit.id, progress);
    }
  };

  // 下一题
  const handleNext = () => {
    if (currentPracticeIndex < filteredPractices.length - 1) {
      const nextPosition = currentPracticeIndex + 1;
      setCurrentPracticeIndex(nextPosition);
    } else {
      // 练习完成，生成报告
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000);
      
      // 计算正确率
      const totalQuestions = filteredPractices.length;
      
      // 计算实际正确的题目数量
      let correctCount = 0;
      const incorrectAnswers: UserAnswer[] = [];
      
      filteredPractices.forEach((practice) => {
        const practiceResult = allUserAnswers[practice.id];
        if (practiceResult) {
          const isPracticeCorrect = practiceResult.isCorrect.every(correct => correct);
          if (isPracticeCorrect) {
            correctCount++;
          } else {
            // 记录错题
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
          // 如果用户没有提交答案，将所有空视为错误
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

      console.log('=== Generating practice report ===');
      console.log('Unit ID:', unit.id);
      console.log('Total questions:', totalQuestions);
      console.log('Correct answers:', correctCount);
      console.log('Accuracy:', accuracy);
      console.log('Report to send:', report);
      
      onPracticeComplete(report);
      console.log('=== onPracticeComplete called ===');
    }
  };

  // 上一题
  const handlePrevious = () => {
    if (currentPracticeIndex > 0) {
      const prevPosition = currentPracticeIndex - 1;
      setCurrentPracticeIndex(prevPosition);
    }
  };

  const currentPractice = filteredPractices[currentPracticeIndex];
  const questionParts = currentPractice.question.split('[ ]');

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
        {/* 题目进度 */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">题目 {currentPracticeIndex + 1} / {filteredPractices.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((currentPracticeIndex + 1) / filteredPractices.length) * 100)}% 完成</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentPracticeIndex + 1) / filteredPractices.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="card mb-6">
          <h2 className="text-lg font-medium mb-4">题目 {currentPracticeIndex + 1}</h2>
          <div className="mb-6">
            {/* 题目内容 */}
            <div className="text-lg mb-6">
              {questionParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span>{part}</span>
                  {index < questionParts.length - 1 && (
                    <div className="inline-block mx-1">
                      <input
                        type="text"
                        className={`input-field mx-1 ${showFeedback ? (isCorrect[index] ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}`}
                        value={userAnswers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        disabled={showFeedback}
                        placeholder="请输入答案"
                        style={{ minWidth: '120px' }}
                      />
                      {showFeedback && (
                        <span className={`ml-2 ${isCorrect[index] ? 'text-green-500' : 'text-red-500'}`}>
                          {isCorrect[index] ? '✓' : '✗'}
                        </span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 中文翻译 */}
            {currentPractice.translation && (
              <div className="mt-4 p-4 bg-neutral-light rounded-md border border-gray-200 mb-6">
                <p className="text-sm font-medium mb-2">中文翻译：</p>
                <p>{currentPractice.translation}</p>
              </div>
            )}

            {/* 答案解析 */}
            {showFeedback && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-medium mb-2">答案解析</h3>
                <p className="text-sm text-gray-700">{currentPractice.explanation}</p>
                <div className="mt-3">
                  <span className="text-sm font-medium">正确答案：</span>
                  <span className="text-sm ml-2">{currentPractice.blanks.map(blank => blank.correctAnswer).join(', ')}</span>
                </div>
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentPracticeIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一题
            </button>
            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                提交答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                {currentPracticeIndex === unit.practices.length - 1 ? '完成练习' : '下一题'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitDetailPage;