import * as React from 'react';
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {createSelector} from 'reselect';

import {ActionCreator} from '../../reducer/reviews/reviews';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data';
import {Offer} from '../../types/offer';
import {convertRatingToPercent} from '../../utils';
import {OfferTypesDisplay} from '../../constants';
import ReviewsList from '../reviews-list/reviews-list';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import Auth from '../auth/auth';

const MAX_COUNT_IMAGES = 6;
const MAX_OFFERS_NEARBY_COUNT = 3;
const ACTIVE_CLASS_NAME = `place-card__bookmark-button--active`;

interface Props {
  onDidMount: () => void;
  authorizationStatus: string;
  onFavoriteClick: (id: number, isBookmark: boolean) => void;
  offers: Offer[];
  offer: Offer;
}

class OfferDetails extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.onDidMount();
  }
  render() {
    const {
      offers,
      offer,
      onFavoriteClick,
      authorizationStatus
    } = this.props;

    if (!offer) {
      return <Redirect to="/" />;
    }

    const {
      id,
      price,
      imgDetails,
      name,
      ratingDetails,
      type,
      roomCountDetails,
      maxGuestsDetails,
      featuresDetails,
      host: {photo, hostName, isSuper},
      description,
      rating,
      isPremium,
      isBookmark,
    } = offer;
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <Auth />
            </div>
          </div>
        </header>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {imgDetails
              .slice(0, MAX_COUNT_IMAGES)
              .map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{name}</h1>
                  {authorizationStatus === `NO_AUTH` ?
                    (<Link to={{pathname: `/sign-in/`}}>
                      <button
                        className={`property__bookmark-button button ${isBookmark ? ACTIVE_CLASS_NAME : ``}`}
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="31" height="33">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </Link>) : (
                      <button
                        onClick={() => onFavoriteClick(id, !isBookmark)}
                        className={`property__bookmark-button button ${isBookmark ? ACTIVE_CLASS_NAME : ``}`}
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="31" height="33">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    )}
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: convertRatingToPercent(rating)}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{ratingDetails}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {OfferTypesDisplay[type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {roomCountDetails} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {maxGuestsDetails} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {featuresDetails.map((feature, index) => (
                      <li key={index} className="property__inside-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper ${isSuper ? `property__avatar-wrapper--pro` : ``}`}>
                      <img className="property__avatar user__avatar" src={photo} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {hostName}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <ReviewsList />
              </div>
            </div>
            <section className="property__map map" style={{display: `flex`}}>
              <Map
                offers={offers}
                activeOffer={offer}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {offers.map((itemOffer, index) => (
                  <OfferCard key={index} {...itemOffer} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

const offersSelector = createSelector(
    [
      ({state}) => state.data.allOffers,
      ({offerId, state}) => state.data.allOffers
      .find(({id}) => id === offerId),
      ({state}) => state.data.currentLocation.city,
    ],
    (allOffers, offer, currentLocation) => allOffers
  .filter(({location, id}) => offer
    ? location.city === offer.location.city && offer.id !== id
    : location.city === currentLocation.city
  )
  .slice(0, MAX_OFFERS_NEARBY_COUNT),
);

const mapStateToProps = (state, {match}) => {
  const offerId = Number(match.params.id);
  const offer = state.data.allOffers
    .find(({id}) => id === offerId);

  return {
    offers: offersSelector({state, offerId}),
    offer,
    authorizationStatus: state.user.authorizationStatus,
  };
};

const mapDispatchToProps = (dispatch, {match}) => ({
  onDidMount: () => dispatch(ActionCreator.getReviews(match.params.id)),
  onFavoriteClick: (id, isBookmark) => {
    dispatch(DataActionCreator.changeStatusFavorites(id, isBookmark));
  }
});

export {OfferDetails};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferDetails));
