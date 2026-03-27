import { PrismaClient } from '@prisma/client';
import { topicsData } from './seeds/topics';
import { reactQuestions } from './seeds/react-questions';
import { angularQuestions } from './seeds/angular-questions';
import { typescriptQuestions } from './seeds/typescript-questions';
import { systemDesignQuestions } from './seeds/system-design-questions';
import { javascriptQuestions } from './seeds/javascript-questions';
import { pythonQuestions } from './seeds/python-questions';
import { csharpQuestions } from './seeds/csharp-questions';
import { dotnetQuestions } from './seeds/dotnet-questions';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // 1. Upsert topics first (questions reference topics via topicId)
  for (const topic of topicsData) {
    await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: topic,
      create: topic,
    });
  }
  console.log(`✅ Seeded ${topicsData.length} topics`);

  // 2. Fetch topic IDs by slug for the question inserts
  const topics = await prisma.topic.findMany();
  const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t.id]));

  // 3. Seed questions per topic
  const questionSets: Array<{ slug: string; questions: typeof reactQuestions }> = [
    { slug: 'react',          questions: reactQuestions },
    { slug: 'angular',        questions: angularQuestions },
    { slug: 'typescript',     questions: typescriptQuestions },
    { slug: 'system-design',  questions: systemDesignQuestions },
    { slug: 'javascript',     questions: javascriptQuestions },
    { slug: 'python',         questions: pythonQuestions },
    { slug: 'csharp',         questions: csharpQuestions },
    { slug: 'dotnet',         questions: dotnetQuestions },
  ];

  for (const { slug, questions } of questionSets) {
    const topicId = topicBySlug[slug];
    if (!topicId) {
      console.error(`❌ Topic not found for slug: ${slug}`);
      continue;
    }

    // Delete existing questions for this topic and re-insert
    // Simpler than upsert (questions have no natural unique key beyond their text)
    await prisma.question.deleteMany({ where: { topicId } });
    await prisma.question.createMany({
      data: questions.map((q) => ({
        topicId,
        difficulty: q.difficulty,
        text: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      })),
    });
    console.log(`✅ Seeded ${questions.length} questions for "${slug}"`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
