// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LoginForm.scss';
import { Link } from 'react-router-dom';

import decodePassword from '../../_helpers/decodePassword';

type LoginFormProps = {|
  setAuthStatusIn: () => any
|};

export default class LoginForm extends Component<LoginFormProps> {
  // static propTypes = {
  //   employees: PropTypes.array.isRequired,
  //   setAuthStatusIn: PropTypes.func.isRequired
  // };

  usernameInp = document.querySelector('.js-form__input-username');
  passwordInp = document.querySelector('.js-form__input-password');
  signInInp   = document.querySelector('.js-form__input-signIn');

  onSignInClick = () => {
    const { employees, setAuthStatusIn } = this.props;

    if (this.usernameInp instanceof HTMLInputElement &&
      this.passwordInp instanceof HTMLInputElement &&
      this.usernameInp.value &&
      this.passwordInp.value
    ) {
      const login = this.usernameInp.value;
      const password = decodePassword(this.passwordInp.value);

      for (let i = 0; i < employees.length; i++) {
        if (login === employees[i].login && password === employees[i].password) {
          const newCookies = {
            id: employees[i].id,
            login:  employees[i].login,
            password: employees[i].password,
            name: employees[i].name,
            surname: employees[i].surname,
            gender: employees[i].gender
          };

          // let expiresDate = 0;
          // if (rememberInp.checked) {
          //   expiresDate = new Date;
          //   expiresDate.setDate(expiresDate.getDate() + 30);
          //   expiresDate = expiresDate.toUTCString();
          // }

          // document.cookie = `login=${ newCookies.login }; path=/; expires=${ expiresDate }`;
          // document.cookie = `password=${ newCookies.password }; path=/; expires=${ expiresDate }`;

          setAuthStatusIn(newCookies);
          return;
        }
      }
    }

    if (this.usernameInp instanceof HTMLInputElement) {
      this.usernameInp.classList.add('invalid');
    }
    if (this.passwordInp instanceof HTMLInputElement) {
      this.passwordInp.classList.add('invalid');
    }
    if (this.signInInp instanceof HTMLElement) {
      this.signInInp.focus();
    }
  }

  removeInvalidEffects = () => {
    if (this.usernameInp instanceof HTMLInputElement) {
      this.usernameInp.classList.remove('invalid');
    }
    if (this.passwordInp instanceof HTMLInputElement) {
      this.passwordInp.classList.remove('invalid');
    }
  }

  render() {
    return (
      <section className="authorization animated fadeInRight fast">
        <form className="form z-depth-1" action="javascript:void(0);" method="get">
          <div className="form__line form__line--title">
            <h3 className="form__headline">Sign In</h3>
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
          {/*<div className="form__line form__line--remember">*/}
            {/*<label className="form__label--remember">*/}
              {/*<input className="form__input--remember js-form__input-remember" type="checkbox" />*/}
              {/*<span>Keep me signed in</span>*/}
            {/*</label>*/}
          {/*</div>*/}
          <div className="form__line form__line--signIn">
            <input type="submit" className="btn waves-effect waves-light form__input--signIn js-form__input-signIn" onClick={ this.onSignInClick } value="SIGN IN" />
          </div>
          {/*<div className="form__line form__line--reset">*/}
            {/*<Link to={ '/auth/recover' } className="link">Forgot your password?</Link>*/}
          {/*</div>*/}
        </form>
    </section>
    );
  }
}
