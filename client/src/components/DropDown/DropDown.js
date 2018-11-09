import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './animate.scss';
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
        <Link to={ `/employee/${ id }` } className="dropDown__item" onClick={ onClickOutside }>Моя страница</Link>
        <hr />
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Редактировать</a>
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Настройки</a>
        <a className="dropDown__item" href="javascript:void(0);" onClick={ onClickOutside } >Помощь</a>
        <hr />
        <span className="dropDown__item" onClick={ (e) => { onClickOutside(e); setAuthStatusOut(); } }>Выйти</span>
      </div>
    </div>
  );
}

DropDown.propTypes = propTypes;

export default DropDown;

