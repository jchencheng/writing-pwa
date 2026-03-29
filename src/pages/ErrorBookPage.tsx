import React, { useState } from 'react';
import type { UserAnswer, PracticeUnit } from '../types';

interface ErrorBookPageProps {
  errorBook: UserAnswer[];
  units: PracticeUnit[];
  onBack: () => void;
  onDeleteError: (errorId: string) => void;
}

const ErrorBookPage: React.FC<ErrorBookPageProps> = ({ errorBook, units, onBack, onDeleteError }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  // 按单元分组错题
  const groupErrorsByUnit = () => {
    const grouped: { [unitId: string]: UserAnswer[] } = {};
    
    errorBook.forEach(error => {
      if (!grouped[error.unitId]) {
        grouped[error.unitId] = [];
      }
      grouped[error.unitId].push(error);
    });
    
    return grouped;
  };

  const groupedErrors = groupErrorsByUnit();
  const filteredUnits = selectedUnit === 'all' ? Object.keys(groupedErrors) : [selectedUnit];

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
          <h1 className="text-xl font-bold text-primary">错题本</h1>
          <div className="w-12"></div> {/* 占位，保持标题居中 */}
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 筛选器 */}
        <div className="card mb-6">
          <h2 className="text-lg font-medium mb-4">筛选错题</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedUnit('all')}
              className={`px-4 py-2 rounded-md ${selectedUnit === 'all' ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              全部
            </button>
            {units.map(unit => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`px-4 py-2 rounded-md ${selectedUnit === unit.id ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
              >
                {unit.title}
              </button>
            ))}
          </div>
        </div>

        {/* 错题列表 */}
        {errorBook.length === 0 ? (
          <div className="card text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">暂无错题</h3>
            <p className="text-gray-600">继续练习，错题会自动添加到这里</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUnits.map(unitId => {
              const unit = units.find(u => u.id === unitId);
              const errors = groupedErrors[unitId];
              return (
                <div key={unitId} className="card">
                  <h3 className="text-lg font-medium mb-4">{unit?.title}</h3>
                  <div className="space-y-4">
                    {errors && errors.map((error) => {
                      const errorId = `${error.unitId}-${error.practiceId}-${error.blankIndex}`;
                      return (
                        <div key={errorId} className="p-4 bg-red-50 rounded-md border border-red-200">
                          <div className="flex justify-between items-start mb-2">
                            <p className="flex-1">{error.question}</p>
                            <button
                              onClick={() => onDeleteError(errorId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between text-sm mb-2">
                            <div className="mb-2 md:mb-0">
                              <span className="text-gray-600">你的答案：</span>
                              <span className="text-red-600 ml-2">{error.userAnswer}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">正确答案：</span>
                              <span className="text-green-600 ml-2">{error.correctAnswer}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{error.explanation}</p>
                          <button className="mt-3 btn-secondary text-sm">
                            重做此题
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ErrorBookPage;