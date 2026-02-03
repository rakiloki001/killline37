
import { GoogleGenAI, Type } from "@google/genai";
import { GameState, StoryResponse } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你现在是《37%：生存边际》硬核模拟器引擎。
风格：冷峻、压抑、美式现实主义（参考《Cyberhiking》）。
语境：发薪日贷款 (Payday loan)、芬太尼 (Opioid)、沃尔玛停车场、破碎的基建、掠夺性债务。
语言：请务必使用简体中文进行叙事。
语气：绝对的美式语境，严禁任何形式的“正能量”。所有的后果预测必须带有“概率”和“代价”的权衡感。

规则：
1. 叙事必须保持冷酷、疏离，描述当前的不可抗力或冲突。
2. 当 CR > 37% 时，环境描写开始出现“新怪谈”特征（阴影移动、扭曲的广告牌、不该存在的声音）。
3. 当 CR > 60% 时，强制触发 GE (Game Over) 结局。
4. 每 3 回合（或必要时）强制插入一次“美式灾难”（救护车、裁员、民事没收、车辆报废）。
5. 输出必须是符合 Schema 的有效 JSON。

状态等级参考：
- 薪资奴隶 (Wage Slave)
- 债务奔跑者 (Debt Runner)
- 边缘居民 (Marginal Resident)
- 系统幽灵 (Ghost in the System)
- 统计误差 (Statistical Error)
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    narrative: { type: Type.STRING, description: "描述当前处境的冷峻叙事（中文）。" },
    statusDesc: { type: Type.STRING, description: "阶层描述（中文）。" },
    riskDesc: { type: Type.STRING, description: "风险程度描述，如：LOW/VULNERABLE/CRITICAL。" },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          label: { type: Type.STRING, description: "A, B, 或 C" },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          riskPrediction: { type: Type.STRING, description: "预估后果（中文）。" },
          delta: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.NUMBER },
              debt: { type: Type.NUMBER },
              fico: { type: Type.NUMBER },
              cr: { type: Type.NUMBER }
            }
          }
        },
        required: ["id", "label", "title", "description", "riskPrediction", "delta"]
      }
    },
    gameOverMessage: { type: Type.STRING, description: "结局描述（如果触发了结局）。" }
  },
  required: ["narrative", "statusDesc", "riskDesc", "choices"]
};

export const generateNextTurn = async (state: GameState, lastChoiceTitle?: string): Promise<StoryResponse> => {
  const isDisasterRound = state.round % 3 === 0 && state.round !== 0;
  
  const prompt = `
    当前状态：
    年岁: ${state.age}
    债务: $${state.debt}
    信用分: ${state.fico}
    风险值 (CR): ${state.cr}%
    当前回合: ${state.round}
    最后动作: ${lastChoiceTitle || "开始下坠"}
    强制灾难事件: ${isDisasterRound ? "是" : "否"}
    
    请生成下一个场景。
    A 为常规选择。
    B 为风险/博弈选择。
    C 为极端自救/异化选择。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  return JSON.parse(response.text);
};
