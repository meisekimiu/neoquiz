import { Question } from '../src/question';
import { Result } from '../src/result';
import { QuizMetaData } from '../src/quizmetadata';
import {
  getQuestionAltText,
  getQuizMetaAltText,
  getResultAltText,
} from '../src/alttext';
import { NeoQuiz } from '../src/neoquiz';

describe('Alt Text', () => {
  describe('Questions', () => {
    it('should use question title for image alt text as fallback', () => {
      expectAltText(
        {
          title: 'Question Title',
          answers: ['answer'],
          image: 'potato.jpg',
        },
        'Question Title'
      );
    });
    it('should have no alt text if there is no image', () => {
      expectAltText(
        {
          title: 'Question Title',
          answers: ['answer'],
        },
        ''
      );
    });
    it('should use alt text field if it exists', () => {
      expectAltText(
        {
          title: 'Question Title',
          answers: ['answer'],
          image: 'potato.jpg',
          altText: 'A potato',
        },
        'A potato'
      );
    });
    function expectAltText(question: Question, expected: string) {
      expect(getQuestionAltText(question)).toBe(expected);
    }
  });
  describe('Results', () => {
    it('should use result name for image alt text as fallback', () => {
      expectAltText(
        {
          id: 'default',
          name: 'Result Title',
          image: 'potato.jpg',
        },
        'Result Title'
      );
    });
    it('should have no alt text if there is no image', () => {
      expectAltText(
        {
          id: 'default',
          name: 'Result Title',
        },
        ''
      );
    });
    it('should use alt text field if it exists', () => {
      expectAltText(
        {
          id: 'default',
          name: 'Result Title',
          image: 'potato.jpg',
          altText: 'A potato',
        },
        'A potato'
      );
    });
    function expectAltText(result: Result, expected: string) {
      expect(getResultAltText(result)).toBe(expected);
    }
  });
  describe('Quiz Metadata', () => {
    it('should use quiz name for image alt text as fallback', () => {
      expectAltText(
        {
          title: 'Test Quiz',
          description: 'potato quiz',
          image: 'potato.jpg',
        },
        'Test Quiz'
      );
    });
    it('should have no alt text if there is no image', () => {
      expectAltText(
        {
          title: 'Test Quiz',
          description: 'potato quiz',
        },
        ''
      );
    });
    it('should use alt text field if it exists', () => {
      expectAltText(
        {
          title: 'Test Quiz',
          description: 'potato quiz',
          image: 'potato.jpg',
          altText: 'A potato',
        },
        'A potato'
      );
    });
    it('can access it on NeoQuiz object', () => {
      const quiz = new NeoQuiz();
      quiz.addMetaData({
        title: 'Test Quiz',
        description: 'potato quiz',
        image: 'potato.jpg',
        altText: 'A potato',
      });
      expect(quiz.altText).toBe('A potato');
    });
    it('will return with an empty string on undefined metadata', () => {
      const quiz = new NeoQuiz();
      expect(quiz.altText).toBe('');
    });
    function expectAltText(result: QuizMetaData, expected: string) {
      expect(getQuizMetaAltText(result)).toBe(expected);
    }
  });
});
