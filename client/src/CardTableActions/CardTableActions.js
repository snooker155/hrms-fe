import React from 'react';
import PropTypes from 'prop-types';

import './CardTableActions.scss';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onApplyClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

function CardTableActions(props) {
  const { isActive, onApplyClick, onCancelClick, onEditClick, onDeleteClick } = props;

  return (
    <>
      {
        isActive
          ? <>
              <i className="material-icons material-icons--update" onClick={ onApplyClick }>check</i>
              <i className="material-icons material-icons--cancel" onClick={ onCancelClick }>close</i>
            </>
          : <>
            { onEditClick && <i className="material-icons" onClick={ onEditClick }>edit</i> }
              <i className="material-icons" onClick={ onDeleteClick }>delete</i>
            </>
      }
    </>
  );
}

CardTableActions.propTypes = propTypes;

export default CardTableActions;
