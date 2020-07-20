import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/ui/ui";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Offer} from '../../types/offer';
import {convertRatingToPercent} from '../../utils';

const ACTIVE_CLASS_NAME = `place-card__bookmark-button--active`;

interface Props extends Offer {
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  onFavoriteClick: (id: number, isBookmark: boolean) => void;
  authorizationStatus: string;
}

const OfferCard: React.FC<Props> = (props) => {
  const {
    id,
    img,
    price,
    rating,
    name,
    type,
    isPremium,
    isBookmark,
    onMouseEnter,
    onMouseLeave,
    onFavoriteClick,
    authorizationStatus
  } = props;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {authorizationStatus === `NO_AUTH` ? (
            <Link to={{pathname: `/sign-in/`}}>
              <button className={`place-card__bookmark-button button ${isBookmark ? ACTIVE_CLASS_NAME : ``}`}
                type="button"
              >
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </Link>
          ) : (
            <button className={`place-card__bookmark-button button ${isBookmark ? ACTIVE_CLASS_NAME : ``}`}
              onClick={() => onFavoriteClick(id, !isBookmark)}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>)
          }</div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertRatingToPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{pathname: `/offer/${id}`}}>
            {name}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.user.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onMouseEnter(offer) {
    dispatch(ActionCreator.activeOfferLocation(offer));
  },
  onMouseLeave() {
    dispatch(ActionCreator.activeOfferLocation(null));
  },
  onFavoriteClick(id, isBookmark) {
    dispatch(DataActionCreator.changeStatusFavorites(id, isBookmark));
  }
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);

