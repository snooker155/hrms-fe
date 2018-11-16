import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StarRating.scss';

export default class StarRating extends Component {
  static propTypes = {
    rate: PropTypes.shape({
      value: PropTypes.number.isRequired,
      source: PropTypes.number,
      date: PropTypes.string
    }),
    editableRow: PropTypes.bool.isRequired
  }

  render() {
    const { rate: { value }, editableRow } = this.props;

    const content = [ ];
    for (let i = 1; i <= 5; i++) {
      if (value >= i && !editableRow) {
        content.push('star');
      } else {
        content.push('star_border');
      }
    }

    return (
      <ul className="star-rating">
        {
          content.map((star, i) => (
            <li key={ i } className={ editableRow ? 'star-rating__item star-rating__item--edit' : null }>
              <i className="material-icons">{ star }</i>
            </li>
          ))
        }
      </ul>
    );
  }
}
