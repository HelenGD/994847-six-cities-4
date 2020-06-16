export const RENTAL_OFFERS = [
  {
    id: 1,
    img: `img/apartment-01.jpg`,
    price: 100,
    rating: `95%`,
    name: `Beautiful luxurious apartment at great location`,
    type: `hostel`,
    isPremium: true,
    isBookmark: false,
  },

  {
    id: 2,
    img: `img/apartment-02.jpg`,
    price: 193,
    rating: `60%`,
    name: `Canal View Prinsengracht`,
    type: `apartment`,
    isPremium: true,
    isBookmark: true,
  },

  {
    id: 3,
    img: `img/apartment-03.jpg`,
    price: 250,
    rating: `16%`,
    name: `Nice, cozy, warm big bed apartment`,
    type: `hotel`,
    isPremium: false,
    isBookmark: false,
  },

  {
    id: 4,
    img: `img/apartment-01.jpg`,
    price: 50,
    rating: `75%`,
    name: `Wood and stone place`,
    type: `house`,
    isPremium: false,
    isBookmark: true
  }
];

export const RENTAL_OFFER = {
  id: 1,
  img: `img/apartment-01.jpg`,
  price: 100,
  rating: `95%`,
  name: `Beautiful luxurious apartment at great location`,
  type: `hostel`,
  isPremium: true,
  isBookmark: false,
  onHeaderClick: () => {},
  onMouseEnter: () => {}
};