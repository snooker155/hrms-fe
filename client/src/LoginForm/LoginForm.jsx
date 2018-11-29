// @flow

import React, { Component } from 'react';
import './LoginForm.scss';

type LoginFormProps = {|
  loggingIn: boolean,
  loginAction: (username: string, password: string) => void
|};

type LoginFormState = {|
  username: string,
  password: string,
  submitted: boolean
|};

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state = {
    username: '',
    password: '',
    submitted: false
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { loginAction } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      loginAction(username, password);
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
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <section className="authorization animated fadeInRight fast">
        <form className="form z-depth-1" onSubmit={this.handleSubmit}>
          <div className="form__line form__line--title">
            <h3 className="form__headline">Sign In</h3>
          </div>
          <div className="form__line form__line--username">
            <div className="input-field">
              <i className="material-icons prefix">account_circle</i>
              <input id="icon_prefix-username" className="js-form__input-username" value={username} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } type="text" name="username" aria-required={ true } />
              <label htmlFor="icon_prefix-username">Username</label>
              {submitted && !username &&
                <span className="helper-text">The username is required</span>
              }
            </div>
          </div>
          <div className="form__line form__line--password">
            <div className="input-field">
              <i className="material-icons prefix">vpn_key</i>
              <input id="icon_prefix-password" className="js-form__input-password" value={password} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } type="password" name="password" aria-required={ true } />
              <label htmlFor="icon_prefix-password">Password</label>
              {submitted && !password &&
                <span className="helper-text">The password is required</span>
              }
            </div>
          </div>
          <div className="form__line form__line--signIn">
            <input type="submit" className="btn waves-effect waves-light form__input--signIn js-form__input-signIn" value="SIGN IN" />
            {/*{loggingIn &&*/}
              {/*<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />*/}
            {/*}*/}
          </div>
        </form>
    </section>
    );
  }
}
