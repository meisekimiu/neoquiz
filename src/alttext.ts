import { QuizMetaData } from './quizmetadata';
import { Question } from './question';
import { Result } from './result';

interface HasAltText {
  image?: string;
  altText?: string;
}

function getAltText(item: HasAltText, fallback: string): string {
  if (!item.image) {
    return '';
  }
  return item.altText ?? fallback;
}

export function getQuestionAltText(question: Question): string {
  return getAltText(question, question.title);
}

export function getResultAltText(result: Result): string {
  return getAltText(result, result.name);
}

export function getQuizMetaAltText(quiz: QuizMetaData): string {
  return getAltText(quiz, quiz.title);
}
