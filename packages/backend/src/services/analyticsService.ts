import { prisma } from '../db';
import type { AnalyticsSummary, TopicAccuracy, QuizAttempt } from '@quizapp/shared';

interface RawTopicRow {
  topic_slug: string;
  topic_name: string;
  total_attempts: bigint;
  total_correct: bigint;
  total_questions: bigint;
  avg_time_taken: string;
}

export async function getAnalyticsForUser(userId: string): Promise<AnalyticsSummary> {
  // Two aggregation concerns separated to avoid JOIN fan-out:
  // - quiz_attempts gives us score / totalQuestions (quiz-level)
  // - question_attempts gives us avg time per question (row-level)
  // Joining them directly in one query would multiply quiz-level sums
  // by the number of question rows (10x inflation). Subquery avoids this.
  const rows = await prisma.$queryRaw<RawTopicRow[]>`
    SELECT
      t.slug                       AS topic_slug,
      t.name                       AS topic_name,
      COUNT(qa.id)                 AS total_attempts,
      SUM(qa.score)                AS total_correct,
      SUM(qa.total_questions)      AS total_questions,
      (
        SELECT AVG(qat.time_taken)
        FROM question_attempts qat
        JOIN quiz_attempts qa2 ON qat.quiz_attempt_id = qa2.id
        WHERE qa2.user_id = ${userId}
          AND qa2.topic_id = t.id
      ) AS avg_time_taken
    FROM quiz_attempts qa
    JOIN topics t ON qa.topic_id = t.id
    WHERE qa.user_id = ${userId}
    GROUP BY t.slug, t.name, t.id
    ORDER BY t.name ASC
  `;

  let grandTotalCorrect = 0;
  let grandTotalQuestions = 0;
  let grandTotalAttempts = 0;

  const byTopic: TopicAccuracy[] = rows.map((row) => {
    const totalAttempts = Number(row.total_attempts);
    const totalCorrect = Number(row.total_correct);
    const totalQuestions = Number(row.total_questions);
    const avgTimeTaken = parseFloat(row.avg_time_taken ?? '0');

    grandTotalAttempts += totalAttempts;
    grandTotalCorrect += totalCorrect;
    grandTotalQuestions += totalQuestions;

    return {
      topicSlug: row.topic_slug as TopicAccuracy['topicSlug'],
      topicName: row.topic_name,
      totalAttempts,
      averageScore: totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
      averageTimeTaken: Math.round(avgTimeTaken),
    };
  });

  return {
    totalQuizzes: grandTotalAttempts,
    totalCorrect: grandTotalCorrect,
    totalQuestions: grandTotalQuestions,
    overallAccuracy: grandTotalQuestions > 0
      ? Math.round((grandTotalCorrect / grandTotalQuestions) * 100)
      : 0,
    byTopic,
  };
}

export async function getRecentAttempts(
  userId: string,
  limit: number,
): Promise<QuizAttempt[]> {
  const rows = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { completedAt: 'desc' },
    take: limit,
    include: { topic: true },
  });

  return rows.map((row) => ({
    id: row.id,
    topicSlug: row.topic.slug as QuizAttempt['topicSlug'],
    topicName: row.topic.name,
    difficulty: row.difficulty as QuizAttempt['difficulty'],
    score: row.score,
    totalQuestions: row.totalQuestions,
    completedAt: row.completedAt.toISOString(),
  }));
}
