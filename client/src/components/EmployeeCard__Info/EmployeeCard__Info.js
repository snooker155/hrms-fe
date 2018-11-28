import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import './EmployeeCard__Info.scss';
import getYearDiff from '../../_helpers/getYearDiff';
import EmployeeCard__Subordinates from '../EmployeeCard__Subordinates';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    manager: PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string
    }),
    department: PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  })
}

function EmployeeCard__Info(props) {
  const { user } = props;
  const userAge = getYearDiff(user.birthday);
  const experience = getYearDiff(user.startDate);

  return (
      <div className="ec-info">
        <div className="ec-info__personal-info">
          <h4>Personal info</h4>
          <div className="content">
            <span><strong>ID: </strong>{ user.id }</span>
            <span><strong>Start Date: </strong>{ dateFormat(user.startDate, 'mmmm dS, yyyy') } ({ experience }&nbsp;y.)</span>
            <span><strong>Gender: </strong>{ user.gender === 'men' ? 'Male' : 'Female' }</span>
            <span><strong>Birthday: </strong>{ dateFormat(user.birthday, 'mmmm dS, yyyy') } ({ userAge }&nbsp;y.o.)</span>
          </div>
        </div>
        <div className="ec-info__job-defatils">
          <h4>Job details</h4>
          <div className="content">
            <span><strong>Job Title: </strong>{ user.position }</span>
            {
              user.manager.id
                ? <span>
                    <strong>Supervisor: </strong>
                    <Link to={ user.manager.link } >
                      { `${ user.manager.name } ${ user.manager.surname }` }
                    </Link>
                  </span>
                : null
            }
            <span><strong>Department: </strong>
              <Link to={ user.department.link } >
                { user.department.title }
              </Link>
            </span>
          </div>
        </div>

        { user.subordinates
          ? <EmployeeCard__Subordinates employees={ user.subordinates }/>
          : null
        }
    </div>
  );
}

EmployeeCard__Info.propTypes = propTypes;

export default EmployeeCard__Info;
