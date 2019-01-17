import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import avatar from '../static-assets/img/avatar-default.png'

import './Project.scss';
import Project__EmployeePhoto from "../Project__EmployeePhoto/Project__EmployeePhoto";

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      // department: PropTypes.shape({
      //   link: PropTypes.string.isRequired,
      //   title: PropTypes.string.isRequired
      // }),
      manager: PropTypes.shape({
        id: PropTypes.string,
        attributes: PropTypes.shape({
          name: PropTypes.string,
          surname: PropTypes.string
        }),
      }),
      // employees: PropTypes.array.isRequired
    })
  }

  state = {
    maxEmployeesPhotos: 10
  };

  renderEmployeesPhoto = (project) => {
    const { maxEmployeesPhotos } = this.state;

    if (project.employees.length <= maxEmployeesPhotos) {
      return project.employees.map(employee => (
        <Project__EmployeePhoto key={ employee.id } employee={ employee } />
      ));
    } else {
      const numberOfStaff = `%2B${ project.employees.length - maxEmployeesPhotos + 1 }`;
      return (
        <>
          {
            project.employees.slice(0, maxEmployeesPhotos - 1).map(employee => (
              <Project__EmployeePhoto key={ employee.id } employee={ employee } />
            ))
          }
          <Link to={ `/projects/${ project.id }`}>
            <img className="employee__image" src={ `https://ui-avatars.com/api/?name=${ numberOfStaff }&background=f3f3f4&color=676a6c&size=128&length=3&font-size=0.33` } />
          </Link>
        </>
      );
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.windowResizeHandler, false);
    this.windowResizeHandler();
  }

  windowResizeHandler = () => {
    const { maxEmployeesPhotos } = this.state;
    const screenWidth = window.screen.width;

    if (screenWidth >= 1000) {
      if (maxEmployeesPhotos !== 5) {
        this.setState({
          maxEmployeesPhotos: 10
        });
      }
    } else if (screenWidth < 1000 && screenWidth >= 840) {
      if (maxEmployeesPhotos !== 5) {
        this.setState({
          maxEmployeesPhotos: 8
        });
      }
    } else if (screenWidth < 840 && screenWidth >= 700) {
      if (maxEmployeesPhotos !== 5) {
        this.setState({
          maxEmployeesPhotos: 6
        });
      }
    } else if (screenWidth < 700 && screenWidth >= 640) {
      if (maxEmployeesPhotos !== 4) {
        this.setState({
          maxEmployeesPhotos: 4
        });
      }
    } else if (screenWidth < 640 && screenWidth >= 560) {
      if (maxEmployeesPhotos !== 3) {
        this.setState({
          maxEmployeesPhotos: 3
        });
      }
    } else {
      if (maxEmployeesPhotos !== 2) {
        this.setState({
          maxEmployeesPhotos: 2
        });
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler, false);
  }

  render() {
    const { project } = this.props;

    return (
      <div className="project animated fadeIn fast">
        <div className="project__status">
          { project.status && project.status.trim() && <span className="status" style={ { background: project.status === 'Open' ? 'hsl(120, 32%, 61%)' : 'hsl(0, 0%, 61%)' }}>{ project.status }</span> }
        </div>
        <div className="project__presentation">
          <div className="project__logo">
            <Link to={ `/projects/${ project.id }`} >
              <img className="project__image" src={ require(`../static-assets/img/projects/${ Number(project.id.toString().slice(-1)) + 1 }.png`)} />
            </Link>
          </div>
          <div className="project__info">
            <h3 className="project__title">
              <Link to={ `/projects/${ project.id }`} className="link">
                { project.name }
              </Link>
            </h3>
            {/*<p className="project__department">*/}
              {/*<i className="material-icons">business</i>*/}
              {/*<Link to={ project.department.link }>*/}
                {/*{ project.department.title }*/}
              {/*</Link>*/}
            {/*</p>*/}
            { project.manager
              ? <p className="project__manager">
                  <i className="material-icons">person_pin</i>
                  <Link to={`/employees/${project.manager.attributes.login}`}>
                    {`${project.manager.attributes.name} ${project.manager.attributes.surname}`}
                  </Link>
                </p>
              : null
            }
          </div>
        </div>
        <div className="project__employees">
          {
            this.renderEmployeesPhoto(project)
          }
        </div>
      </div>
    );
  }
}
