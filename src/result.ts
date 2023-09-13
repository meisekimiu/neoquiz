export interface Result {
  id: string;
  name: string;
  description?: string;
  image?: string;
  imageAttribution?: string;
  altText?: string;
}

// what is this, an enterprise Java application????
export interface ResultStrategy {
  decideResult(r: Result[], v: Map<string, number>): Result | null;
}
