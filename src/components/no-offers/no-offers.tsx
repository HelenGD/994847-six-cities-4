import * as React from 'react';

const NoOffers: React.FC = () => {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in Dusseldorf
          </p>
        </div>
      </section>
      <div
        className="cities__right-section"
        style={{
          backgroundPosition: `right center`,
          backgroundSize: `100% auto`,
          backgroundImage: `url(/img/no-places@2x.png)`,
        }}
      />
    </div>
  );
};

export default NoOffers;
