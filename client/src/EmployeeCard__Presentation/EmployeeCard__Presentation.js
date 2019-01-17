import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './EmployeeCard__Presentation.scss';
import default_avatar from '../static-assets/img/avatar-default.png'
import {makeCancelable} from "../_helpers";
import {Link} from "react-router-dom";

const propTypes = {
  employee: PropTypes.any,
};

class EmployeeCard__Presentation extends Component {
  cancelablePromise = null;
  state = {
    image: default_avatar,
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

  render (){
    const { employee } = this.props;
    const { image } = this.state;

    return (
      <div className="EmployeeCard__presentation">
        <div className="EmployeeCard__avatar">
          <img className="EmployeeCard__image" src={ image } />
        </div>
        <div>
          <h3 className="EmployeeCard__fullname">{ `${ employee.attributes.name } ${ employee.attributes.surname}` }</h3>
          <p className="EmployeeCard__department">
            <i className="material-icons">business</i>
            <Link to={`/departments/${ employee.relationships.unit.data.id }`} >
              { employee.relationships.unit.data.name }
            </Link>
          </p>

          <h3 className="EmployeeCard__contacts">
            <i className="material-icons">contact_mail</i>Email: { employee.attributes.email }
          </h3>
        </div>
      </div>
    );
  }
}

EmployeeCard__Presentation.propTypes = propTypes;

export default EmployeeCard__Presentation;
