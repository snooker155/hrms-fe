import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Project.scss';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.shape({
      status: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      department: PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }),
      manager: PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired
      }),
      employees: PropTypes.array.isRequired
    })
  }

  state = {
    maxEmployeesPhotos: 5
  }

  renderEmployeesPhoto = () => {
    const { maxEmployeesPhotos } = this.state;
    const { employees, link } = this.props.project;

    if (employees.length <= maxEmployeesPhotos) {
      return employees.map(employee => (
          <Link key={ employee.id } to={ employee.link }>
            <img className="employee__image" src={ `https://randomuser.me/api/portraits/${ employee.gender }/${ employee.id }.jpg` } />
          </Link>
      ));
    } else {
      return (
        <>
          {
            employees.slice(0, maxEmployeesPhotos - 1).map(employee => (
              <Link key={ employee.id } to={ employee.link }>
                <img className="employee__image" src={ `https://randomuser.me/api/portraits/${ employee.gender }/${ employee.id }.jpg` } />
              </Link>
            ))
          }
          <Link to={ link }>
            <img className="employee__image" src={ `https://ui-avatars.com/api/?name=%2B${ employees.length - maxEmployeesPhotos + 1 }&background=f3f3f4&color=676a6c&size=128` } />
          </Link>
        </>
      );
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResizeHandler, false);
    this.windowResizeHandler();
  }

  windowResizeHandler = () => {
    const { maxEmployeesPhotos } = this.state;
    const screenWidth = window.screen.width;

    if (screenWidth >= 700) {
      if (maxEmployeesPhotos !== 5) {
        this.setState({
          maxEmployeesPhotos: 5
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
          <span className="status" style={ { background: project.status === 'Active' ? 'hsl(120, 32%, 61%)' : 'hsl(0, 0%, 61%)' }}>{ project.status }</span>
        </div>
        <div className="project__presentation">
          <div className="project__logo">
            <Link to={ project.link }>
              <img className="project__image" src={ require(`../static-assets/img/projects/${ project.id }.png`)} />
            </Link>
          </div>
          <div className="project__info">
            <h3 className="project__title">
              <Link to={ project.link } className="link">
                { project.title }
              </Link>
            </h3>
            <p className="project__department">
              <i className="material-icons">business</i>
              <Link to={ project.department.link }>
                { project.department.title }
              </Link>
            </p>
            <p className="project__manager">
              <i className="material-icons">person_pin</i>
              <Link to={ project.manager.link } >
                { `${ project.manager.name } ${ project.manager.surname }`}
              </Link>
          </p>
          </div>
        </div>
        <div className="project__employees">
          {
            this.renderEmployeesPhoto()
          }
        </div>
      </div>
    );
  }
}
