export interface Problem {
  id: string;
  type: 'fill_blank' | 'data_description' | 'essay';
  type_number: number;
  prompt: string;
  requirements: string;
  sample_answer?: string;
  grading_criteria?: string;
  difficulty: number;
  time_limit: number;
  word_limit?: { min: number; max: number };
  points?: number;
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
  type: 'flow' | 'coherence' | 'transition' | 'length' | 'repetition';
  description: string;
  suggestion: string;
  affectedText: string;
}

export interface ProblemType {
  type: string;
  typeNumber: number;
  name: string;
  description: string;
  points: number;
  wordLimit?: string;
  icon: string;
  color: string;
}
