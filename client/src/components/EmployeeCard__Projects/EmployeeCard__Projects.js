import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EmployeeCard__Projects.scss';

const propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.array.isRequired
  }),
  position: PropTypes.string.isRequired
}

function EmployeeCard__Projects(props) {
  const { project, position } = props;

  return (
    <div className="ec-project z-depth-1">
    <div className="ec-project__presentation">
      <div className="ec-project__logo">
        <Link to={ project.link }>
          <img className="ec-project__image" src={ require(`../../static-assets/img/projects/${ project.id }.png`)} />
        </Link>
      </div>
      <div className="ec-project__info">
        <h4 className="ec-project__title">
          <Link to={ project.link } className="link">
            { project.title }
          </Link>
          <span className={ project.status === 'Active'
                          ? 'ec-project__status ec-project__status--active'
                          : 'ec-project__status ec-project__status--unactive'
          }>{ project.status }</span>
        </h4>
        <p className="ec-project__position">
          Position: { position }
        </p>
      </div>
    </div>
    <p className="ec-project__description">{ project.description }</p>
    <div className="ec-project__tecnologies">
      {
        project.technologies.map(technology => (
          <Link to={ technology.link } key={ technology.title }>
            <span className="ec-project__technology">
              { technology.title }<sub className="version">{ technology.version }</sub>
            </span>
          </Link>
        ))
      }
    </div>
  </div>
  );
}

EmployeeCard__Projects.propTypes = propTypes;

export default EmployeeCard__Projects;
