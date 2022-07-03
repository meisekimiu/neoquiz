import { NeoQuizUi } from './neoquiz-ui';
import { Question, QuestionAnswer } from './question';
import { Result, ResultStrategy } from './result';
import { SimpleResultStrategy } from './simpleresults';

export interface QuizMetaData {
  title: string;
  description: string;
  image?: string;
  imageAttribution?: string;
  startText?: string;
}

export interface QuizData {
  questions: Question[];
  results: Result[];
  metadata?: QuizMetaData;
}

export enum QuizState {
  WAITING,
  IN_PROGRESS,
  FINISHED,
}

export class NeoQuiz {
  protected questions: Question[] = [];
  protected results: Result[] = [];
  protected resultStrategies: ResultStrategy[] = [];
  protected state: QuizState = QuizState.WAITING;
  protected finalResult: Result | null = null;
  protected metadata: QuizMetaData | undefined;
  protected ui: NeoQuizUi | undefined;

  protected values: Map<string, number> = new Map<string, number>();
  protected _currentQuestion: number = 0;

  get numberOfQuestions(): number {
    return this.questions.length;
  }

  get currentQuestionNumber(): number {
    return this._currentQuestion;
  }

  get currentQuestion(): Question {
    return this.questions[this._currentQuestion];
  }

  get currentState(): QuizState {
    return this.state;
  }

  get started(): boolean {
    return this.state !== QuizState.WAITING;
  }

  get finished(): boolean {
    return this.state === QuizState.FINISHED;
  }

  get result(): Result | null {
    return this.finalResult as Result;
  }

  get title(): string {
    return this.metadata?.title ?? 'Untitled Quiz';
  }

  get description(): string {
    return this.metadata?.description ?? '';
  }

  get image(): string | undefined {
    return this.metadata?.image;
  }

  get imageAttribution(): string | undefined {
    return this.metadata?.imageAttribution;
  }

  get uiStartText(): string {
    return this.metadata?.startText ?? 'Start';
  }

  constructor(data?: QuizData) {
    if (data) {
      for (const q of data.questions) {
        this.addQuestion(q);
      }
      for (const r of data.results) {
        this.addResult(r);
      }
      if (data.metadata) {
        this.metadata = data.metadata;
      }
    }
  }

  public addMetaData(metadata: QuizMetaData): void {
    this.metadata = metadata;
  }

  public addQuestion(question: Question): void {
    this.questions.push(question);
  }

  public addResult(result: Result): void {
    for (const r of this.results) {
      if (r.id === result.id) {
        throw new Error(
          `Duplicate Quiz Result with id "${result.id}" added! Quiz Results must have unique IDs and can't be added twice!`
        );
      }
    }
    this.results.push(result);
  }

  public addResultStrategy(strategy: ResultStrategy): void {
    this.resultStrategies.push(strategy);
  }

  public addResultFunction(
    func: (r: Result[], v: Map<string, number>) => Result
  ): void {
    this.resultStrategies.push({
      decideResult: func,
    });
  }

  public bindTo(node: Element): void {
    this.ui = new NeoQuizUi(node, this);
    this.render();
  }

  public start(): void {
    if (this.questions.length === 0) {
      throw new Error('Cannot start a quiz with no questions!');
    }
    if (this.results.length === 0) {
      throw new Error('Cannot start a quiz with no results!');
    }
    if (this.resultStrategies.length === 0) {
      this.resultStrategies.push(new SimpleResultStrategy());
    }
    this.state = QuizState.IN_PROGRESS;
    this._currentQuestion = 0;
    this.finalResult = null;
    this.values = new Map<string, number>();
    this.render();
  }

  public answer(answerNumber: number | number[]): void {
    if (this.state !== QuizState.IN_PROGRESS) {
      throw new Error(
        'You cannot answer a question to a quiz that is not in progress!'
      );
    }
    if (Array.isArray(answerNumber)) {
      if (!this.questions[this._currentQuestion].multipleChoice) {
        throw new Error(
          'You cannot answer this question with multiple choices.'
        );
      }
      for (const x of answerNumber) {
        this.registerAnswerValues(x);
      }
    } else {
      this.registerAnswerValues(answerNumber);
    }
    this._currentQuestion++;
    if (this._currentQuestion >= this.questions.length) {
      this.decideResults();
    }
    this.render();
  }

  protected decideResults(): void {
    for (const s of this.resultStrategies) {
      const r = s.decideResult(this.results, this.values);
      if (r !== null) {
        this.finalResult = r;
      }
    }
    if (this.finalResult === null) {
      // Fallback in case no ResultStrategies worked:
      this.finalResult = this.results[0];
    }
    this.state = QuizState.FINISHED;
  }

  protected registerAnswerValues(answerNumber: number): void {
    const answer = this.questions[this._currentQuestion].answers[answerNumber];
    if (typeof answer === 'string') {
      // This is a null answer, probably just for fun, so we don't have to process any values here!
    } else {
      for (const n in answer.values) {
        if (!this.values.has(n)) {
          this.values.set(n, answer.values[n]);
        } else {
          const value = (this.values.get(n) as number) + answer.values[n];
          this.values.set(n, value);
        }
      }
    }
  }

  protected render(): void {
    if (this.ui) {
      this.ui.render();
    }
  }
}
