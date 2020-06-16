import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {RENTAL_OFFERS} from '../../test-mocks/rental-offers';

it(`Render App`, () => {
  const tree = renderer
    .create((
      <App
        offers={RENTAL_OFFERS}
        rentalOffersCount={RENTAL_OFFERS.length}
        rentalOffersNames={RENTAL_OFFERS}
        onHeaderClick={jest.fn()}
      />
    ))
    .toJSON();

  expect(tree).toMatchSnapshot();
});
