import React, { useState } from 'react';
import type { PracticeUnit, Practice, Blank } from '../types';

interface CustomUnitPageProps {
  onBack: () => void;
  onUnitCreated: (unit: PracticeUnit) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const CustomUnitPage: React.FC<CustomUnitPageProps> = ({
  onBack,
  onUnitCreated,
  darkMode,
  onToggleDarkMode
}) => {
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDescription, setUnitDescription] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [blankedText, setBlankedText] = useState('');
  const [practices, setPractices] = useState<Practice[]>([]);
  const [currentPractice, setCurrentPractice] = useState<{
    question: string;
    blanks: Blank[];
    explanation: string;
    translation: string;
  }>({
    question: '',
    blanks: [],
    explanation: '',
    translation: ''
  });

  const [clickableWords, setClickableWords] = useState<{text: string, isBlank: boolean}[]>([]);

  const handleOriginalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setOriginalText(text);

    if (text) {
      const parts = text.split(/(\s+|[.,!?;:'"()[\]{}_\-+*=<>/|]+)/);
      const words = parts
        .filter(part => part.trim() !== '')
        .map(part => ({
          text: part,
          isBlank: false
        }));
      setClickableWords(words);
    } else {
      setClickableWords([]);
      setBlankedText('');
    }
  };

  const isValidWord = (text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    return /^[a-zA-Z0-9-]+$/.test(trimmed);
  };

  const handleWordClick = (index: number) => {
    const newWords = [...clickableWords];
    const word = newWords[index];

    if (!isValidWord(word.text)) {
      return;
    }

    word.isBlank = !word.isBlank;
    setClickableWords(newWords);

    const newBlankedText = newWords.map(w =>
      w.isBlank ? '[ ]' : w.text
    ).join('');
    setBlankedText(newBlankedText);

    const blankWords = newWords
      .filter(w => w.isBlank && isValidWord(w.text))
      .map(w => w.text.trim());

    const newBlanks = blankWords.map((w, blankIndex) => ({
      id: `b${blankIndex + 1}`,
      correctAnswer: w,
      options: []
    }));

    setCurrentPractice(prev => ({
      ...prev,
      question: newBlankedText,
      blanks: newBlanks
    }));
  };

  const handleBlankedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBlankedText(text);

    if (text) {
      const words: {text: string, isBlank: boolean}[] = [];
      const blankAnswers: string[] = [];
      let i = 0;

      const hasOriginalText = originalText && originalText.trim().length > 0;
      let originalIndex = 0;

      while (i < text.length) {
        if (text.substring(i, i + 3) === '[ ]') {
          let blankWord = '[ ]';
          if (hasOriginalText) {
            while (originalIndex < originalText.length && /\s/.test(originalText[originalIndex])) {
              originalIndex++;
            }
            let answer = '';
            while (originalIndex < originalText.length && !/\s/.test(originalText[originalIndex])) {
              answer += originalText[originalIndex];
              originalIndex++;
            }
            if (answer) {
              blankWord = answer;
              blankAnswers.push(answer);
            }
          }
          words.push({ text: blankWord, isBlank: true });
          i += 3;
        }
        else if (text.substring(i, i + 2) === '[]') {
          let blankWord = '[]';
          if (hasOriginalText) {
            while (originalIndex < originalText.length && /\s/.test(originalText[originalIndex])) {
              originalIndex++;
            }
            let answer = '';
            while (originalIndex < originalText.length && !/\s/.test(originalText[originalIndex])) {
              answer += originalText[originalIndex];
              originalIndex++;
            }
            if (answer) {
              blankWord = answer;
              blankAnswers.push(answer);
            }
          }
          words.push({ text: blankWord, isBlank: true });
          i += 2;
        }
        else if (text.substring(i, i + 2) === '()') {
          let blankWord = '()';
          if (hasOriginalText) {
            while (originalIndex < originalText.length && /\s/.test(originalText[originalIndex])) {
              originalIndex++;
            }
            let answer = '';
            while (originalIndex < originalText.length && !/\s/.test(originalText[originalIndex])) {
              answer += originalText[originalIndex];
              originalIndex++;
            }
            if (answer) {
              blankWord = answer;
              blankAnswers.push(answer);
            }
          }
          words.push({ text: blankWord, isBlank: true });
          i += 2;
        }
        else if (text[i] === '_') {
          let j = i;
          while (j < text.length && text[j] === '_') {
            j++;
          }
          const underscoreText = text.substring(i, j);
          let blankWord = underscoreText;

          if (hasOriginalText) {
            while (originalIndex < originalText.length && /\s/.test(originalText[originalIndex])) {
              originalIndex++;
            }
            let answer = '';
            while (originalIndex < originalText.length && !/\s/.test(originalText[originalIndex])) {
              answer += originalText[originalIndex];
              originalIndex++;
            }
            if (answer) {
              blankWord = answer;
              blankAnswers.push(answer);
            }
          }
          words.push({ text: blankWord, isBlank: true });
          i = j;
        }
        else {
          let j = i;
          while (j < text.length) {
            const remaining = text.substring(j);
            if (remaining.startsWith('[ ]') ||
                remaining.startsWith('[]') ||
                remaining.startsWith('()') ||
                text[j] === '_') {
              break;
            }
            j++;
          }

          const normalText = text.substring(i, j);
          const parts = normalText.split(/(\s+)/);

          parts.forEach(part => {
            if (part) {
              words.push({ text: part, isBlank: false });
              if (hasOriginalText) {
                originalIndex += part.length;
              }
            }
          });

          i = j;
        }
      }

      setClickableWords(words);

      const blankWords = words
        .filter(word => word.isBlank)
        .map(word => word.text);

      const newBlanks = blankWords.map((word, blankIndex) => ({
        id: `b${blankIndex + 1}`,
        correctAnswer: word,
        options: []
      }));

      setCurrentPractice(prev => ({
        ...prev,
        question: text,
        blanks: newBlanks
      }));
    } else {
      setClickableWords([]);
      setCurrentPractice(prev => ({
        ...prev,
        question: '',
        blanks: []
      }));
    }
  };

  const addPractice = () => {
    if (!currentPractice.question) return;

    const newPractice: Practice = {
      id: `custom-${Date.now()}-${practices.length + 1}`,
      question: currentPractice.question,
      blanks: currentPractice.blanks.map((blank, index) => ({
        ...blank,
        id: `b${index + 1}`
      })),
      explanation: currentPractice.explanation,
      feedback: '',
      translation: currentPractice.translation
    };

    setPractices([...practices, newPractice]);
    setCurrentPractice({
      question: '',
      blanks: [],
      explanation: '',
      translation: ''
    });
    setOriginalText('');
    setBlankedText('');
    setClickableWords([]);
  };

  const handleBlankAnswerChange = (index: number, value: string) => {
    const newBlanks = [...currentPractice.blanks];
    if (newBlanks[index]) {
      newBlanks[index].correctAnswer = value;
    } else {
      newBlanks[index] = {
        id: `b${index + 1}`,
        correctAnswer: value,
        options: []
      };
    }
    setCurrentPractice({
      ...currentPractice,
      blanks: newBlanks
    });
  };

  const generateUnit = () => {
    if (!unitTitle || practices.length === 0) return;

    const customUnit: PracticeUnit = {
      id: `custom-${Date.now()}`,
      title: unitTitle,
      description: unitDescription,
      level: 'intermediate',
      completedCount: 0,
      practiceCount: practices.length,
      practices
    };

    onUnitCreated(customUnit);
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

            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>自定义练习</h1>

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
        {/* Unit Info */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>单元信息</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                单元标题
              </label>
              <input
                type="text"
                className="input"
                value={unitTitle}
                onChange={(e) => setUnitTitle(e.target.value)}
                placeholder="输入单元标题"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                单元描述
              </label>
              <textarea
                className="input"
                value={unitDescription}
                onChange={(e) => setUnitDescription(e.target.value)}
                placeholder="输入单元描述"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Add Practice */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>添加题目</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                输入原文，点击词语作为填空
              </label>
              <textarea
                className="input"
                value={originalText}
                onChange={handleOriginalTextChange}
                placeholder="输入一段英文文本..."
                rows={4}
              />
            </div>

            {clickableWords.length > 0 && (
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-hover)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>点击词语标记为填空：</p>
                <div className="flex flex-wrap gap-2">
                  {clickableWords.map((word, index) => {
                    const valid = isValidWord(word.text);
                    return (
                      <span
                        key={index}
                        onClick={() => valid && handleWordClick(index)}
                        className={`px-2 py-1 rounded-lg text-sm transition-all ${
                          word.isBlank
                            ? 'text-white'
                            : valid
                              ? 'cursor-pointer hover:opacity-80'
                              : ''
                        }`}
                        style={{
                          whiteSpace: 'nowrap',
                          backgroundColor: word.isBlank ? 'var(--primary)' : valid ? 'var(--surface)' : 'transparent',
                          color: word.isBlank ? 'white' : valid ? 'var(--text-primary)' : 'var(--text-muted)',
                          border: word.isBlank ? 'none' : valid ? '1px solid var(--border)' : 'none'
                        }}
                      >
                        {word.text === ' ' ? '\u00A0' : word.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                挖空后的文本（使用 [ ] 标记填空）
              </label>
              <textarea
                className="input"
                value={blankedText}
                onChange={handleBlankedTextChange}
                placeholder="输入带 [ ] 标记的文本..."
                rows={4}
              />
            </div>

            {currentPractice.blanks.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>填空答案</h3>
                {currentPractice.blanks.map((blank, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-8 text-center font-medium" style={{ color: 'var(--text-primary)' }}>{index + 1}.</span>
                    <input
                      type="text"
                      className="input flex-1"
                      value={blank.correctAnswer}
                      onChange={(e) => handleBlankAnswerChange(index, e.target.value)}
                      placeholder="输入正确答案"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  答案解析
                </label>
                <textarea
                  className="input"
                  value={currentPractice.explanation}
                  onChange={(e) => setCurrentPractice({ ...currentPractice, explanation: e.target.value })}
                  placeholder="输入答案解析"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  中文翻译
                </label>
                <textarea
                  className="input"
                  value={currentPractice.translation}
                  onChange={(e) => setCurrentPractice({ ...currentPractice, translation: e.target.value })}
                  placeholder="输入中文翻译"
                  rows={2}
                />
              </div>
            </div>

            <button
              onClick={addPractice}
              className="btn btn-primary w-full"
              disabled={!currentPractice.question || currentPractice.blanks.length === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加题目
            </button>
          </div>
        </div>

        {/* Practice List */}
        {practices.length > 0 && (
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--success-soft)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>已添加的题目 ({practices.length})</h2>
            </div>

            <div className="space-y-3">
              {practices.map((practice, index) => (
                <div key={practice.id} className="card p-4">
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>题目 {index + 1}</p>
                  <p className="mb-3" style={{ color: 'var(--text-primary)' }}>{practice.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {practice.blanks.map((blank, blankIndex) => (
                      <span key={blank.id} className="tag tag-primary">
                        {blankIndex + 1}: {blank.correctAnswer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generateUnit}
          className="btn btn-primary btn-lg w-full"
          disabled={!unitTitle || practices.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          生成自定义单元
        </button>
      </main>
    </div>
  );
};

export default CustomUnitPage;
