
import React from 'react';
import { GameState, StoryResponse } from '../types';

interface StatusBarProps {
  state: GameState;
  story: StoryResponse | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ state, story }) => {
  const getFicoColor = (fico: number) => {
    if (fico >= 740) return 'text-emerald-400';
    if (fico >= 670) return 'text-cyan-400';
    if (fico >= 580) return 'text-amber-400';
    return 'text-rose-500';
  };

  const getRiskColor = (cr: number) => {
    if (cr < 15) return 'text-zinc-400';
    if (cr < 37) return 'text-amber-500';
    return 'text-rose-600 font-bold animate-pulse';
  };

  return (
    <header className="border-b border-zinc-700 pb-5 font-mono text-xs md:text-sm tracking-tight bg-zinc-900/30 p-4 rounded-t-lg">
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">AGE / 年岁</span>
          <span className="text-zinc-100 text-lg font-bold">{state.age}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">DEBT / 债务</span>
          <span className="text-zinc-100 text-lg font-bold">${state.debt.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">FICO / 信用</span>
          <span className={`text-lg font-bold ${getFicoColor(state.fico)}`}>{state.fico}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-end border-t border-zinc-800 pt-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold">STATUS / 阶层</span>
          <span className="text-zinc-200 uppercase tracking-wide text-xs">{story?.statusDesc || state.status}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 font-bold">RISK / 崩溃风险 (CR)</span>
          <span className={`uppercase text-xs ${getRiskColor(state.cr)}`}>
            {story?.riskDesc || state.riskDesc} / {state.cr}%
          </span>
        </div>
      </div>
    </header>
  );
};
