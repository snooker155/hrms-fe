import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ClickOutside from 'react-click-outside';
import './Header.scss';
import logo from '../static-assets/img/logo.png';
import DropDown from '../Dropdown';

class Header extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    currentEmployee: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      gender: PropTypes.boolean,
    }),
    logoutAction: PropTypes.func.isRequired
  };

  state = {
    isDropDownVisible: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.changeBgcOnScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeBgcOnScroll, false);
  }

  changeBgcOnScroll = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    document.querySelector('.header').style.backgroundColor = (scrolled == 0) ? 'hsl(211, 30%, 20%)' : 'hsla(211, 30%, 20%, .9)';
  }

  changeDropdownVisibility = () => {
    this.setState(state => ({
      isDropDownVisible: !state.isDropDownVisible
    }));
  }

  onClickOutsideHandler(e) {
    const { isDropDownVisible } = this.state;

    if (!e.target.classList.contains('js-profileToogle')) {
      if (isDropDownVisible) {
        document.querySelector('.dropDown').classList.add('zoomOut');
        const timeout = setTimeout(() => {
          this.changeDropdownVisibility();
          clearTimeout(timeout);
        }, 200);
      } else {
        this.changeDropdownVisibility();
      }
    }
  }

  render() {
    const { isDropDownVisible } = this.state;
    const { userId, currentEmployee, logoutAction } = this.props;

    return (
      <>
      <header className="header">
        <div className="wrapper">
          <div className="logotype">
            <Link to={ `/employees/${ userId }` }>
              <img className="logotype__image" src={ logo } alt="HRM-System" />
            </Link>
          </div>

          <div className="nav-wrapper">
            <ul className="nav">
              <li className="nav__item">
                <NavLink to="/employees" exact={ true } className="nav__link" activeClassName="nav__link--active">Employees</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/projects" exact={ true } className="nav__link" activeClassName="nav__link--active">Projects</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/skills" exact={ true } className="nav__link" activeClassName="nav__link--active">Technologies</NavLink>
              </li>
            </ul>

            <div className="profile js-profileToogle">
              <div className="profile-link js-profileToogle" onClick={ this.changeDropdownVisibility }>
                <p className="profile-link__username js-profileToogle">{ `${ currentEmployee.name } ${ currentEmployee.surname }` }</p>
                <img className="profile-link__image js-profileToogle" src={ `https://randomuser.me/api/portraits/${ currentEmployee.gender ? 'men' : 'women' }/65.jpg` } />
                <i className="profile-link__dropDownBtn js-profileToogle material-icons">expand_more</i>
              </div>
                { isDropDownVisible
                    ? <ClickOutside onClickOutside={ this.onClickOutsideHandler.bind(this) } >
                        <DropDown id={ userId } logoutAction={ logoutAction } onClickOutside={ this.onClickOutsideHandler.bind(this) } />
                      </ClickOutside>
                    : null
                }
            </div>
          </div>
        </div>
      </header>

      <div className="fix-indent"></div>
      </>
    );
  }
}

export default Header;
