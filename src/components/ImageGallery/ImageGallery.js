// === СЕТКА КАРТИНОК ===
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    imgIdx: null,
    // showModal: false,
  };

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    return (
      <>
        <ImageGalleryItem />
      </>
    );
  }
}
