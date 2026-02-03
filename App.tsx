
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StoryResponse, Choice } from './types';
import { generateNextTurn } from './geminiService';
import { StatusBar } from './components/StatusBar';
import { NarrativeCard } from './components/NarrativeCard';
import { LoadingScreen } from './components/LoadingScreen';
import { GameOver } from './components/GameOver';

const INITIAL_STATE: GameState = {
  age: 24,
  debt: 12500,
  fico: 680,
  cr: 5,
  status: '薪资奴隶 (Wage Slave)',
  riskDesc: 'LOW',
  round: 0,
  isGameOver: false,
};

const App: React.FC = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startTurn = useCallback(async (currentState: GameState, choiceTitle?: string) => {
    setLoading(true);
    setError(null);
    try {
      const nextStory = await generateNextTurn(currentState, choiceTitle);
      setStory(nextStory);
      
      if (nextStory.gameOverMessage || currentState.cr > 60) {
        setState(prev => ({ ...prev, isGameOver: true }));
      }
    } catch (err: any) {
      console.error(err);
      setError("系统无法计算你的现实。连接中断。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    startTurn(INITIAL_STATE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoice = (choice: Choice) => {
    const newState = {
      ...state,
      age: state.age + (choice.delta.age || 0),
      debt: Math.max(0, state.debt + (choice.delta.debt || 0)),
      fico: Math.max(300, Math.min(850, state.fico + (choice.delta.fico || 0))),
      cr: Math.min(100, state.cr + (choice.delta.cr || 0)),
      round: state.round + 1,
    };

    if (newState.cr > 60) {
      newState.isGameOver = true;
    }

    setState(newState);
    startTurn(newState, choice.title);
  };

  const restart = () => {
    setState(INITIAL_STATE);
    setStory(null);
    startTurn(INITIAL_STATE);
  };

  if (state.isGameOver && !loading) {
    return <GameOver state={state} message={story?.gameOverMessage} onRestart={restart} />;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-200 flex flex-col p-4 md:p-8 max-w-3xl mx-auto selection:bg-rose-900 selection:text-white">
      <StatusBar state={state} story={story} />
      
      <main className="mt-10 flex-grow">
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <div className="border border-rose-900/50 p-8 bg-rose-950/10 text-rose-500 font-mono text-sm shadow-[0_0_20px_rgba(153,27,27,0.1)]">
            <span className="font-bold text-lg">[错误代码: 现实断裂]</span>
            <p className="mt-3 text-zinc-300 leading-relaxed">{error}</p>
            <button 
              onClick={() => startTurn(state)}
              className="mt-6 px-6 py-3 bg-rose-900 text-white hover:bg-rose-800 transition-colors uppercase text-xs font-bold tracking-widest"
            >
              Retry Protocol / 重试协议
            </button>
          </div>
        ) : story && (
          <NarrativeCard 
            story={story} 
            cr={state.cr}
            onChoiceSelect={handleChoice} 
          />
        )}
      </main>

      <footer className="mt-16 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] border-t border-zinc-900 pt-6 flex justify-between items-center opacity-60">
        <span>© 2024 Margin Dynamics. No Rights Reserved.</span>
        <span className="bg-zinc-900 px-2 py-1 border border-zinc-800">
          SEQ: {state.round.toString().padStart(3, '0')}
        </span>
      </footer>
    </div>
  );
};

export default App;
