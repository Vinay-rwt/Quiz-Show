import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import type { LeaderboardEntry } from '@quizapp/shared';

interface RawLeaderboardRow {
  rank: bigint;
  username: string;
  topic_slug: string;
  topic_name: string;
  difficulty: string;
  score: number;
  total_questions: number;
  completed_at: Date;
}

export async function getLeaderboard(
  topicSlug?: string,
  limit = 10,
): Promise<LeaderboardEntry[]> {
  // RANK() window functions cannot reference computed column aliases from the same
  // SELECT level in PostgreSQL. We use a CTE to compute total_time first, then
  // apply RANK() in the outer query referencing the CTE column directly.
  const topicFilter = topicSlug
    ? Prisma.sql`AND t.slug = ${topicSlug}`
    : Prisma.empty;

  const rows = await prisma.$queryRaw<RawLeaderboardRow[]>`
    WITH attempt_times AS (
      SELECT
        qa.id             AS attempt_id,
        u.username,
        t.slug            AS topic_slug,
        t.name            AS topic_name,
        qa.score,
        qa.total_questions,
        qa.completed_at,
        qa.difficulty,
        COALESCE(SUM(qat.time_taken), 0) AS total_time
      FROM quiz_attempts qa
      JOIN users u ON qa.user_id = u.id
      JOIN topics t ON qa.topic_id = t.id
      LEFT JOIN question_attempts qat ON qat.quiz_attempt_id = qa.id
      WHERE qa.user_id IS NOT NULL
        ${topicFilter}
      GROUP BY qa.id, u.username, t.slug, t.name, qa.difficulty
    )
    SELECT
      RANK() OVER (ORDER BY score DESC, total_time ASC) AS rank,
      username,
      topic_slug,
      topic_name,
      difficulty,
      score,
      total_questions,
      completed_at
    FROM attempt_times
    ORDER BY rank ASC, completed_at DESC
    LIMIT ${limit}
  `;

  return rows.map((row) => ({
    rank: Number(row.rank),
    username: row.username,
    topicSlug: row.topic_slug as LeaderboardEntry['topicSlug'],
    topicName: row.topic_name,
    difficulty: row.difficulty as LeaderboardEntry['difficulty'],
    score: row.score,
    totalQuestions: row.total_questions,
    completedAt: row.completed_at.toISOString(),
  }));
}
