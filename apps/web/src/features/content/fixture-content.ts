import { lessonSchema, type Lesson } from './schema';

const demoLessonRecords = [
  {
    id: 'demo-welcome',
    unitId: 'demo-unit',
    title: 'Demo lesson',
    vocabulary: [
      {
        id: 'demo',
        word: 'demo',
        meaning: 'bản minh hoạ',
        example: 'This is a demo.',
      },
    ],
    sentencePatterns: [
      {
        id: 'demo-pattern',
        pattern: 'This is a demo.',
        meaning: 'Đây là phần minh hoạ.',
      },
    ],
  },
];

export const fixtureLessons: Lesson[] = demoLessonRecords.map((record) =>
  lessonSchema.parse(record),
);
