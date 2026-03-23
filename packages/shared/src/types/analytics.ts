import type { TopicSlug } from './topic';

export interface TopicAccuracy {
  topicSlug: TopicSlug;
  topicName: string;
  totalAttempts: number;
  averageScore: number;       // percentage 0-100
  averageTimeTaken: number;   // seconds per question
}

export interface AnalyticsSummary {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  overallAccuracy: number;    // percentage 0-100
  byTopic: TopicAccuracy[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  topicSlug: TopicSlug;
  topicName: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}
