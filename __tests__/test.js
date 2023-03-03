import React from 'react';
import { act } from 'react-test-renderer';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders home screen', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />).toJSON();
  });
  expect(tree).toMatchSnapshot();
});