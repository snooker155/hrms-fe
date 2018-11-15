import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RecoverForm.scss';

export default class RecoverForm extends Component {
  onRecoverClick = () => {
    const emailInp   = document.querySelector('.js-form__input-email'),
          helperText = document.querySelector('.js-helper-text-email'),
          recoverInp = document.querySelector('.js-form__input-recover');

    recoverInp.focus();

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailInp.value)) {
      helperText.classList.add('helper-text--offset-success');
      emailInp.classList.add('valid');
      return;
    }

    emailInp.classList.add('invalid');
  }

  removeInvalidEffects = () => {
    document.querySelector('.js-form__input-email').classList = 'js-form__input-email';
    document.querySelector('.js-helper-text-email').classList.remove('helper-text--offset-success');
  }

  render() {
    return (
      <section className="recover animated fadeInRight fast">
        <form className="form z-depth-1" action="javascript:void(0);" method="get">
          <div className="form__line form__line--title">
            <h3 className="form__headline">Forgot your password?</h3>
            <p className="form__paragraph">Don&#39;t worry. Resetting your password is easy, just tell us the email address you registered with HRM-System.</p>
          </div>
          <div className="form__line form__line--email">
            <div className="input-field">
              <i className="material-icons prefix">mail</i>
              <input id="icon_prefix-email" className="js-form__input-email" onFocus={ this.removeInvalidEffects } type="text" name="email" required={ true } aria-required={ true } />
              <label htmlFor="icon_prefix-email">Email address</label>
              <span className="helper-text js-helper-text-email" data-error="You have entered an invalid e-mail address." data-success="Check your e-mail, shortly you will receive instructions to reset your password. "></span>
            </div>
          </div>
          <div className="form__line form__line--recover">
            <Link to={ '/auth/login' }>
              <input className="btn waves-effect waves-light form__input--back js-form__input-back" type="button" value="BACK" />
            </Link>
            <input className="btn waves-effect waves-light form__input--recover js-form__input-recover" type="submit" onClick={ this.onRecoverClick } value="RESET PASSWORD" />
          </div>
        </form>
      </section>
    );
  }
}
