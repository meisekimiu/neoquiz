/*
  Source: https://stackoverflow.com/a/2450976/3128058
  CC-BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
*/
export function shuffle(array: number[]): number[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
