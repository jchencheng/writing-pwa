import React from 'react';
import type { PracticeUnit } from '../types';

interface PracticeUnitListProps {
  units: PracticeUnit[];
  onSelectUnit: (unitId: string) => void;
}

const PracticeUnitList: React.FC<PracticeUnitListProps> = ({ units, onSelectUnit }) => {
  const getLevelClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/10 text-success';
      case 'intermediate':
        return 'bg-primary/10 text-primary';
      case 'advanced':
        return 'bg-purple/10 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '未知';
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {units.map((unit) => (
        <div
          key={unit.id}
          className="bg-white rounded-xl p-8 border border-gray-200 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          onClick={() => onSelectUnit(unit.id)}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-title font-medium text-text">{unit.title}</h3>
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getLevelClass(unit.level)}`}>
              {getLevelText(unit.level)}
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">完成进度</span>
              <span className="text-text font-medium">{unit.completedCount}/{unit.practiceCount}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${getProgressPercentage(unit.completedCount, unit.practiceCount)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                onSelectUnit(unit.id);
              }}
            >
              开始练习
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PracticeUnitList;
