
import React from 'react';
import { StoryResponse, Choice } from '../types';

interface NarrativeCardProps {
  story: StoryResponse;
  cr: number;
  onChoiceSelect: (choice: Choice) => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({ story, cr, onChoiceSelect }) => {
  const isAlienated = cr > 37;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative p-2">
        {isAlienated && (
          <div className="absolute -inset-2 bg-rose-900/10 blur-2xl rounded-full opacity-40 pointer-events-none animate-pulse" />
        )}
        <blockquote className={`relative text-lg md:text-xl font-light leading-relaxed border-l-4 border-zinc-700 pl-6 py-4 ${isAlienated ? 'text-zinc-100' : 'text-zinc-300'}`}>
          {story.narrative}
        </blockquote>
      </div>

      <div className="space-y-6">
        <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2">
          WHAT DO YOU DO? / 你的抉择?
        </h3>
        
        <div className="flex flex-col gap-5">
          {story.choices.map((choice) => (
            <div key={choice.id} className="group flex flex-col">
              <button
                onClick={() => onChoiceSelect(choice)}
                className="text-left w-full border border-zinc-800 p-5 bg-zinc-900/20 hover:border-zinc-400 hover:bg-zinc-800/40 transition-all active:translate-y-0.5"
              >
                <div className="flex gap-4">
                  <span className="font-mono text-zinc-500 group-hover:text-zinc-100 text-lg">[{choice.label}]</span>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-zinc-100 group-hover:text-white text-base tracking-tight">{choice.title}</span>
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-300 leading-normal">{choice.description}</span>
                  </div>
                </div>
              </button>
              
              <details className="mt-2">
                <summary className="text-[10px] font-mono text-zinc-600 cursor-help hover:text-zinc-400 px-5 py-1 flex items-center gap-2 uppercase tracking-wider transition-colors">
                  <span className="text-xs">🔎</span> 风险预测 (RISK PREDICTION)
                </summary>
                <div className="px-5 pb-3 text-[11px] font-mono text-zinc-500 leading-relaxed border-l border-zinc-800 ml-5 mt-2 italic bg-black/20 py-2">
                  * {choice.riskPrediction}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
