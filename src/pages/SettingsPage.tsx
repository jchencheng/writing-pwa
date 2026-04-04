import React, { useState } from 'react';
import type { UserAnswer } from '../types';

interface SettingsPageProps {
  userAnswers: UserAnswer[];
  errorBook: UserAnswer[];
  practiceProgress: { [unitId: string]: number };
  onBack: () => void;
  onImportData: (data: any) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userAnswers,
  errorBook,
  practiceProgress,
  onBack,
  onImportData,
  darkMode,
  onToggleDarkMode
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string;
        const data = JSON.parse(jsonString);

        if (!data.userAnswers || !data.errorBook || !data.practiceProgress) {
          throw new Error('数据格式不正确');
        }

        onImportData(data);
        setImportSuccess(true);
        setImportError(null);
        
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (error) {
        setImportError('导入失败：' + (error as Error).message);
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
  };

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
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] bg-clip-text text-transparent">
            设置
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

      <main className="container mx-auto px-4 py-8 page-transition max-w-4xl">
        <div className="card practice-card mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-[18px] bg-gradient-to-r from-[#F8A5D1] to-[#FF85A2] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#6B5063]">学习记录管理</h2>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <h3 className="text-lg font-medium text-[#6B5063]">导出学习记录</h3>
            </div>
            <p className="text-[#8A6F81] mb-4">导出所有学习记录，包括答题历史、错题本和练习进度。</p>
            <button
              onClick={handleExport}
              className="btn-primary btn-press flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出数据
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="text-lg font-medium text-[#6B5063]">导入学习记录</h3>
            </div>
            <p className="text-[#8A6F81] mb-4">导入之前导出的学习记录文件，会覆盖当前的所有数据。</p>
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
                className="btn-secondary cursor-pointer flex items-center gap-2 btn-press"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                选择文件
              </label>
            </div>
            
            {importError && (
              <div className="mt-4 p-4 bg-[#FFD6D6]/50 rounded-[24px] border-2 border-[#FFA8A8]/50 text-[#8A4A4A]">
                {importError}
              </div>
            )}
            
            {importSuccess && (
              <div className="mt-4 p-4 bg-[#D5F4EE]/70 rounded-[24px] border-2 border-[#B4E4D8]/70 text-[#3A6960]">
                数据导入成功！
              </div>
            )}
          </div>

          <div className="p-6 bg-[#FFF5F8] rounded-[24px] border-2 border-[#F8A5D1]/30">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-medium text-[#6B5063]">数据说明</h3>
            </div>
            <ul className="text-sm text-[#8A6F81] space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#F8A5D1]">•</span>
                <span>学习记录包括：答题历史、错题本和练习进度</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F8A5D1]">•</span>
                <span>导出的文件为JSON格式，可以备份到其他设备</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F8A5D1]">•</span>
                <span>导入数据会覆盖当前的所有学习记录</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F8A5D1]">•</span>
                <span>建议定期导出数据，以防止数据丢失</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card practice-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[18px] bg-gradient-to-r from-[#B4E4D8] to-[#9DDACD] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#3A6960]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#6B5063]">关于</h2>
          </div>
          <p className="text-[#8A6F81] mb-4">英语写作练习是一个帮助用户通过填空练习强化英语短语与单词记忆的应用。</p>
          <p className="text-[#8A6F81]">版本：1.0.0</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
