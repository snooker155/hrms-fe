import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './TechnologyCard__Projects.scss';

const propTypes = {
  projects: PropTypes.array.isRequired
};

function TechnologyCard__Projects(props) {
  const { projects } = props;

  return (
    <div className="tc-projects">
      {
        projects.map(project => (
          <div key={ project.title } className="project z-depth-1">
            <div className="project__presentation">
              <div className="project__logo">
                <Link to={ project.link }>
                  <img className="project__image" src={ require(`../static-assets/img/projects/${ project.id }.png`)} />
                </Link>
              </div>
              <div className="project__info">
                <h3 className="project__title">
                  <Link to={ project.link } className="link">
                    { project.title }
                  </Link>
                  <span className={ project.status === 'Active'
                          ? 'project__status project__status--active'
                          : 'project__status project__status--unactive'
                  }>{ project.status }</span>
                </h3>
                <p className="project__department">
                  <i className="material-icons">business</i>
                  <Link to={ project.department.link }>
                    { project.department.title }
                  </Link>
                </p>
                <p className="project__manager">
                  <i className="material-icons">person_pin</i>
                  <Link to={ project.manager.link } >
                    { `${ project.manager.name } ${ project.manager.surname }`}
                  </Link>
              </p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

TechnologyCard__Projects.propTypes = propTypes;

export default TechnologyCard__Projects;
