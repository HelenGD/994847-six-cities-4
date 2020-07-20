import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';

import {SignIn} from './sign-in';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should submit form`, () => {
  const onSubmit = jest.fn();
  const onChange = jest.fn();

  const signInShallow = mount(
      <BrowserRouter>
        <SignIn
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </BrowserRouter>
  );
  signInShallow
    .find(`input[name="email"]`)
    .at(0)
    .simulate(`change`, {target: {value: `Hello`}});

  signInShallow
    .find(`input[name="password"]`)
    .at(0)
    .simulate(`change`, {target: {value: `123`}});

  signInShallow
    .find(`form`)
    .at(0)
    .simulate(`submit`);

  expect(onChange.mock.calls.length).toBe(2);
  expect(onSubmit.mock.calls.length).toBe(1);
});
