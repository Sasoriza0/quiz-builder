import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');


  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  console.log('Cleared existing data.');


  const sampleQuiz = await prisma.quiz.create({
    data: {
      title: 'Frontend Developer Fundamentals',
      questions: {
        create: [
          {
            text: 'React uses a Virtual DOM to optimize rendering performance.',
            type: 'boolean',
            correctAnswer: 'true',
          },
          {
            text: 'What does CSS stand for?',
            type: 'input',
            correctAnswer: 'Cascading Style Sheets',
          },
          {
            text: 'Which of the following is NOT a JavaScript framework/library?',
            type: 'checkbox',
            options: '["React", "Angular", "Django", "Vue"]', 
            correctAnswer: 'Django',
          },
        ],
      },
    },
  });

  console.log(`Seed completed! Created quiz: "${sampleQuiz.title}"`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });