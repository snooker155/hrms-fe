import React from 'react';
import PropTypes from 'prop-types';

import './TechnologyCard__Info.scss';

const propTypes = {
  skill: PropTypes.shape({
    type: PropTypes.string.isRequired,
    wiki: PropTypes.string.isRequired,
    git: PropTypes.string,
    latestVersion: PropTypes.string.latestVersion,
    description: PropTypes.string.isRequired
  })
};

function TechnologyCard__Info(props) {
  const { skill } = props;

  return (
    <div className="tc-info">
      { skill.type === 'technology'
        ? <div className="tc-info__main">
            <h4>Technology info</h4>
            <div className="content">
                { skill.wiki
                  ? <span><a href={ skill.wiki } target='_blank' rel='noopener noreferrer'>Wikipedia</a> /</span>
                  : null
                }
                { skill.git
                  ? <span><a href={ skill.git } target='_blank' rel='noopener noreferrer'>GitHub</a> /</span>
                  : null
                 }
                 <span>Latest version: { skill.latestVersion }</span>
            </div>
          </div>
        : null
      }
      <div className="tc-info__description">
        <h4>Description</h4>
        <div className="content">
          <p>{ skill.description }</p>
        </div>
      </div>
    </div>
  )
}

TechnologyCard__Info.propTypes = propTypes;

export default TechnologyCard__Info;
