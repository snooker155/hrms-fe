import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Technology.scss';

const propTypes = {
  technology: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  })
};

function Technology(props) {
  const { technology } = props;

  return (
    <div className="technology z-depth-1 animated fadeIn fast">
      <div className="technology__presentation">
          <div className="technology__logo z-depth-1">
              <Link to={ technology.link }>
                <img className="technology__img" src={ require(`../../static-assets/img/technologies/${ technology.title }.png`) } alt={ technology.title } />
              </Link>
          </div>
          <div className="technology__popularity">
              <p><i className="material-icons">whatshot</i>{ technology.popularity }</p>
          </div>
      </div>
      <div className="technology__info">
          <h2 className="technology__title">
              <Link to={ technology.link } className="link">
                { technology.title }
              </Link>
          </h2>
          <div className="technology__description">
              <p>{ technology.description }</p>
          </div>
      </div>
    </div>
  );
}

Technology.propTypes = propTypes;

export default Technology;
