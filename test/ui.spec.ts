import { NeoQuiz } from '../src/neoquiz';
import { Question } from '../src/question';
import { Result } from '../src/result';

const questions: Question[] = [
  {
    title: 'Single Choice Question',
    answers: [
      {
        text: 'A',
        values: {
          a: 1,
        },
      },
      {
        text: 'B',
        values: {
          b: 1,
        },
      },
      {
        text: 'C',
        values: {
          c: 1,
        },
      },
      {
        text: 'D',
        values: {
          d: 1,
        },
      },
    ],
  },
  {
    title: 'Multiple Choice Question',
    multipleChoice: true,
    answers: [
      {
        text: 'A',
        values: {
          a: 1,
        },
      },
      {
        text: 'B',
        values: {
          b: 1,
        },
      },
      {
        text: 'C',
        values: {
          c: 1,
        },
      },
      {
        text: 'D',
        values: {
          d: 1,
        },
      },
    ],
  },
];

const results: Result[] = [
  {
    id: 'a',
    name: 'A',
    description: 'You got A',
  },
  {
    id: 'b',
    name: 'B',
    description: 'You got B',
  },
  {
    id: 'c',
    name: 'C',
    description: 'You got C',
  },
  {
    id: 'd',
    name: 'D',
    description: 'You got D',
  },
];

describe('NeoQuiz UI', () => {
  it('should be able to bind to a container', () => {
    const quiz = new NeoQuiz({
      questions,
      results,
      metadata: {
        title: 'Untitled Quiz',
        description: 'This is a test quiz',
      },
    });
    const element = document.createElement('div');
    quiz.bindTo(element);
    expect(element.querySelector('h2')?.innerText).toContain('Untitled Quiz');
  });
});
