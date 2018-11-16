import React from 'react';
import PropTypes from 'prop-types';

import './EmployeeCard__Actions.scss';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onApplyClickHandler: PropTypes.func.isRequired,
  onCancelClickHandler: PropTypes.func.isRequired,
  editSkillHandler: PropTypes.func.isRequired,
  deleteSkillHandler: PropTypes.func.isRequired
}

function EmployeeCard__Actions(props) {
  const { isActive, onApplyClickHandler, onCancelClickHandler, editSkillHandler, deleteSkillHandler } = props;
  return (
    <>
    {
      isActive
        ? <>
            <i className="material-icons material-icons--add" onClick={ onApplyClickHandler }>check</i>
            <i className="material-icons material-icons--cancel" onClick={ onCancelClickHandler }>close</i>
          </>
        : <>
            <i className="material-icons" onClick={ editSkillHandler }>edit</i>
            <i className="material-icons" onClick={ deleteSkillHandler }>delete</i>
          </>
    }
    </>
  );
}

EmployeeCard__Actions.propTypes = propTypes;

export default EmployeeCard__Actions;
