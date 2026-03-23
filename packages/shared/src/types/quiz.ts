import type { Difficulty } from './question';
import type { TopicSlug } from './topic';

// One answered question tracked on the frontend during a live quiz
export interface AnswerRecord {
  questionId: string;
  selectedIndex: number; // -1 = timed out / skipped
  timeTaken: number;     // seconds (max 60)
  isCorrect: boolean;
}

// Sent to POST /api/quiz/submit
export interface QuizSubmitPayload {
  topicSlug: TopicSlug;
  difficulty: Difficulty;
  answers: AnswerRecord[];
}

// Returned from POST /api/quiz/submit
export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number[];    // indices of correctly answered questions
  explanations: string[];      // one per question, in order
  correctIndices: number[];    // the real correct option index per question
  attemptId?: string;          // only present for authenticated users
}

export interface QuizAttempt {
  id: string;
  topicSlug: TopicSlug;
  topicName: string;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  completedAt: string;
}
