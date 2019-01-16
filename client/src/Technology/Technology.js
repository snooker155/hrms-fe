import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Technology.scss';
import default_tech_image from '../static-assets/img/projects/1.png';
import { makeCancelable } from "../_helpers";

const propTypes = {
  technology: PropTypes.shape({
    // link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // popularity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  })
};

class Technology extends Component {
  cancelablePromise = null;
  state = {
    image: default_tech_image,
  };

  componentDidMount() {
    const { technology } = this.props;

    this.cancelablePromise = makeCancelable(import(`../static-assets/img/technologies/${ technology.title }.png`));

    this.cancelablePromise
      .promise
      .then((image) => {
        // console.log(image);
        this.setState({image: image.default});
      })
      .catch((reason) => {
        // console.log('isCanceled', reason.isCanceled);
        // this.setState({image: default_tech_image});
      });
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  render() {
    const { technology } = this.props;
    const { image } = this.state;

    return (
      <div className="technology z-depth-1 animated fadeIn fast">
        <div className="technology__presentation">
          <div className="technology__logo z-depth-1">
            <Link to={`/skills/${technology._id}`}>
              <img className="technology__img" src={ image } alt={technology.title}/>
            </Link>
          </div>
          <div className="technology__popularity">
            <p><i className="material-icons">whatshot</i>{technology.popularity}</p>
          </div>
        </div>
        <div className="technology__info">
          <h2 className="technology__title">
            <Link to={`/skills/${technology._id}`} className="link">
              {technology.title}
            </Link>
          </h2>
          <div className="technology__description">
            <p>{technology.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

Technology.propTypes = propTypes;

export default Technology;
