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

  // 处理普通文本输入，即时显示可点击的词语
  const handleOriginalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setOriginalText(text);

    if (text) {
      // 分割文本为词语、空格和标点符号
      const parts = text.split(/(\s+|[.,!?;:'"()\[\]{}_\-+*=<>/\\|]+)/);
      const words = parts
        .filter(part => part.trim() !== '') // 过滤空字符串
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

  // 检查文本是否为有效单词（不包含空格和标点）
  const isValidWord = (text: string): boolean => {
    // 去除空白字符后检查
    const trimmed = text.trim();
    if (!trimmed) return false;
    // 检查是否只包含字母、数字和连字符
    return /^[a-zA-Z0-9-]+$/.test(trimmed);
  };

  // 处理词语点击，标记为挖空
  const handleWordClick = (index: number) => {
    const newWords = [...clickableWords];
    const word = newWords[index];

    // 只有有效单词才能被标记为挖空
    if (!isValidWord(word.text)) {
      return;
    }

    word.isBlank = !word.isBlank;
    setClickableWords(newWords);

    // 更新挖空后的文本 - 使用 [ ] 替换挖空单词
    const newBlankedText = newWords.map(w =>
      w.isBlank ? '[ ]' : w.text
    ).join('');
    setBlankedText(newBlankedText);

    // 提取所有标记为挖空的词语作为正确答案
    const blankWords = newWords
      .filter(w => w.isBlank && isValidWord(w.text))
      .map(w => w.text.trim());

    // 更新 blanks 数组，填充正确答案
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

  // 处理挖空文本输入，提取填空内容
  const handleBlankedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBlankedText(text);

    // 当用户输入挖空文本时，更新可点击词语区域
    if (text) {
      const words: {text: string, isBlank: boolean}[] = [];
      const blankAnswers: string[] = [];
      let i = 0;

      // 如果有原文，尝试从原文提取答案
      const hasOriginalText = originalText && originalText.trim().length > 0;
      let originalIndex = 0;

      while (i < text.length) {
        // 检查 [ ] 格式（括号中间有空格）
        if (text.substring(i, i + 3) === '[ ]') {
          // 尝试从原文提取被挖空的单词
          let blankWord = '[ ]';
          if (hasOriginalText) {
            // 跳过原文中的空格，找到下一个单词
            while (originalIndex < originalText.length && /\s/.test(originalText[originalIndex])) {
              originalIndex++;
            }
            // 收集原文中的单词
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
        // 检查 [] 格式（括号中间没有空格）
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
        // 检查 () 格式
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
        // 检查 _ 格式（一个或多个下划线）
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
        // 普通文本 - 需要进一步分割为单词和空格
        else {
          let j = i;
          // 收集连续的普通文本（非挖空标记）
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

          // 将普通文本按空格和单词分割
          const normalText = text.substring(i, j);
          const parts = normalText.split(/(\s+)/);

          parts.forEach(part => {
            if (part) {
              words.push({ text: part, isBlank: false });
              // 同步更新原文索引
              if (hasOriginalText) {
                originalIndex += part.length;
              }
            }
          });

          i = j;
        }
      }

      setClickableWords(words);

      // 生成 blanks 数组 - 从 words 数组中提取 isBlank: true 的单词
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

  // 提取填空内容
  const extractBlanks = (text: string): Blank[] => {
    // 支持多种挖空格式：[ ], (), _, __, ___ 等
    const blankMatches = text.match(/(\[ \]|\(\)|_+)/g) || [];
    return blankMatches.map((_, index) => ({
      id: `b${index + 1}`,
      correctAnswer: '',
      options: []
    }));
  };

  // 添加当前练习
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
  };

  // 处理填空答案变化
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

  // 生成自定义单元
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
            添加自定义练习
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

      <main className="container mx-auto px-4 py-8 page-transition">
        <div className={`card practice-card mb-8 ${darkMode ? 'bg-gray-800' : ''}`}>
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
            <svg className="w-6 h-6 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            单元信息
          </h2>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                单元标题
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                value={unitTitle}
                onChange={(e) => setUnitTitle(e.target.value)}
                placeholder="输入单元标题"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                单元描述
              </label>
              <textarea
                className={`w-full px-4 py-3 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                value={unitDescription}
                onChange={(e) => setUnitDescription(e.target.value)}
                placeholder="输入单元描述"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className={`card practice-card mb-8 ${darkMode ? 'bg-gray-800' : ''}`}>
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
            <svg className="w-6 h-6 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            添加练习题目
          </h2>

          <div className="mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                输入原始文本，点击词语作为填空
              </label>
              <textarea
                className={`w-full px-4 py-3 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all mb-4 ${darkMode ? 'text-white bg-gray-800' : ''}`}
                value={originalText}
                onChange={handleOriginalTextChange}
                placeholder="输入一段英文文本..."
                rows={4}
              />
            </div>

            {clickableWords.length > 0 && (
              <div className={`p-4 rounded-[18px] border-2 border-[#F8A5D1]/20 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-[#FFF5F8]'}`}>
                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                  点击词语标记为填空：
                </p>
                <div className="flex flex-wrap gap-2">
                  {clickableWords.map((word, index) => {
                    const valid = isValidWord(word.text);
                    return (
                      <span
                        key={index}
                        onClick={() => valid && handleWordClick(index)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          word.isBlank
                            ? 'bg-[#F8A5D1] text-white'
                            : valid
                              ? darkMode
                                ? 'bg-gray-700 border border-[#F8A5D1]/20 text-white cursor-pointer hover:opacity-80'
                                : 'bg-white border border-[#F8A5D1]/20 text-[#6B5063] cursor-pointer hover:opacity-80'
                              : darkMode
                                ? 'text-gray-500'
                                : 'text-gray-400'
                        }`}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {word.text === ' ' ? '\u00A0' : word.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                挖空后的文本（使用 [ ] 标记填空）
              </label>
              <textarea
                className={`w-full px-4 py-3 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                value={blankedText}
                onChange={handleBlankedTextChange}
                placeholder="输入带 [ ] 标记的文本..."
                rows={4}
              />
            </div>

            {currentPractice.blanks.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>填空答案</h3>
                {currentPractice.blanks.map((blank, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={`w-8 text-center font-medium ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>{index + 1}.</span>
                    <input
                      type="text"
                      className={`flex-1 px-4 py-2 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                      value={blank.correctAnswer}
                      onChange={(e) => handleBlankAnswerChange(index, e.target.value)}
                      placeholder="输入正确答案"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                  答案解析
                </label>
                <textarea
                  className={`w-full px-4 py-2 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                  value={currentPractice.explanation}
                  onChange={(e) => setCurrentPractice({ ...currentPractice, explanation: e.target.value })}
                  placeholder="输入答案解析"
                  rows={2}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
                  中文翻译
                </label>
                <textarea
                  className={`w-full px-4 py-2 rounded-[18px] border-2 border-[#F8A5D1]/20 focus:outline-none focus:ring-2 focus:ring-[#F8A5D1] transition-all ${darkMode ? 'text-white bg-gray-800' : ''}`}
                  value={currentPractice.translation}
                  onChange={(e) => setCurrentPractice({ ...currentPractice, translation: e.target.value })}
                  placeholder="输入中文翻译"
                  rows={2}
                />
              </div>
            </div>

            <button
              onClick={addPractice}
              className="btn-primary mt-6 flex items-center gap-2"
              disabled={!currentPractice.question || currentPractice.blanks.length === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加题目
            </button>
          </div>
        </div>

        {practices.length > 0 && (
          <div className={`card practice-card mb-8 ${darkMode ? 'bg-gray-800' : ''}`}>
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>
            <svg className="w-6 h-6 text-[#F8A5D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            已添加的题目 ({practices.length})
          </h2>

            <div className="space-y-4">
              {practices.map((practice, index) => (
                <div key={practice.id} className={`p-4 rounded-[18px] border-2 border-[#F8A5D1]/20 ${darkMode ? 'bg-gray-700' : 'bg-[#FFF5F8]'}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#6B5063]'}`}>题目 {index + 1}</h3>
                  <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-[#8A6F81]'}`}>{practice.question}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {practice.blanks.map((blank, blankIndex) => (
                      <span key={blank.id} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-pink-900/30 text-white' : 'bg-[#F8A5D1]/20 text-[#6B5063]'}`}>
                        {blankIndex + 1}: {blank.correctAnswer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={generateUnit}
            className="btn-primary px-8 py-3 flex items-center gap-2"
            disabled={!unitTitle || practices.length === 0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            生成自定义单元
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomUnitPage;
