import React from 'react';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import reducer from '../../reducer/combine-reducer';
import Main from './main';

const store = createStore(reducer);

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create((
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    )).toJSON();

  expect(tree).toMatchSnapshot();
});
