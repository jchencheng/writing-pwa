import React, { useState } from 'react';
import type { UserAnswer } from '../types';

interface SettingsPageProps {
  userAnswers: UserAnswer[];
  errorBook: UserAnswer[];
  practiceProgress: { [unitId: string]: number };
  onBack: () => void;
  onImportData: (data: any) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userAnswers,
  errorBook,
  practiceProgress,
  onBack,
  onImportData
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  // 导出数据
  const handleExport = () => {
    const data = {
      userAnswers,
      errorBook,
      practiceProgress,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `writing-practice-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 处理文件导入
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string;
        const data = JSON.parse(jsonString);

        // 验证数据格式
        if (!data.userAnswers || !data.errorBook || !data.practiceProgress) {
          throw new Error('数据格式不正确');
        }

        onImportData(data);
        setImportSuccess(true);
        setImportError(null);
        
        // 3秒后重置成功状态
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (error) {
        setImportError('导入失败：' + (error as Error).message);
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-title font-bold text-text">设置</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white border border-gray-200 text-text rounded-md font-medium hover:bg-gray-50 transition-all flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
      </div>

      {/* 设置卡片 */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-card mb-8">
        <h2 className="text-xl font-title font-semibold text-text mb-6">学习记录管理</h2>

        {/* 导出数据 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text mb-3">导出学习记录</h3>
          <p className="text-secondary mb-4">导出所有学习记录，包括答题历史、错题本和练习进度。</p>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            导出数据
          </button>
        </div>

        {/* 导入数据 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text mb-3">导入学习记录</h3>
          <p className="text-secondary mb-4">导入之前导出的学习记录文件，会覆盖当前的所有数据。</p>
          <div className="flex items-center">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="px-6 py-3 bg-white border border-gray-200 text-text rounded-md font-medium hover:bg-gray-50 transition-all cursor-pointer flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              选择文件
            </label>
          </div>
          
          {/* 导入反馈 */}
          {importError && (
            <div className="mt-4 p-4 bg-error/5 text-error border border-error/20 rounded-md">
              {importError}
            </div>
          )}
          
          {importSuccess && (
            <div className="mt-4 p-4 bg-success/5 text-success border border-success/20 rounded-md">
              数据导入成功！
            </div>
          )}
        </div>

        {/* 数据说明 */}
        <div className="mt-8 p-4 bg-neutral-light rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-text mb-2">数据说明</h3>
          <ul className="text-sm text-secondary space-y-1">
            <li>• 学习记录包括：答题历史、错题本和练习进度</li>
            <li>• 导出的文件为JSON格式，可以备份到其他设备</li>
            <li>• 导入数据会覆盖当前的所有学习记录</li>
            <li>• 建议定期导出数据，以防止数据丢失</li>
          </ul>
        </div>
      </div>

      {/* 关于 */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-card">
        <h2 className="text-xl font-title font-semibold text-text mb-4">关于</h2>
        <p className="text-secondary mb-4">英语写作练习是一个帮助用户通过填空练习强化英语短语与单词记忆的应用。</p>
        <p className="text-secondary">版本：1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsPage;
