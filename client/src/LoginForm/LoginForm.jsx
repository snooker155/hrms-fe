// @flow

import React, { Component } from 'react';
import './LoginForm.scss';
import { FormGroup, Col, Button, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";

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
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { loginAction } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      loginAction(username, password);
    }
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <section className="authorization animated fadeInRight fast">
        <form className="form z-depth-1" onSubmit={this.handleSubmit}>
          <div className="form__line form__line--title">
            <h3 className="form__headline">Sign In</h3>
          </div>
          {/*<div className="form__line form__line--username">*/}
            {/*<div className="input-field">*/}
              {/*<i className="material-icons prefix">account_circle</i>*/}
              {/*<input id="icon_prefix-username" className="js-form__input-username" type="text" value={username} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } name="username" aria-required={ true } />*/}
              {/*/!*<label htmlFor="icon_prefix-username">Username</label>*!/*/}
              {/*{submitted && !username &&*/}
                {/*<span className="helper-text" data-error="wrong" data-success="right">The username is required</span>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}

          <FormGroup controlId="formHorizontalEmail" className="form__line form__line--username" validationState={submitted && !username ? 'error' : null}>
            <div className="input-field">
              <Col componentClass={ControlLabel} sm={2}>
                <i className="material-icons prefix">account_circle</i>
              </Col>
              <Col sm={10}>
                <FormControl placeholder="Username" type="text" value={username} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } name="username" aria-required={ true } />
              </Col>
              {submitted && !username &&
                <HelpBlock>Username is required</HelpBlock>
              }
            </div>
          </FormGroup>

          {/*<div className="form__line form__line--password">*/}
            {/*<div className="input-field">*/}
              {/*<i className="material-icons prefix">vpn_key</i>*/}
              {/*<input id="icon_prefix-password" className="js-form__input-password validate" value={password} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } type="password" name="password" aria-required={ true } />*/}
              {/*/!*<label htmlFor="icon_prefix-password">Password</label>*!/*/}
              {/*{submitted && !password &&*/}
                {/*<span className="helper-text" data-error="wrong" data-success="right">The password is required</span>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}

          <FormGroup controlId="formHorizontalPassword" className="form__line form__line--password" validationState={submitted && !password ? 'error' : null}>
            <div className="input-field">
              <Col componentClass={ControlLabel} sm={2}>
                <i className="material-icons prefix">vpn_key</i>
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password"  value={password} onChange={this.handleChange} onFocus={ this.removeInvalidEffects } name="password" aria-required={ true } />
              </Col>
              {submitted && !password &&
                <HelpBlock>Password is required</HelpBlock>
              }
            </div>
          </FormGroup>

          <div className="form__line form__line--signIn">
            {loggingIn
              ? (
                  <Button className="btn disabled form__input--signIn js-form__input-signIn">
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  </Button >
                )
              : (
                  <Button bsStyle="primary" type="submit" className="btn form__input--signIn js-form__input-signIn">
                    SIGN IN
                  </Button >
                )
            }
          </div>
        </form>
    </section>
    );
  }
}
