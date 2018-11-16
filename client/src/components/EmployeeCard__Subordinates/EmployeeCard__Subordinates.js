import React from 'react';
import PropTypes from 'prop-types';
import Employee from '../Employee';

import './EmployeeCard__Subordinates.scss';

const propTypes = {
  employees: PropTypes.array.isRequired
}

function EmployeeCard__Subordinates(props) {
  const { employees } = props;

  return (
    <div className="ec-info__subordinates">
      <h4>Subordinates</h4>
      <div className="ec-info__employees">
      {
        employees.map(emp => <Employee key={ emp.id } employee={ emp } />)
      }
      </div>
    </div>
  );
}

EmployeeCard__Subordinates.propTypes = propTypes;

export default EmployeeCard__Subordinates;
