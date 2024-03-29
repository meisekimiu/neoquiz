import { NeoQuiz } from '../src/neoquiz';

describe('Example Quiz: Which MLP Character are you?', () => {
  it('Does the quiz', () => {
    const quiz = new NeoQuiz({
      questions: [
        {
          title: 'What kind of pony are you?',
          answers: [
            {
              text: 'Earth Pony',
              values: {
                applejack: 1,
                pinkie_pie: 1,
              },
            },
            {
              text: 'Pegasus',
              values: {
                rainbow_dash: 1,
                fluttershy: 1,
              },
            },
            {
              text: 'Unicorn',
              values: {
                twilight_sparkle: 0.5,
                rarity: 1,
                starlight: 1,
              },
            },
            {
              text: 'Alicorn',
              values: {
                twilight_sparkle: 2,
              },
            },
            {
              text: "I don't want to be a pony",
              values: {
                discord: 1,
              },
            },
          ],
        },
        {
          title: 'What do you value the most?',
          answers: [
            {
              text: 'Honesty',
              values: {
                applejack: 2,
              },
            },
            {
              text: 'Laughter',
              values: {
                pinkie_pie: 2,
              },
            },
            {
              text: 'Kindness',
              values: {
                fluttershy: 2,
              },
            },
            {
              text: 'Loyalty',
              values: {
                rainbow_dash: 2,
              },
            },
            {
              text: 'Generosity',
              values: {
                rarity: 2,
              },
            },
            {
              text: 'Friendship',
              values: {
                twilight_sparkle: 2,
              },
            },
            {
              text: 'Forgiveness',
              values: {
                starlight: 2,
              },
            },
            {
              text: 'Chaos',
              values: {
                discord: 2,
              },
            },
          ],
        },
        {
          title: 'What do you enjoy doing?',
          answers: [
            {
              text: 'Reading books',
              values: {
                twilight_sparkle: 1,
              },
            },
            {
              text: 'Taking care of animals',
              values: {
                fluttershy: 1,
              },
            },
            {
              text: 'Helping out on the farm',
              values: {
                applejack: 1,
              },
            },
            {
              text: 'Going super fast!',
              values: {
                rainbow_dash: 1,
              },
            },
            {
              text: 'Designing clothing',
              values: {
                rarity: 1,
              },
            },
            {
              text: 'Throwing parties',
              values: {
                pinkie_pie: 1,
              },
            },
            {
              text: 'Causing Chaos',
              values: {
                discord: 1,
              },
            },
            {
              text: 'Flying Kites',
              values: {
                starlight: 1,
              },
            },
          ],
        },
      ],
      results: [
        {
          id: 'twilight_sparkle',
          name: 'Twilight Sparkle',
          description: 'You are Twilight Sparkle. You are the purple horse.',
        },
        {
          id: 'applejack',
          name: 'Applejack',
          description: 'You are Applejack. You are the orange horse.',
        },
        {
          id: 'pinkie_pie',
          name: 'Pinkie Pie',
          description: 'You are Pinkie Pie. You are the pink horse.',
        },
        {
          id: 'rainbow_dash',
          name: 'Rainbow Dash',
          description: 'You are Rainbow Dash. You are the blue horse.',
        },
        {
          id: 'fluttershy',
          name: 'Fluttershy',
          description: 'You are Fluttershy. You are the yellow horse.',
        },
        {
          id: 'rarity',
          name: 'Rarity',
          description: 'You are Rarity. You are the white horse.',
        },
        {
          id: 'discord',
          name: 'Discord',
          description:
            'You are Discord. You are not a horse. Your song blew up on Tiktok a while back.',
        },
        {
          id: 'starlight',
          name: 'Starlight Glimmer',
          description: 'You are Starlight Glimmer. You are the best horse.',
        },
      ],
    });
    quiz.start();
    quiz.answer(2);
    quiz.answer(6);
    quiz.answer(6);
    expect(quiz.result?.name).toBe('Starlight Glimmer');
  });
});
