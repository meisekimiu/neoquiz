import { NeoQuiz } from '../src/neoquiz';
import { Question } from '../src/question';
import { Result } from '../src/result';
import { SimpleResultStrategy } from '../src/simpleresults';

const exampleQuestion: Question = {
  title: 'Will this test pass?',
  answers: [
    {
      text: 'Yes',
      values: {
        confidence: 1,
      },
    },
    {
      text: 'No',
      values: {
        confidence: -1,
        wrongness: 1,
      },
    },
  ],
  multipleChoice: false,
  image: 'flippy.jpg',
};

const exampleResults: Result[] = [
  {
    id: 'passing',
    name: 'Passing Tests',
    description:
      'Omg our tests are passing! Make sure to share this on social media! LOL',
    image: 'green.jpg',
  },
  {
    id: 'failing',
    name: 'Failing Tests',
    description: 'our tests are failing :(',
    image: 'red.jpg',
  },
];

const exampleSimpleMap = {
  confidence: 'passing',
  wrongness: 'failing',
};

describe('NeoQuiz', () => {
  let quiz: NeoQuiz;
  beforeEach(() => {
    exampleQuestion.multipleChoice = false;
    quiz = new NeoQuiz();
  });
  it('should exist', () => {
    expect(quiz.numberOfQuestions).toBe(0);
  });
  it('should let you add questions', () => {
    quiz.addQuestion(exampleQuestion);
    expect(quiz.numberOfQuestions).toBe(1);
    quiz.addQuestion(exampleQuestion);
    expect(quiz.numberOfQuestions).toBe(2);
  });
  it('should let you add results', () => {
    quiz.addResult(exampleResults[0]);
    quiz.addResult(exampleResults[1]);
    expect(() => {
      quiz.addResult(exampleResults[0]);
    }).toThrow();
  });
  it('should let you add a results strategy', () => {
    quiz.addResultStrategy(new SimpleResultStrategy(exampleSimpleMap));
  });
  describe('should not let you start the quiz in invalid state', () => {
    test('Null', () => {
      expect(() => {
        quiz.start();
      }).toThrow();
    });
    test('No questions', () => {
      quiz.addResult(exampleResults[0]);
      quiz.addResultStrategy(new SimpleResultStrategy(exampleSimpleMap));
      expect(() => {
        quiz.start();
      }).toThrow();
    });
    test('No results', () => {
      quiz.addQuestion(exampleQuestion);
      quiz.addResultStrategy(new SimpleResultStrategy(exampleSimpleMap));
      expect(() => {
        quiz.start();
      }).toThrow();
    });
  });
  it('should allow multiple choice answers', () => {
    const mcQuestion = Object.assign({}, exampleQuestion);
    mcQuestion.multipleChoice = true;
    quiz.addQuestion(mcQuestion);
    quiz.addQuestion(exampleQuestion);
    quiz.addResult(exampleResults[0]);
    quiz.addResult(exampleResults[1]);
    quiz.start();
    quiz.answer([0, 1]);
    expect(() => {
      quiz.answer([0, 1]);
    }).toThrow();
  });
  it('should let you start the quiz and take it', () => {
    quiz.addQuestion(exampleQuestion);
    quiz.addQuestion(exampleQuestion);
    quiz.addResult(exampleResults[0]);
    quiz.addResult(exampleResults[1]);
    quiz.addResultStrategy(new SimpleResultStrategy(exampleSimpleMap));
    expect(quiz.started).toBeFalsy();
    expect(quiz.finished).toBeFalsy();
    quiz.start();
    expect(quiz.started).toBeTruthy();
    expect(quiz.finished).toBeFalsy();
    expect(quiz.currentQuestionNumber).toBe(0);
    quiz.answer(0);
    expect(quiz.currentQuestionNumber).toBe(1);
    quiz.answer(0);
    expect(quiz.finished).toBeTruthy();
    const result = quiz.result as Result;
    expect(result.name).toBe('Passing Tests');
    expect(() => {
      quiz.answer(0);
    }).toThrow();
  });
});
