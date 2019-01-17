import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ClickOutside from 'react-click-outside';
import './Header.scss';
import logo from '../static-assets/img/logo.png';
import default_avatar from '../static-assets/img/avatar-default.png'
import DropDown from '../Dropdown';
import {makeCancelable} from "../_helpers";

class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      attributes: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        gender: PropTypes.string,
      }),
    }),
    logoutAction: PropTypes.func.isRequired
  };

  cancelablePromise = null;

  state = {
    isDropDownVisible: false,
    image: default_avatar,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.changeBgcOnScroll, false);

    const { user } = this.props;

    this.cancelablePromise = makeCancelable(import(`../static-assets/img/photo/${ user.id }.jpg`));

    this.cancelablePromise
      .promise
      .then((image) => {
        // console.log(image);
        this.setState({image: image.default});
      })
      .catch((reason) => {
        // console.log('isCanceled', reason.isCanceled);
        // this.setState({image: default_tech_image});
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeBgcOnScroll, false);
    this.cancelablePromise.cancel();
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
    const { isDropDownVisible, image } = this.state;
    const { user, logoutAction } = this.props;

    return (
      <>
      <header className="header">
        <div className="wrapper">
          <div className="logotype">
            <Link to={ `/employees/${ user.attributes.login }` }>
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
                <p className="profile-link__username js-profileToogle">{ `${ user.attributes.name } ${ user.attributes.surname }` }</p>
                {/*<img className="profile-link__image js-profileToogle" src={ `https://randomuser.me/api/portraits/${ user.attributes.gender === 'м' ? 'men' : 'women' }/65.jpg` } />*/}
                <img className="profile-link__image js-profileToogle" src={ image } />
                <i className="profile-link__dropDownBtn js-profileToogle material-icons">expand_more</i>
              </div>
                { isDropDownVisible
                    ? <ClickOutside onClickOutside={ this.onClickOutsideHandler.bind(this) } >
                        <DropDown id={ user.attributes.login } logoutAction={ logoutAction } onClickOutside={ this.onClickOutsideHandler.bind(this) } />
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
