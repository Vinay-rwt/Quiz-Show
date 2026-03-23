export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuestionOption {
  text: string;
}

export interface Question {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  text: string;
  options: QuestionOption[];
  correctIndex: number;
  explanation: string;
}

// Sent to the frontend — correctIndex is omitted to prevent cheating
export type QuestionForQuiz = Omit<Question, 'correctIndex' | 'explanation'>;
