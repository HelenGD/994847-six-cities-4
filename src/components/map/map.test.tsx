import React from 'react';
import renderer from 'react-test-renderer';

import {allOffers} from '../../test-mocks/all-offers';
import {location} from '../../test-mocks/location';
import {Map} from './map';

it(`Should render Map correctly`, () => {
  const tree = renderer
    .create((
      <Map
        hoverOffer={null}
        currentLocation={location}
        offers={allOffers[0].offers}
      />
    ))
    .toJSON();

  expect(tree).toMatchSnapshot();
});

