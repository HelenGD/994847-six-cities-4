import * as React from 'react';
import {connect} from "react-redux";

import {Offer, OfferLocation} from '../../types/offer';
import {getOffersByCity, getSortedOffers} from '../../utils';
import OffersList from '../offers-list/offers-list';
import Sorting from '../sorting/sorting';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import NoOffers from '../no-offers/no-offers';
import Error from '../error/error';
import Auth from '../auth/auth';

interface Props {
  offers: Offer[];
  currentLocation: OfferLocation;
}

const Main: React.FC<Props> = (props) => {
  const {offers, currentLocation} = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <Auth />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          {offers.length
            ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {`${offers.length} place${offers.length !== 1 ? `s` : ``} to stay in ${currentLocation.city}`}
                  </b>
                  <Sorting />
                  <OffersList offers={offers} />
                </section>
                <div className="cities__right-section">
                  <Map offers={offers} />
                </div>
              </div>
            )
            : <NoOffers/>
          }
        </div>
        <Error />
      </main>
    </div>
  );
};

const mapStateToProps = ({data, ui}) => ({
  currentLocation: data.currentLocation,
  offers: getSortedOffers(
      getOffersByCity(data.allOffers, data.currentLocation.city),
      ui.currentSortType
  )
});

export {Main};
export default connect(mapStateToProps)(Main);

