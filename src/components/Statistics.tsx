import React from 'react';
import type { Statistics as StatisticsType } from '../types';

interface StatisticsProps {
  statistics: StatisticsType;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className="card practice-card">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-[18px] bg-gradient-to-r from-[#4A6FA5] to-[#6B8FC7] flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>学习统计</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#4A6FA5]/20 to-[#6B8FC7]/20 border-2 border-[#4A6FA5]/30 scale-in">
          <p className="text-sm text-[#64748B] mb-2">总练习数</p>
          <p className="text-3xl font-bold stat-number">{statistics.totalPractices}</p>
        </div>
        <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#6B8FC7]/30 to-[#4A6FA5]/30 border-2 border-[#6B8FC7]/50 scale-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-[#64748B] mb-2">已完成</p>
          <p className="text-3xl font-bold text-[#4A6FA5]">{statistics.completedPractices}</p>
        </div>
        <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#4A6FA5]/20 to-[#6B8FC7]/20 border-2 border-[#4A6FA5]/30 scale-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-[#64748B] mb-2">正确率</p>
          <p className="text-3xl font-bold stat-number">{statistics.totalAccuracy}%</p>
        </div>
        <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#4A6FA5]/20 to-[#6B8FC7]/20 border-2 border-[#4A6FA5]/30 scale-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-[#64748B] mb-2">完成率</p>
          <p className="text-3xl font-bold stat-number">
            {statistics.totalPractices > 0 ? Math.round((statistics.completedPractices / statistics.totalPractices) * 100) : 0}%
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="decorative-dot"></div>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>难度分布</h3>
          <div className="decorative-dot"></div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#64748B]">初级</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.beginner}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(statistics.levelDistribution.beginner / statistics.totalPractices) * 100 || 0}%`, background: 'linear-gradient(90deg, #6B8FC7 0%, #4A6FA5 100%)' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#64748B]">中级</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.intermediate}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(statistics.levelDistribution.intermediate / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#64748B]">高级</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.advanced}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-in-out" 
                style={{ 
                  width: `${(statistics.levelDistribution.advanced / statistics.totalPractices) * 100 || 0}%`, 
                  background: 'linear-gradient(90deg, #6B8FC7 0%, #4A6FA5 100%)' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {statistics.errorPatterns.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="decorative-dot"></div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>常见错误</h3>
            <div className="decorative-dot"></div>
          </div>
          <ul className="bg-[#E6F0FA] p-6 rounded-[24px] border-2 border-[#4A6FA5]/30 space-y-4">
            {statistics.errorPatterns.map((pattern, index) => (
              <li key={index} style={{ color: 'var(--text-primary)' }} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#4A6FA5] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="p-6 bg-gradient-to-br from-[#4A6FA5]/15 to-[#6B8FC7]/15 rounded-[24px] border-2 border-[#4A6FA5]/30">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#4A6FA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>学习建议</h3>
        </div>
        <p className="text-[#64748B]">
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
