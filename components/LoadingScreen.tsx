
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "计算利息累计中...",
  "同步 FICO 信用数据库...",
  "监控边际稳定性...",
  "扫描滞纳金记录...",
  "验证社会安全号码...",
  "处理债务回收逻辑...",
  "评估预期寿命..."
];

export const LoadingScreen: React.FC = () => {
  const [msg, setMsg] = useState(MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsg(prev => {
        const idx = MESSAGES.indexOf(prev);
        return MESSAGES[(idx + 1) % MESSAGES.length];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-8 font-mono">
      <div className="w-24 h-px bg-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-rose-600 animate-loading-line" />
      </div>
      <span className="text-[11px] text-zinc-400 uppercase tracking-[0.3em] animate-pulse">
        {msg}
      </span>
      <style>{`
        @keyframes loading-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-line {
          animation: loading-line 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};
