
import React from 'react';
import { GameState } from '../types';

interface GameOverProps {
  state: GameState;
  message?: string;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ state, message, onRestart }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-rose-600">
      <div className="max-w-md w-full border border-rose-900/40 bg-zinc-950 p-10 space-y-10 animate-in zoom-in-95 duration-1000 shadow-[0_0_50px_rgba(153,27,27,0.1)]">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-rose-600 uppercase tracking-tighter italic">COLLAPSED</h1>
          <h2 className="text-xl font-bold text-zinc-100">系统性崩溃</h2>
          <p className="font-mono text-[10px] text-rose-900 tracking-[0.4em] uppercase font-bold">[SYSTEM_ERROR: SURVIVAL_MARGIN_EXCEEDED]</p>
        </div>

        <div className="space-y-6">
          <p className="text-zinc-300 font-light leading-relaxed italic text-lg border-l-2 border-rose-900/50 pl-4">
            "{message || "你已经达到了系统能从你身上压榨的极限。你的存在已被作为一个数据点归档在某个被遗忘的电子表格中。"}"
          </p>

          <div className="grid grid-cols-2 gap-6 border-y border-zinc-900 py-8 font-mono text-xs text-zinc-500">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-700 font-bold uppercase tracking-widest">FINAL AGE / 终年</span>
              <span className="text-zinc-100 text-lg font-bold">{state.age}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-700 font-bold uppercase tracking-widest">TOTAL DEBT / 遗债</span>
              <span className="text-zinc-100 text-lg font-bold">${state.debt.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-700 font-bold uppercase tracking-widest">FICO / 信用终值</span>
              <span className="text-zinc-100 text-lg font-bold">{state.fico}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-700 font-bold uppercase tracking-widest">CR MAX / 崩溃风险峰值</span>
              <span className="text-rose-600 text-lg font-bold">{state.cr}%</span>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-5 border border-rose-900/40 hover:bg-rose-900/20 hover:border-rose-600 text-rose-500 font-mono uppercase tracking-[0.3em] text-xs transition-all font-bold active:scale-[0.98]"
        >
          Restart Protocol / 重启模拟
        </button>
      </div>
    </div>
  );
};
