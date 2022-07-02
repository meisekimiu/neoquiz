export interface Question {
  title: string;
  answers: (QuestionAnswer | string)[];
  multipleChoice?: boolean;
  image?: string;
}

export interface QuestionAnswer {
  text: string;
  values: { [key: string]: number };
}
