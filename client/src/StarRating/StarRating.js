import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './StarRating.scss';


const propTypes = {
  employee_degree: PropTypes.number.isRequired,
  manager_degree: PropTypes.number.isRequired,
  isManager: PropTypes.bool.isRequired,
  employeeUsername: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  editableRow: PropTypes.bool.isRequired
};

function StarRating(props) {
  const { employee_degree, manager_degree, isManager, employeeUsername, index, editableRow } = props;
  const radioIds = [ ];
  for (let i = 1; i <= 5; i++) {
    radioIds.push (`star${ i }__r${ index }` );
  }
  let employeeDegreeValue = employee_degree;
  let managerDegreeValue = manager_degree;

  if (isManager) {
    return (
      <div className={ editableRow ? 'rating' : 'rating rating--disabled' } >
      {
        radioIds.map((item, i)=> (
          <Fragment key={ item }>
            <input
              type="radio"
              id={ item }
              name={ `star-rating__r${ index }` }
              className={
                managerDegreeValue !== 0
                  ? '--manager-degree'
                  : null
              }
              value={ 5 - i }
              defaultChecked={ managerDegreeValue === 0 ? employeeDegreeValue === (5 - i) : managerDegreeValue ===(5 - i) }
               />
            <label
            className={
              managerDegreeValue !== 0
                ? '--manager-degree'
                : null
              } htmlFor={ item }></label>
          </Fragment>
        ))
      }
    </div>
    );
  } else {
    return (
      <div className={ editableRow ? 'rating' : 'rating rating--disabled' } >
        {
          radioIds.map((item, i)=> (
            <Fragment key={ item }>
              <input type="radio" id={ item } name={ `star-rating__r${ index }` } value={ 5 - i } defaultChecked={ employeeDegreeValue === (5 - i)} />
              <label htmlFor={ item }></label>
            </Fragment>
          ))
        }
      </div>
    );
  }
}

StarRating.propTypes = propTypes;

export default StarRating;

