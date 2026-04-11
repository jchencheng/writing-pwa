import React from 'react';
import type { Statistics as StatisticsType } from '../types';

interface StatisticsProps {
  statistics: StatisticsType;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className="card practice-card">
      <div className="flex items-center gap-5 mb-9">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>学习统计</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mb-12">
        <div className="p-7 rounded-2xl scale-in card" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(14, 165, 233, 0.28))', border: '1px solid rgba(14, 165, 233, 0.35)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>总练习数</p>
          <p className="text-4xl font-bold text-gradient">{statistics.totalPractices}</p>
        </div>
        <div className="p-7 rounded-2xl scale-in card" style={{ animationDelay: '0.12s', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(14, 165, 233, 0.35))', border: '1px solid rgba(14, 165, 233, 0.45)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>已完成</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>{statistics.completedPractices}</p>
        </div>
        <div className="p-7 rounded-2xl scale-in card" style={{ animationDelay: '0.24s', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.28))', border: '1px solid rgba(236, 72, 153, 0.35)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>正确率</p>
          <p className="text-4xl font-bold text-gradient">{statistics.totalAccuracy}%</p>
        </div>
        <div className="p-7 rounded-2xl scale-in card" style={{ animationDelay: '0.36s', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(14, 165, 233, 0.28))', border: '1px solid rgba(14, 165, 233, 0.35)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>完成率</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {statistics.totalPractices > 0 ? Math.round((statistics.completedPractices / statistics.totalPractices) * 100) : 0}%
          </p>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)' }}></div>
          <h3 className="text-xl font-semibold px-5 text-gradient">难度分布</h3>
          <div className="h-1 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)' }}></div>
        </div>
        <div className="space-y-7">
          <div>
            <div className="flex justify-between text-sm mb-4">
              <span style={{ color: 'var(--text-secondary)' }}>初级</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.beginner}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(statistics.levelDistribution.beginner / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-4">
              <span style={{ color: 'var(--text-secondary)' }}>中级</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.intermediate}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(statistics.levelDistribution.intermediate / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-4">
              <span style={{ color: 'var(--text-secondary)' }}>高级</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{statistics.levelDistribution.advanced}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(statistics.levelDistribution.advanced / statistics.totalPractices) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {statistics.errorPatterns.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), transparent)' }}></div>
            <h3 className="text-xl font-semibold px-5 text-gradient">常见错误</h3>
            <div className="h-1 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), transparent)' }}></div>
          </div>
          <ul className="p-7 rounded-2xl border-2 space-y-5" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border)' }}>
            {statistics.errorPatterns.map((pattern, index) => (
              <li key={index} style={{ color: 'var(--text-primary)' }} className="flex items-start gap-4">
                <svg className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: 'var(--error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-base">{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="p-7 rounded-2xl border-2" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(236, 72, 153, 0.12))', borderColor: 'rgba(14, 165, 233, 0.3)' }}>
        <div className="flex items-center gap-4 mb-5">
          <svg className="w-7 h-7 text-gradient" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-xl font-semibold text-gradient">学习建议</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)' }} className="text-base">
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
