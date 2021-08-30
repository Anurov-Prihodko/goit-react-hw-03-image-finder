// === СЕТКА КАРТИНОК ===
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { fetchImages, NUMBER_OF_PHOTOS } from '../../services/api';

export default class ImageGallery extends Component {
  state = {
    imgIdx: null,
    // showModal: false,
  };

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.requestName !== this.props.requestName) {
      console.log('Изменилось имя покемона');
      console.log('prevProps:', prevProps.requestName);
      console.log('this.props.requestName:', this.props.requestName);

      fetchImages(this.props.requestName)
        .then(response => response.hits)
        .then(console.log);
      // .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    // console.log(this.props.images);
    return (
      <>
        {/* <ImageGalleryItem image={this.props.imgArray} /> */}
        <div>{this.props.requestName}</div>
        <div>{this.props.imgArray}</div>
      </>
    );
  }
}
