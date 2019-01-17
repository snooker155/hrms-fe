import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Project__EmployeePhoto.scss';
import {makeCancelable} from "../_helpers";
import default_avatar from '../static-assets/img/avatar-default.png'

export default class Project__EmployeePhoto extends Component {
  static propTypes = {
    employee: PropTypes.any,
  };

  cancelablePromise = null;
  state = {
    image: default_avatar
  };

  componentDidMount() {
    const { employee } = this.props;

    this.cancelablePromise = makeCancelable(import(`../static-assets/img/photo/${ employee.id }.jpg`));

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
    this.cancelablePromise.cancel();
  }

  render() {
    const { employee } = this.props;
    const { image } = this.state;

    return (
      <Link key={ employee.id } to={`/employees/${ employee.attributes.login }`}>
        <img className="employee__image" src={ image } />
      </Link>
    );
  }
}
