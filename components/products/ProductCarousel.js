/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

export default function ProductCarousel({ shuffledProducts }) {
  return (
    <Carousel>
      {shuffledProducts.map((shuffledProduct) => (
        <Carousel.Item key={shuffledProduct.id} className="carousel">
          <img
            className="d-block w-100"
            src={shuffledProduct.image}
            alt="First slide"
            height="300"
          />
          <Carousel.Caption>
            <h3>{shuffledProduct.title}</h3>
            <p>A Bangazon Exclusive</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

ProductCarousel.propTypes = {
  shuffledProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};
