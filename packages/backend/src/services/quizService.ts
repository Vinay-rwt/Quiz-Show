import { prisma } from '../db';
import type { QuizSubmitPayload, QuizResult } from '@quizapp/shared';
import { NotFoundError, BadRequestError } from '../utils/errors';

export async function scoreAndPersistQuiz(
  payload: QuizSubmitPayload,
  userId?: string,
): Promise<QuizResult> {
  const { topicSlug, difficulty, answers } = payload;

  if (!answers || answers.length === 0) {
    throw new BadRequestError('No answers provided');
  }

  // Fetch the topic
  const topic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
  if (!topic) throw new NotFoundError(`Topic "${topicSlug}" not found`);

  // Fetch the real questions (with correctIndex and explanation) for scoring
  const questionIds = answers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
  });

  if (questions.length !== answers.length) {
    throw new BadRequestError('One or more question IDs are invalid');
  }

  // Map for O(1) lookup
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  // Score each answer
  let score = 0;
  const correctAnswers: number[] = [];
  const explanations: string[] = [];
  const correctIndices: number[] = [];

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    const question = questionMap.get(answer.questionId);
    if (!question) continue;

    const isCorrect = answer.selectedIndex === question.correctIndex;
    if (isCorrect) {
      score++;
      correctAnswers.push(i);
    }

    explanations.push(question.explanation);
    correctIndices.push(question.correctIndex);
  }

  // Only persist to DB for authenticated users
  let attemptId: string | undefined;

  if (userId) {
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        topicId: topic.id,
        difficulty,
        score,
        totalQuestions: answers.length,
        questionAttempts: {
          create: answers.map((answer) => ({
            questionId: answer.questionId,
            selectedIndex: answer.selectedIndex,
            timeTaken: answer.timeTaken,
            isCorrect: answer.selectedIndex === questionMap.get(answer.questionId)!.correctIndex,
          })),
        },
      },
    });
    attemptId = attempt.id;
  }

  return {
    score,
    totalQuestions: answers.length,
    correctAnswers,
    explanations,
    correctIndices,
    ...(attemptId ? { attemptId } : {}),
  };
}
