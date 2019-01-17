import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import './EmployeeCard__Info.scss';
import getYearDiff from '../_helpers/getYearDiff';
// import EmployeeCard__Subordinates from '../EmployeeCard__Subordinates';

const propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      'acc-id': PropTypes.number,
      'start-date': PropTypes.string,
      gender: PropTypes.string,
      birthday: PropTypes.string,
      manager: PropTypes.number,
    }),
    relationships: PropTypes.shape({
      unit: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        }),
      }),
      position: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string
        }),
      }),
    }),
    manager: PropTypes.object,
  }),
  currentUserId: PropTypes.string,
};

function EmployeeCard__Info(props) {
  const { employee, currentUserId } = props;
  const employeeAge = getYearDiff(employee.attributes.birthday);
  const experience = getYearDiff(employee.attributes['start-date']);

  return (
      <div className="ec-info">
        <div className="ec-info__personal-info">
          <h4>Personal info</h4>
          <div className="content">
            { (currentUserId === employee.id || currentUserId === employee.manager.id) &&
              <span><strong>ID: </strong>{employee.id}</span>
            }
            { (currentUserId === employee.id || currentUserId === employee.manager.id) &&
              <span><strong>ACC-ID: </strong>{ employee.attributes['acc-id'] }</span>
            }
            <span><strong>Start Date: </strong>{ dateFormat(employee.attributes['start-date'], 'mmmm dS, yyyy') } ({ experience }&nbsp;y.)</span>
            <span><strong>Gender: </strong>{ employee.attributes.gender === 'м' ? 'Male' : 'Female' }</span>
            { currentUserId === employee.id || currentUserId === employee.manager.id
              ? <span>
                  <strong>Birthday: </strong>
                    { dateFormat(employee.attributes.birthday, 'mmmm dS, yyyy') } {`(${employeeAge} y.o.)`}
                </span>
              : <span>
                  <strong>Birthday: </strong>
                { dateFormat(employee.attributes.birthday, 'mmmm dS') }
                </span>
            }
          </div>
        </div>
        <div className="ec-info__job-defatils">
          <h4>Job details</h4>
          <div className="content">
            <span><strong>Position: </strong>{ employee.relationships.position.data.title }</span>
            {
              employee.manager
                ? <span>
                    <strong>Supervisor: </strong>
                    <Link to={`/employees/${ employee.manager.attributes.login }`} >
                      { `${ employee.manager.attributes.name } ${ employee.manager.attributes.surname }` }
                    </Link>
                  </span>
                : null
            }
            {
              employee.relationships.unit
                ? <span><strong>Department: </strong>
                    <Link to={`/departments/${ employee.relationships.unit.data.id }`} >
                      { employee.relationships.unit.data.name }
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
