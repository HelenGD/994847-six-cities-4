import {isValidReview} from "../../utils";
import {createReview, fetchComments} from "../../api";
import {ActionCreator as DataActionCreator} from "../data/data";

const initialState = {
  newReview: {
    rating: ``,
    review: ``,
  },
  reviews: [],
  isReviewCreating: false,
};

const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`,
  CHANGE_FIELD_REVIEW: `CHANGE_FIELD_REVIEW`,
  SET_REVIEW_CREATING: `SET_REVIEW_CREATING`,
};

const ActionCreator = {
  setReviewCreating: (isReviewCreating) => ({
    type: ActionType.SET_REVIEW_CREATING,
    payload: isReviewCreating
  }),
  changeFieldReview: (evt) => ({
    type: ActionType.CHANGE_FIELD_REVIEW,
    payload: {
      value: evt.target.value,
      field: evt.target.name,
    }
  }),
  getReviews: (offerId) => (dispatch) => {
    fetchComments(offerId)
      .then((reviews) => {
        dispatch(ActionCreator.setReviews(reviews));
      })
      .catch(() => {
        dispatch(ActionCreator.setError(true));
      });
  },
  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews,
  }),
  publishReview: (evt, match) => (dispatch, getState) => {
    const {reviews} = getState();

    evt.preventDefault();

    if (!isValidReview(reviews.newReview) || reviews.isReviewCreating) {
      return;
    }

    dispatch(ActionCreator.setReviewCreating(true));
    createReview(
        match.params.id,
        reviews.newReview.rating,
        reviews.newReview.review
    )
      .then((newReviews) => {
        dispatch(ActionCreator.setReviews(newReviews));
        dispatch(ActionCreator.setReviewCreating(false));
      })
      .catch(() => {
        dispatch(DataActionCreator.setError(true));
        dispatch(ActionCreator.setReviewCreating(false));
      });
  },
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
        newReview: {
          rating: ``,
          review: ``,
        },
      });
    case ActionType.CHANGE_FIELD_REVIEW:
      return Object.assign({}, state, {
        newReview: Object.assign({}, state.newReview, {
          [action.payload.field]: action.payload.value,
        }),
      });
    case ActionType.SET_REVIEW_CREATING:
      return Object.assign({}, state, {
        isReviewCreating: action.payload,
      });
    default:
      return state;
  }
};

export {reviewsReducer, ActionCreator};
