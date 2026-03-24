import { Difficulty } from '@prisma/client';
import { prisma } from '../db';
import type { QuestionForQuiz } from '@quizapp/shared';
import { BadRequestError, NotFoundError } from '../utils/errors';

const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 15;

export async function getRandomQuestions(
  topicSlug: string,
  difficulty: Difficulty,
  count: number,
): Promise<QuestionForQuiz[]> {
  if (count < MIN_QUESTIONS || count > MAX_QUESTIONS) {
    throw new BadRequestError(`count must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`);
  }

  const topic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
  if (!topic) {
    throw new NotFoundError(`Topic "${topicSlug}" not found`);
  }

  // ORDER BY RANDOM() happens in PostgreSQL — avoids loading all rows into Node.js memory.
  // The compound index on (topicId, difficulty) makes this fast even as question count grows.
  const questions = await prisma.$queryRaw<
    Array<{
      id: string;
      topic_id: string;
      difficulty: string;
      text: string;
      options: { text: string }[];
    }>
  >`
    SELECT id, topic_id, difficulty::text, text, options
    FROM questions
    WHERE topic_id = ${topic.id}
      AND difficulty::text = ${difficulty}
    ORDER BY RANDOM()
    LIMIT ${count}
  `;

  if (questions.length < count) {
    // Generic message — don't reveal how many questions exist in the DB
    // for this topic/difficulty combination.
    throw new BadRequestError(
      `Not enough questions available for this topic and difficulty. ` +
        `Try a different difficulty or topic.`,
    );
  }

  // correctIndex and explanation are deliberately excluded here.
  // They are only returned in QuizResult after the quiz is submitted.
  return questions.map((q) => ({
    id: q.id,
    topicId: q.topic_id,
    difficulty: q.difficulty as QuestionForQuiz['difficulty'],
    text: q.text,
    options: q.options,
  }));
}
