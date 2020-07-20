import * as React from 'react';
import * as leaflet from 'leaflet';
import {connect} from "react-redux";

import {Offer, OfferLocation} from '../../types/offer';

interface Props {
  hoverOffer: number | null;
  activeOffer?: Offer;
  currentLocation: OfferLocation;
  offers: Offer[];
}

class Map extends React.PureComponent<Props> {
  ref: React.RefObject<HTMLElement>;
  _map: any;
  _mapMarkers: any[];

  constructor(props) {
    super(props);

    this.ref = React.createRef<HTMLElement>();
    this._map = null;
    this._mapMarkers = [];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentLocation !== this.props.currentLocation) {
      this._renderMap();
    } else {
      this._renderMarkers();
    }
  }

  componentDidMount() {
    this._renderMap();
  }

  _renderMarkers() {
    this._mapMarkers.forEach((marker) => {
      this._map.removeLayer(marker);
    });
    this._mapMarkers = [];

    const {offers, activeOffer, hoverOffer} = this.props;

    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });
    const iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [30, 30]
    });

    if (activeOffer) {
      leaflet
        .marker(activeOffer.coordinates, {
          icon: !hoverOffer || activeOffer.id === hoverOffer
            ? iconActive
            : icon
        })
        .addTo(this._map);
    }

    offers.forEach((offer) => {
      const marker = leaflet
        .marker(offer.coordinates, {
          icon: offer.id === hoverOffer
            ? iconActive
            : icon
        })
        .addTo(this._map);

      this._mapMarkers.push(marker);
    });
  }

  _renderMap() {
    if (!this.ref.current) {
      return;
    }

    if (this._map) {
      this._map.remove();
    }

    const {currentLocation} = this.props;
    const zoom = 12;

    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });
    const iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [30, 30]
    });

    this._map = leaflet.map(this.ref.current, {
      center: currentLocation.cityCoordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
    this._map.setView(currentLocation.cityCoordinates, zoom);

    leaflet.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
        })
        .addTo(this._map);

    this._renderMarkers();
  }

  render() {
    return (
      <section
        ref={this.ref}
        className="cities__map map"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentLocation: state.data.currentLocation,
  hoverOffer: state.ui.activeOfferLocation,
});

export {Map};
export default connect(mapStateToProps)(Map);
