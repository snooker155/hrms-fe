import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ClickOutside from 'react-click-outside';
import './Header.scss';
import logo from '../../static-assets/img/logo.png';
import DropDown from '../DropDown';

class Header extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    isDropDownVisible: PropTypes.bool.isRequired,
    changeDropdownVisibility: PropTypes.func.isRequired,
    setAuthStatusOut: PropTypes.func.isRequired
  };

  onClickOutsideHandler(e) {
    const { changeDropdownVisibility, isDropDownVisible } = this.props;
    if (!e.target.classList.contains('js-profileToogle')) {
      if (isDropDownVisible) {
        document.querySelector('.dropDown').classList.add('zoomOut');
        const timeout = setTimeout(() => {
          changeDropdownVisibility();
          clearTimeout(timeout);
        }, 200);
      } else {
        changeDropdownVisibility();
      }
    }
  }

  render() {
    const { id, name, surname, changeDropdownVisibility, isDropDownVisible, setAuthStatusOut } = this.props;
    const gender = (this.props.gender === 'male') ? 'men' : 'women';

    return (
      <header className="header">
        <div className="wrapper">
          <div className="logotype">
            <Link to={ `/employee/${ id }` }>
              <img className="logotype__image" src={ logo } alt="HRM-System" />
            </Link>
          </div>

          <div className="nav-wrapper">
            <ul className="nav">
              <li className="nav__item">
                <NavLink to="/dashboard/employees" className="nav__link" activeClassName="nav__link--active">Сотрудники</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/dashboard/projects" className="nav__link" activeClassName="nav__link--active">Проекты</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/dashboard/technologies" className="nav__link" activeClassName="nav__link--active">Технологии</NavLink>
              </li>
            </ul>

            <div className="profile js-profileToogle">
              <div className="profile-link js-profileToogle" onClick={ changeDropdownVisibility }>
                <p className="profile-link__username js-profileToogle">{ name + ' ' + surname }</p>
                <img className="profile-link__image js-profileToogle" src={ `https://randomuser.me/api/portraits/${ gender }/${ id }.jpg` } />
                <i className="profile-link__dropDownBtn js-profileToogle material-icons">expand_more</i>
              </div>
                { isDropDownVisible
                    ? <ClickOutside onClickOutside={ this.onClickOutsideHandler.bind(this) } >
                        <DropDown id={ id } setAuthStatusOut={ setAuthStatusOut } onClickOutside={ this.onClickOutsideHandler.bind(this) } />
                      </ClickOutside>
                    : null
                }
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
