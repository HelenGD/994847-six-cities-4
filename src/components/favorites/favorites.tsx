import * as React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {ActionCreator as DataActionCreator} from '../../reducer/data/data';
import {ActionCreator} from '../../reducer/favorites/favorites';
import {Offer, OfferLocation} from '../../types/offer';
import {convertRatingToPercent} from '../../utils';
import NoFavorites from '../no-favorites/no-favorites';
import Auth from '../auth/auth';

interface Props {
  onDidMount: () => void,
  offers: {
    location: OfferLocation;
    offers: Offer[];
  }[];
  onRemove: (id: number) => void;
  onChangeLocation: (location: OfferLocation) => void;
}

class Favorites extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.onDidMount();
  }
  render() {
    const {offers, onRemove, onChangeLocation} = this.props;
    return (
      <div className="page">

        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/">
                  <a className="header__logo-link" href="main.html">
                    <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                  </a>
                </Link>
              </div>
              <Auth />
            </div>
          </div>
        </header>
        <main className="page__main page__main--favorites">
          {offers.length ? (<div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {offers.map((offer) => offer.offers.length > 0 && (
                  <li key={offer.location.city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          className="locations__item-link"
                          to="/"
                          onClick={() => onChangeLocation(offer.location)}
                        >
                          <span>{offer.location.city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offer.offers.map((cityOffer) => (
                        <article key={cityOffer.id}className="favorites__card place-card">
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to={{pathname: `/offer/${cityOffer.id}`}}>
                              <img className="place-card__image" src={cityOffer.img} width="150" height="110" alt="Place image" />
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{cityOffer.price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <button onClick={() => onRemove(cityOffer.id)}className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                  <use xlinkHref="#icon-bookmark"></use>
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{width: convertRatingToPercent(cityOffer.rating)}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to={{pathname: `/offer/${cityOffer.id}`}}>
                                {cityOffer.name}
                              </Link>
                            </h2>
                            <p className="place-card__type">{cityOffer.type}</p>
                          </div>
                        </article>))}
                    </div>
                  </li>
                ))}</ul>
            </section>
          </div>) :
            <NoFavorites/>}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  offers: state.favorites.offers,
});

const mapDispatchToProps = {
  onDidMount: ActionCreator.loadFavoritesOffers,
  onRemove: ActionCreator.changeStatusFavorites,
  onChangeLocation: DataActionCreator.changeLocation,
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

