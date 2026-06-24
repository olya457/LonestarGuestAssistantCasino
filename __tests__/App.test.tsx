/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('../src/screens/LoaderScreen', () => {
  const MockReact = require('react');
  const {View} = require('react-native');
  return {
    LoaderScreen: () => MockReact.createElement(View),
  };
});

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(() => {
    renderer?.unmount();
  });
});
