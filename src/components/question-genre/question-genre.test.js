import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGenre from './question-genre.jsx';

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

it(`Should Question render correctly`, () => {
  const tree = renderer
    .create(<QuestionGenre
      onAnswer={() => { }}
      question={question}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
