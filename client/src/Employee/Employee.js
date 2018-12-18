// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import type {EmployeeType} from "../_types";
import avatar from '../static-assets/img/avatar-default.png'

import './Employee.scss';

const propTypes = {
  // employee: PropTypes.shape({
  //   // link: PropTypes.string.isRequired,
  //   gender: PropTypes.string.isRequired,
  //   id: PropTypes.number.isRequired,
  //   position: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   surname: PropTypes.string.isRequired,
  //   department: PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     link: PropTypes.string.isRequired
  //   }),
  //   socialMedia: PropTypes.array.isRequired,
  //   projects: PropTypes.array.isRequired,
  //   skills: PropTypes.array.isRequired
  // })

  employee: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      login: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      'acc-id': PropTypes.number,
      'start-date': PropTypes.string,
      gender: PropTypes.string,
      birthday: PropTypes.string,
      manager: PropTypes.number,
    }),
    relationships: PropTypes.shape({
      unit: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        }),
      }),
      position: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string
        }),
      }),
    }),
    manager: PropTypes.object,
    skills: PropTypes.array,
  })
};

// type EmployeeProps = {|
//   employee: EmployeeType,
//   // onCompleted: () => void,
//   // onRemove: () => void
// |};

// class Employee extends PureComponent<EmployeeProps> {
class Employee extends PureComponent {
// function Employee(props) {

  render() {
    const { employee } = this.props;

    return (
      <div className="card employee z-depth-1 animated fadeIn fast">
        <div className="card-content">
          {/*<span className="card-title activator grey-text text-darken-4"><i className="material-icons">info</i></span>*/}
          <div className="employee__presentation">
            <Link to={`/employees/${ employee.username }`}>
              {/*<img className="employee__image" src={ `https://randomuser.me/api/portraits/${ employee.gender }/${ employee.id }.jpg` } />*/}
              <img className="employee__image" src={ avatar } />
            </Link>
            <p className="employee__position">{ employee.position }</p>
          </div>
          <div className="employee__info">
            <p className="employee__fullname">
              <Link to={`/employees/${ employee.username }`} className="link">
                { `${ employee.name } ${ employee.surname }` }
              </Link>
            </p>
            <p className="employee__department">
              <i className="material-icons">business</i>
              <Link to={`/departments/${ employee.department }`} >
                { employee.department }
              </Link>
            </p>
            <p className="employee__email">
              <i className="material-icons">contact_mail</i>
              <span className="email">{ employee.email }</span>
            </p>

            {/*<h3><i className="material-icons">contact_mail</i>Contacts:</h3>*/}
            {/*<div className="employee__contacts">*/}
              {/*{*/}
                {/*employee.socialMedia.map(media => (*/}
                  {/*<Link key={ media } to={ '/' }>*/}
                    {/*<img src={ require(`../static-assets/img/socialMediaIcons/${ media }.png`) } />*/}
                  {/*</Link>*/}
                {/*))*/}
              {/*}*/}
            {/*</div>*/}
          </div>
        </div>
        {/*<div className="card-reveal">*/}
          {/*<span className="card-title grey-text text-darken-4"><i className="material-icons">close</i></span>*/}
          {/*<h3><i className="material-icons">folder</i>Projects:</h3>*/}
          {/*<div className="employee__projects">*/}
            {/*{ employee.projects.map(project => {*/}
              {/*return (*/}
                {/*<Link key={ project.title } to={ project.link }>*/}
                  {/*<div className="project">*/}
                    {/*{ project.title }*/}
                  {/*</div>*/}
                {/*</Link>*/}
              {/*);*/}
            {/*})*/}
            {/*}*/}
          {/*</div>*/}

          {/*<h3><i className="material-icons">school</i>Skills:</h3>*/}
          {/*<div className="employee__skills">*/}
            {/*{ employee.skills.map(skill => {*/}
              {/*return (*/}
                {/*<Link key={ skill.skill.title } to={ `/skills/${ skill.skill._id}` }>*/}
                  {/*<div className="skill">*/}
                    {/*{ skill.skill.title }*/}
                  {/*</div>*/}
                {/*</Link>*/}
              {/*);*/}
            {/*})*/}
            {/*}*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}


Employee.propTypes = propTypes;


// export type { EmployeeType };
export default Employee;
