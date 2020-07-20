import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {SignIn} from './sign-in';

it(`Should SignIn render correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <SignIn onSubmit={jest.fn()} onChange={jest.fn()}/>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
