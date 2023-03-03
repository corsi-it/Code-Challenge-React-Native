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

test('renders loader when fetching data', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />).toJSON();
  });
  expect(tree).toMatchSnapshot();
});

test('renders data list', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />).toJSON();
  });
  expect(tree).toMatchSnapshot();
});

test('navigates to detail screen when an item is clicked', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  const instance = tree.root;
  const dataList = instance.findByProps({ 'data-testid': 'data-list' });
  await act(async () => {
    dataList.props.onPress(dataList.props.data[0]);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

test('renders back button on detail screen', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  const instance = tree.root;
  const dataList = instance.findByProps({ 'data-testid': 'data-list' });
  await act(async () => {
    dataList.props.onPress(dataList.props.data[0]);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

test('navigates back to home screen when back button is clicked', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  const instance = tree.root;
  const dataList = instance.findByProps({ 'data-testid': 'data-list' });
  await act(async () => {
    dataList.props.onPress(dataList.props.data[0]);
  });
  const detailScreen = instance.findByProps({ 'data-testid': 'detail-screen' });
  const backButton = instance.findByProps({ 'data-testid': 'back-button' });
  await act(async () => {
    backButton.props.onPress();
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

test('pagination limits number of items shown', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  const instance = tree.root;
  const dataList = instance.findByProps({ 'data-testid': 'data-list' });
  await act(async () => {
    fireEvent.scroll(dataList, { nativeEvent: { contentOffset: { y: 1000 } } });
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
