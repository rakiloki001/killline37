
export interface GameState {
  age: number;
  debt: number;
  fico: number;
  cr: number; // Collapse Risk (percentage)
  status: string;
  riskDesc: string;
  round: number;
  isGameOver: boolean;
}

export interface Choice {
  id: string;
  label: string; // A, B, C
  title: string;
  description: string;
  riskPrediction: string;
  delta: {
    age?: number;
    debt?: number;
    fico?: number;
    cr?: number;
  };
}

export interface StoryResponse {
  narrative: string;
  statusDesc: string;
  riskDesc: string;
  choices: Choice[];
  gameOverMessage?: string;
}

export enum RiskLevel {
  LOW = 'LOW',
  VULNERABLE = 'VULNERABLE',
  CRITICAL = 'CRITICAL',
  COLLAPSED = 'COLLAPSED'
}
