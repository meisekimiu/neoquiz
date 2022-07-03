import { NeoQuiz, QuizState } from './neoquiz';
import { QuestionAnswer } from './question';

export class NeoQuizUi {
  protected selectedMultipleChoices: number[] = [];

  constructor(protected root: Element, protected quiz: NeoQuiz) {
    root.classList.add('neoquiz');
    this.render();
  }

  public render(): void {
    switch (this.quiz.currentState) {
      case QuizState.WAITING:
        this.renderStartScreen();
        return;
      case QuizState.IN_PROGRESS:
        this.renderCurrentQuestion();
        return;
      case QuizState.FINISHED:
        this.renderResults();
        return;
    }
  }

  protected renderStartScreen(): void {
    this.clear();
    this.appendElement('h2', this.quiz.title);
    if (this.quiz.image) {
      this.appendElement('img', undefined, {
        src: this.quiz.image,
      });
    }
    this.appendElement('p', this.quiz.description);
    const startButton = this.appendElement(
      'button',
      this.quiz.uiStartText,
      {},
      ['start-button']
    );
    startButton.addEventListener('click', () => {
      this.quiz.start();
    });
  }

  protected renderCurrentQuestion(): void {
    this.clear();
    this.appendElement('h2', this.quiz.title);
    if (this.quiz.currentQuestion.image) {
      this.appendElement('img', undefined, {
        src: this.quiz.currentQuestion.image,
      });
    }
    {
      const questionContainer = this.appendElement('div', undefined, {}, [
        'quiz-question',
      ]);
      const quizProgressContainer = this.appendElement(
        'div',
        'Question ',
        {},
        ['quiz-numbers'],
        questionContainer
      );
      this.appendElement(
        'span',
        (this.quiz.currentQuestionNumber + 1).toString(),
        {},
        ['current-number'],
        quizProgressContainer
      );
      this.appendElement('span', ' of ', {}, ['of'], quizProgressContainer);
      this.appendElement(
        'span',
        this.quiz.numberOfQuestions.toString() + ':',
        {},
        ['total-number'],
        quizProgressContainer
      );
      this.appendElement(
        'h3',
        this.quiz.currentQuestion.title,
        {},
        [],
        questionContainer
      );
    }

    const quizAnswers = this.appendElement('div', undefined, {}, [
      'quiz-answers',
    ]);
    for (let i = 0; i < this.quiz.currentQuestion.answers.length; i++) {
      this.appendAnswer(this.quiz.currentQuestion.answers[i], i, quizAnswers);
    }
    if (this.quiz.currentQuestion.multipleChoice) {
      const nextButton = this.appendElement(
        'button',
        'Next',
        { disabled: 'disabled' },
        ['next-button'],
        quizAnswers
      );
      nextButton.addEventListener('click', () => {
        if (this.selectedMultipleChoices.length > 0) {
          this.quiz.answer(this.selectedMultipleChoices);
          this.selectedMultipleChoices = [];
        }
      });
    }
  }

  protected renderResults(): void {
    this.clear();
    this.appendElement('h2', this.quiz.title);
    const resultsContainer = this.appendElement(
      'div',
      undefined,
      {
        style: 'text-align: center',
      },
      ['results-container']
    );
    if (this.quiz.result?.image) {
      this.appendElement(
        'img',
        undefined,
        {
          src: this.quiz.result.image,
        },
        [],
        resultsContainer
      );
    }
    this.appendElement('h3', this.quiz.result?.name, {}, [], resultsContainer);
    this.appendElement(
      'p',
      this.quiz.result?.description,
      {},
      [],
      resultsContainer
    );
    this.appendElement(
      'a',
      this.quiz.title,
      {
        href: window.location.href,
      },
      [],
      resultsContainer
    );
    this.appendElement('p', 'Share this result (HTML):', {}, ['share-html']);
    this.appendElement('textarea', resultsContainer.outerHTML);
    const retakeBtn = this.appendElement('button', 'Retake this quiz!', {}, [
      'retake-quiz',
    ]);
    retakeBtn.addEventListener('click', () => {
      this.quiz.start();
    });
  }

  protected clear(): void {
    this.root.innerHTML = '';
  }

  protected appendElement(
    tagname: keyof HTMLElementTagNameMap,
    innerText?: string,
    attributes?: { [key: string]: string },
    classNames?: string[],
    parent: Element = this.root
  ): HTMLElement {
    const element = document.createElement(tagname);
    if (innerText) {
      element.innerText = innerText;
    }
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    if (classNames) {
      for (const c of classNames) {
        element.classList.add(c);
      }
    }
    parent.appendChild(element);
    return element;
  }

  protected appendAnswer(
    answer: QuestionAnswer | string,
    index: number,
    element: Element
  ): void {
    const isMultipleChoice = !!this.quiz.currentQuestion.multipleChoice;
    const answerText: string =
      typeof answer === 'string' ? answer : answer.text;
    const answerLabel = document.createElement('label');
    answerLabel.setAttribute('for', `answer-${index}`);
    const answerContainer = this.appendElement(
      'div',
      undefined,
      {},
      ['answer'],
      answerLabel
    );
    this.appendElement('span', answerText, {}, [], answerContainer);
    const input = this.appendElement(
      'input',
      undefined,
      {
        type: isMultipleChoice ? 'checkbox' : 'radio',
        name: 'answer',
        value: index.toString(),
        id: `answer-${index}`,
      },
      ['single-choice-input'],
      answerContainer
    );
    if (!isMultipleChoice) {
      input.addEventListener('change', () => {
        this.quiz.answer(index);
      });
    } else {
      input.addEventListener('change', (event) => {
        if ((event.target as HTMLInputElement).checked) {
          this.selectedMultipleChoices.push(index);
        } else {
          this.selectedMultipleChoices = this.selectedMultipleChoices.filter(
            (x) => x !== index
          );
        }
        const nextButton = element.querySelector('.next-button');
        if (nextButton) {
          if (this.selectedMultipleChoices.length === 0) {
            nextButton.setAttribute('disabled', 'disabled');
          } else {
            nextButton.removeAttribute('disabled');
          }
        }
      });
    }

    element.appendChild(answerLabel);
  }
}
