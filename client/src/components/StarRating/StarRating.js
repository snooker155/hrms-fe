import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './StarRating.scss';

export default class StarRating extends Component {
  static propTypes = {
    degrees: PropTypes.array.isRequired,
    isManager: PropTypes.bool.isRequired,
    employeeId: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    editableRow: PropTypes.bool.isRequired
  }

  render() {
    const { degrees, isManager, employeeId, index, editableRow } = this.props;
    const radioIds = [ ];
    for (let i = 1; i <= 5; i++) {
      radioIds.push (`star${ i }__r${ index }` );
    }
    let employeeDegreeValue = degrees.find(degree => degree.source === employeeId).value;
    let managerDegreeValue = degrees.find(degree => degree.source !== employeeId).value;

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
}
