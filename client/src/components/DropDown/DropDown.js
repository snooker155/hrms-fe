import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './DropDown.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  setAuthStatusOut: PropTypes.func.isRequired
};

function DropDown(props) {
  const { id, onClickOutside, setAuthStatusOut } = props;

  return (
    <div className="dropDown animated zoomIn faster">
      <div className="dropDown__menu z-depth-1">
        <Link to={ `/employees/${ id }` } className="dropDown__item" onClick={ onClickOutside }>My profile</Link>
        <hr />
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Edit profile</a>
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Settings</a>
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Help</a>
        <hr />
        <span className="dropDown__item" onClick={ setAuthStatusOut }>Sign out</span>
      </div>
    </div>
  );
}

DropDown.propTypes = propTypes;

export default DropDown;

