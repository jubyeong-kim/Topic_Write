export interface Problem {
  id: string;
  type: 'essay' | 'description' | 'story' | 'opinion' | 'debate';
  type_number: number;
  prompt: string;
  requirements: string;
  sample_answer?: string;
  difficulty: number;
  time_limit: number;
}

export interface Answer {
  id: string;
  problem_id: string;
  user_id: string;
  content: string;
  feedback?: FeedbackResult;
  score?: number;
  is_mock_data?: boolean;
  created_at: string;
}

export interface FeedbackResult {
  autoCorrections: AutoCorrection[];
  grammarErrors: GrammarError[];
  contextIssues: ContextIssue[];
  overallScore: number;
}

export interface AutoCorrection {
  original: string;
  corrected: string;
  position: { start: number; end: number };
}

export interface GrammarError {
  id: string;
  original: string;
  corrected: string;
  type: string;
  explanation: string;
  suggestion: string;
  position: { start: number; end: number };
}

export interface ContextIssue {
  type: 'flow' | 'coherence' | 'transition' | 'length';
  description: string;
  suggestion: string;
  affectedText: string;
}

export interface ProblemType {
  type: string;
  typeNumber: number;
  name: string;
  description: string;
  icon: string;
  color: string;
}
