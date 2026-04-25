export type ChatMsg = {
  role: 'assistant' | 'user';
  content: string;
};

export type ChatResponse = {
  answer: string;
  evidence?: unknown[];
};
