import React from 'react';
import PropTypes from 'prop-types';

import './ProjectCard__Info.scss';

const propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastUpdate: PropTypes.number.isRequired,
    // git: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

function ProjectCard__Info(props) {
  const { project } = props;

  return (
    <div className="pc-info">
      <div className="pc-info__project-info">
        <h4>Project info</h4>
        <div className="content">
          <span><strong>ID: </strong>{ project.id }</span>
          <span><strong>Update Date: </strong>{ new Date(project.lastUpdate).toLocaleDateString() } </span>
          {/*<span>*/}
            {/*<strong>GitHub: </strong>*/}
            {/*<a href={ project.git } target="_blank" rel="noopener noreferrer">*/}
              {/*{ project.git.split('://').pop() }*/}
            {/*</a>*/}
          {/*</span>*/}
        </div>
      </div>
      <div className="pc-info__project-description">
        <h4>Description</h4>
        <div className="content">
          { project.description }
        </div>
      </div>
    </div>
  );
}

ProjectCard__Info.propTypes = propTypes;

export default ProjectCard__Info;
