import React, { useState } from 'react';
import type { UserAnswer, PracticeUnit } from '../types';

interface SettingsPageProps {
  userAnswers: UserAnswer[];
  errorBook: UserAnswer[];
  practiceProgress: { [unitId: string]: number };
  customUnits: PracticeUnit[];
  onBack: () => void;
  onImportData: (data: {
    userAnswers?: UserAnswer[];
    errorBook?: UserAnswer[];
    practiceProgress?: { [unitId: string]: number };
    customUnits?: PracticeUnit[];
  }) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userAnswers,
  errorBook,
  practiceProgress,
  customUnits,
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
      customUnits,
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

        const hasValidData = (
          (data.userAnswers && Array.isArray(data.userAnswers)) ||
          (data.errorBook && Array.isArray(data.errorBook)) ||
          (data.practiceProgress && typeof data.practiceProgress === 'object') ||
          (data.customUnits && Array.isArray(data.customUnits))
        );

        if (!hasValidData) {
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

            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>设置</h1>

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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 page-transition">
        {/* Data Management */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-soft)' }}>
              <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>学习记录管理</h2>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>导出或导入你的学习数据</p>
            </div>
          </div>

          {/* Export */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>导出学习记录</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              导出所有学习记录，包括答题历史、错题本和练习进度。
            </p>
            <button
              onClick={handleExport}
              className="btn btn-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出数据
            </button>
          </div>

          {/* Import */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>导入学习记录</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              导入之前导出的学习记录文件，会覆盖当前的所有数据。
            </p>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="btn btn-secondary cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                选择文件
              </label>
            </div>

            {importError && (
              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--error-soft)', border: '1px solid var(--error-200)' }}>
                <p className="text-sm" style={{ color: 'var(--error)' }}>{importError}</p>
              </div>
            )}

            {importSuccess && (
              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--success-soft)', border: '1px solid var(--success-200)' }}>
                <p className="text-sm" style={{ color: 'var(--success)' }}>数据导入成功！</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-hover)' }}>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>数据说明</p>
                <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  <li>• 学习记录包括：答题历史、错题本和练习进度</li>
                  <li>• 导出的文件为JSON格式，可以备份到其他设备</li>
                  <li>• 导入数据会覆盖当前的所有学习记录</li>
                  <li>• 建议定期导出数据，以防止数据丢失</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-soft)' }}>
              <svg className="w-6 h-6" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>关于</h2>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>English Writing Practice</p>
            </div>
          </div>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            通过填空练习强化英语短语与单词记忆的应用。
          </p>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span>版本 1.0.0</span>
            <span>•</span>
            <span>PWA 应用</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
