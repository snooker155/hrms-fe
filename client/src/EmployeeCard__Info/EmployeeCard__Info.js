import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import './EmployeeCard__Info.scss';
import getYearDiff from '../_helpers/getYearDiff';
// import EmployeeCard__Subordinates from '../EmployeeCard__Subordinates';

const propTypes = {
  employee: PropTypes.shape({
    employee_number: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    gender: PropTypes.boolean,
    birthday: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    manager: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      link: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string
    }),
    department: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  })
}

function EmployeeCard__Info(props) {
  const { employee } = props;
  const employeeAge = getYearDiff(employee.birthday);
  const experience = getYearDiff(employee.start_date);

  return (
      <div className="ec-info">
        <div className="ec-info__personal-info">
          <h4>Personal info</h4>
          <div className="content">
            <span><strong>ID: </strong>{ employee.employee_number }</span>
            <span><strong>Start Date: </strong>{ dateFormat(employee.start_date, 'mmmm dS, yyyy') } ({ experience }&nbsp;y.)</span>
            <span><strong>Gender: </strong>{ employee.gender === 'male' ? 'Male' : 'Female' }</span>
            <span><strong>Birthday: </strong>{ dateFormat(employee.birthday, 'mmmm dS, yyyy') } ({ employeeAge }&nbsp;y.o.)</span>
          </div>
        </div>
        <div className="ec-info__job-defatils">
          <h4>Job details</h4>
          <div className="content">
            <span><strong>Position: </strong>{ employee.position }</span>
            {
              employee.manager
                ? <span>
                    <strong>Supervisor: </strong>
                    <Link to={`/employees/${ employee.manager._id }`} >
                      { `${ employee.manager.name } ${ employee.manager.surname }` }
                    </Link>
                  </span>
                : null
            }
            {
              employee.department
                ? <span><strong>Department: </strong>
                    <Link to={`/departments/${ employee.department._id }`} >
                      { employee.department.title }
                    </Link>
                  </span>
                : null
            }
          </div>
        </div>

        {/*{ employee.subordinates*/}
          {/*? <EmployeeCard__Subordinates employees={ employee.subordinates }/>*/}
          {/*: null*/}
        {/*}*/}
    </div>
  );
}

EmployeeCard__Info.propTypes = propTypes;

export default EmployeeCard__Info;
