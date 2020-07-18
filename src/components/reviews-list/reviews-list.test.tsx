import React from 'react';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import reducer from '../../reducer/combine-reducer';
import {Reviews} from '../../test-mocks/reviews';
import {ReviewsList} from './reviews-list';

const store = createStore(reducer);

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer.create((
    <Provider store={store}>
      <BrowserRouter>
        <ReviewsList reviews={Reviews} authorizationStatus={`AUTH`} />
      </BrowserRouter>
    </Provider>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});

