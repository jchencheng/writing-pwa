import React from 'react';
import type { Statistics as StatisticsType } from '../types';

interface StatisticsProps {
  statistics: StatisticsType;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-card">
      <h2 className="text-2xl font-title font-semibold text-text mb-6">学习统计</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-primary/10 p-6 rounded-xl">
          <p className="text-sm text-secondary mb-2">总练习数</p>
          <p className="text-3xl font-bold text-primary">{statistics.totalPractices}</p>
        </div>
        <div className="bg-success/10 p-6 rounded-xl">
          <p className="text-sm text-secondary mb-2">已完成</p>
          <p className="text-3xl font-bold text-success">{statistics.completedPractices}</p>
        </div>
        <div className="bg-primary/10 p-6 rounded-xl">
          <p className="text-sm text-secondary mb-2">正确率</p>
          <p className="text-3xl font-bold text-primary">{statistics.totalAccuracy}%</p>
        </div>
        <div className="bg-primary/10 p-6 rounded-xl">
          <p className="text-sm text-secondary mb-2">完成率</p>
          <p className="text-3xl font-bold text-primary">
            {statistics.totalPractices > 0 ? Math.round((statistics.completedPractices / statistics.totalPractices) * 100) : 0}%
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-title font-medium text-text mb-4">难度分布</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">初级</span>
              <span className="text-text font-medium">{statistics.levelDistribution.beginner}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-success h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${(statistics.levelDistribution.beginner / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">中级</span>
              <span className="text-text font-medium">{statistics.levelDistribution.intermediate}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${(statistics.levelDistribution.intermediate / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">高级</span>
              <span className="text-text font-medium">{statistics.levelDistribution.advanced}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${(statistics.levelDistribution.advanced / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {statistics.errorPatterns.length > 0 && (
        <div>
          <h3 className="text-lg font-title font-medium text-text mb-4">常见错误</h3>
          <ul className="bg-gray-50 p-6 rounded-xl space-y-3">
            {statistics.errorPatterns.map((pattern, index) => (
              <li key={index} className="text-text flex items-start">
                <svg className="w-4 h-4 text-error mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 学习建议 */}
      <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
        <h3 className="text-lg font-title font-medium text-text mb-3">学习建议</h3>
        <p className="text-secondary">
          {statistics.totalAccuracy > 80 ? 
            '你在写作练习中表现出色！建议继续保持，尝试挑战更高难度的练习。' : 
            statistics.totalAccuracy > 60 ? 
            '你在写作练习中表现良好，建议重点关注常见错误，加强词汇和语法的学习。' : 
            '建议从基础练习开始，逐步提高难度，注重词汇积累和语法规则的掌握。'}
        </p>
      </div>
    </div>
  );
};

export default Statistics;
