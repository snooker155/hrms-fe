import React from 'react';
import PropTypes from 'prop-types';

import './TechnologyCard__Community.scss';
import Employee from '../Employee';

const propTypes = {
  employees: PropTypes.array.isRequired
};

function TechnologyCard__Community(props) {
  const { employees } = props;

  return (
    <div className="tc-community">
      {
        employees.map(emp => <Employee key={ emp.id } employee={ emp } />)
      }
    </div>
  );
}

TechnologyCard__Community.propTypes = propTypes;

export default TechnologyCard__Community;
