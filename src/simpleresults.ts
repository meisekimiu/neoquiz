import { Result, ResultStrategy } from './result';

type ValueToResultDict = { [key: string]: string };

export class SimpleResultStrategy implements ResultStrategy {
  protected data: ValueToResultDict;
  protected useResultNamesAsValues: boolean;
  constructor(data?: ValueToResultDict) {
    if (data) {
      this.data = data;
      this.useResultNamesAsValues = false;
    } else {
      this.data = {};
      this.useResultNamesAsValues = true;
    }
  }

  public decideResult(r: Result[], v: Map<string, number>): Result | null {
    let maxValueId = r[0].id;
    let maxPoints = -Infinity;
    let ties = [];
    for (const [id, score] of v.entries()) {
      if (score >= maxPoints) {
        if (score === maxPoints) {
          ties.push(maxValueId);
        } else {
          ties = [];
        }
        maxValueId = id;
        maxPoints = score;
      }
    }
    ties.push(maxValueId);
    maxValueId = ties[Math.floor(Math.random() * ties.length)];
    let chosenId: string;
    if (!this.useResultNamesAsValues && this.data[maxValueId]) {
      chosenId = this.data[maxValueId];
    } else {
      chosenId = maxValueId;
    }
    for (const result of r) {
      if (result.id === chosenId) {
        return result;
      }
    }
    return null;
  }
}
