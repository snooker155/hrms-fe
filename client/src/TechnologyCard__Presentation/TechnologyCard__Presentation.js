import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TechnologyCard__Presentation.scss';
import default_tech_image from "../static-assets/img/projects/1.png";
import {makeCancelable} from "../_helpers";

const propTypes = {
  skill: PropTypes.any,
  isTechnology: PropTypes.bool,
};

class TechnologyCard__Presentation extends Component {
  cancelablePromise = null;
  state = {
    image: default_tech_image,
  };

  componentDidMount() {
    const { skill } = this.props;

    this.cancelablePromise = makeCancelable(import(`../static-assets/img/technologies/${ skill.title }.png`));

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

  render (){
    const { skill, isTechnology } = this.props;
    const { image } = this.state;

    return (
      <div className="TechnologyCard__presentation">
        <div className="TechnologyCard__avatar">
          <img className="TechnologyCard__image" src={ image }/>
        </div>
        <div>
          <h3 className="TechnologyCard__title">{skill.title}</h3>
          {isTechnology
            ? <p className="TechnologyCard__officialSite">
              <i className="material-icons">public</i>
              <a href={skill.url} target='_blank' rel='noopener noreferrer'>Official Website</a>
            </p>
            : <p className="TechnologyCard__officialSite">
              <i className="material-icons">public</i>
              <a href={skill.wiki} target='_blank' rel='noopener noreferrer'>Wikipedia</a>
            </p>
          }
          <p className="TechnologyCard__staffCount">
            <i className="material-icons">school</i>Staff count: {skill.employees.length}
          </p>
          {/*{ isTechnology*/}
          {/*? <p className="TechnologyCard__projectsCount">*/}
          {/*<i className="material-icons">folder</i>Used in projects: { filtetedProjects.length }*/}
          {/*</p>*/}
          {/*: null*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

TechnologyCard__Presentation.propTypes = propTypes;

export default TechnologyCard__Presentation;
