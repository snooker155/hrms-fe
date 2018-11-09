import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LoginForm.scss';
import { Link } from 'react-router-dom';

export default class componentName extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    setAuthStatusIn: PropTypes.func.isRequired
  }

  onSignInClick = () => {
    const { employees, setAuthStatusIn } = this.props;
    const usernameInp = document.querySelector('.js-form__input-username'),
          passwordInp = document.querySelector('.js-form__input-password'),
          rememberInp = document.querySelector('.js-form__input-remember'),
          signInInp   = document.querySelector('.js-form__input-signIn');

    if (usernameInp.value && passwordInp.value) {
      const login = usernameInp.value;
      const password = this.decodePassword(passwordInp.value);

      for (let i = 0; i < employees.length; i++) {
        if ((login === employees[i].login) && (password === employees[i].password)) {
          const cookies = {
            id: employees[i].id,
            login:  employees[i].login,
            password: employees[i].password,
            name: employees[i].name,
            surname: employees[i].surname,
            gender: employees[i].gender
          };

          let expiresDate = 0;
          if (rememberInp.checked) {
            expiresDate = new Date;
            expiresDate.setDate(expiresDate.getDate() + 1);
            expiresDate = expiresDate.toUTCString();
          }

          for (let key in cookies) {
            this.setCookie(key, cookies[key], expiresDate);
          }

          setAuthStatusIn(cookies);
          return;
        }
      }
    }

    usernameInp.classList.add('invalid');
    passwordInp.classList.add('invalid');
    signInInp.focus();
  }

  decodePassword = str => {
    let h = 0, l = str.length, i = 0;
    if ( l > 0 ) {
      while (i < l) {
        h = (h << 5) - h + str.charCodeAt(i++) | 0;
      }
    }
    return h.toString();
  }

  setCookie = (name, value, expiresDate = 0) => {
    document.cookie = `${ name }=${ value }; path=/; expires=${ expiresDate }`;
  }

  removeInvalidEffects = () => {
    document.querySelector('.js-form__input-username').classList.remove('invalid');
    document.querySelector('.js-form__input-password').classList.remove('invalid');
  }

  render() {
    return (
      <section className="authorization">
        <form className="form z-depth-1" action="javascript:void(0);" method="get">
          <div className="form__line form__line--title">
            <h3 className="form__headline">Sign In</h3>
            <p className="form__paragraph">Welcome back to HRM-System!</p>
          </div>
          <div className="form__line form__line--username">
            <div className="input-field">
              <i className="material-icons prefix">account_circle</i>
              <input id="icon_prefix-username" className="js-form__input-username" onFocus={ this.removeInvalidEffects } type="text" name="username" required={ true } aria-required={ true } />
              <label htmlFor="icon_prefix-username">Username</label>
            </div>
          </div>
          <div className="form__line form__line--password">
            <div className="input-field">
              <i className="material-icons prefix">vpn_key</i>
              <input id="icon_prefix-password" className="js-form__input-password" onFocus={ this.removeInvalidEffects } type="password" name="password" required={ true } aria-required={ true } />
              <label htmlFor="icon_prefix-password">Password</label>
              <span className="helper-text" data-error="The username or password is incorrect."></span>
            </div>
          </div>
          <div className="form__line form__line--remember">
            <label className="form__label--remember">
              <input className="form__input--remember js-form__input-remember" type="checkbox" />
              <span>Keep me signed in</span>
            </label>
          </div>
          <div className="form__line form__line--signIn">
            <input type="submit" className="btn waves-effect waves-light form__input--signIn js-form__input-signIn" onClick={ this.onSignInClick } value="SIGN IN" />
          </div>
          <div className="form__line form__line--reset">
            <Link to={ '/auth/recover' }>Forgot your password?</Link>
          </div>
        </form>
    </section>
    );
  }
}
