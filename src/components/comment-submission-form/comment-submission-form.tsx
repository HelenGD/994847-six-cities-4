import * as React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import {ActionCreator} from '../../reducer/reviews/reviews';
import {isValidReview} from '../../utils';

const ratingFields = [
  {
    value: `5`,
    title: `perfect`
  },
  {
    value: `4`,
    title: `good`
  },
  {
    value: `3`,
    title: `not bad`
  },
  {
    value: `2`,
    title: `badly`
  },
  {
    value: `1`,
    title: `terribly`
  },
];

interface Props {
  values: {
    rating: string;
    review: string;
  };
  onChange: () => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

const CommentSubmissionForm: React.FC<Props> = ({values, onChange, onSubmit, isDisabled}) => {
  return (
    <form onSubmit={onSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingFields.map((rating) => (
          <React.Fragment key={rating.value}>
            <input
              onChange={onChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.value}
              id={`${rating.value}-stars`}
              type="radio"
              checked={values.rating === rating.value}
              disabled={isDisabled}
            />
            <label
              htmlFor={`${rating.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating.title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        onChange={onChange}
        value={values.review}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidReview(values) || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  values: state.reviews.newReview,
  isDisabled: state.reviews.isReviewCreating
});

const mapDispatchToProps = (dispatch, {match}) => ({
  onChange: (evt) => dispatch(ActionCreator.changeFieldReview(evt)),
  onSubmit: (evt) => dispatch(ActionCreator.publishReview(evt, match)),
});

export {CommentSubmissionForm};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSubmissionForm));
