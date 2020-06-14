import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const Settings = {
  ERROR_COUNT: 3
};

it(`Render App`, () => {
  const tree = renderer
    .create(<App errorCount={Settings.ERROR_COUNT} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

