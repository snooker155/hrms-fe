import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import './DepartmentCard.scss';
import DepartmentCard__Staff from '../DepartmentCard__Staff';
import TechnologyCard__Projects from '../TechnologyCard__Projects';

export default class DepartmentCard extends Component {
  static propTypes = {
    departments: PropTypes.array.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  state = {
    activeTab: 1
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps() {
    this.setState({
      activeTab: 1
    });

    window.scroll(0, 0);
  }

  onTabClick = (i) => {
    this.setState({
      activeTab: i
    });
  }

  render() {
    const { activeTab } = this.state;
    const { departments, currentUserId } = this.props;

    const [ department ] = departments.filter(department => department.title === decodeURI(location.pathname).split('/').pop());

    // * DEPARTMENT NOT FOUND *
    if (!department) {
      return (<Redirect to={ `/employees/${ currentUserId }` } />);
    }
    const departmentManager = department.employees.filter(employee => employee.position === 'Project Manager').pop();

    return (
      <div className="DepartmentCard animated fadeIn fast">
        <div className="DepartmentCard__presentation">
          <div className="DepartmentCard__avatar">
            <img className="DepartmentCard__image" src={ require(`../../static-assets/img/departments/${ department.title }.png` ) } />
          </div>
          <div>
            <h3 className="DepartmentCard__title">{ department.title }</h3>
            <p className="DepartmentCard__manager">
              <i className="material-icons">person_pin</i>
              <Link to={ departmentManager.link }>
                { `${ departmentManager.name } ${ departmentManager.surname }`}
              </Link>
            </p>
            <p className="DepartmentCard__staffCount">
              <i className="material-icons">people</i>{ `Staff count: ${ department.employees.length }` }
            </p>
            <p className="DepartmentCard__projectsCount">
              <i className="material-icons">folder</i>{ `Projects: ${ department.projects.length }`}
            </p>
          </div>
        </div>

        <div className="DepartmentCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Staff</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Projects</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='DepartmentCard__Staff animated fadeIn fast'>
                    <h2>Staff</h2>
                    <DepartmentCard__Staff employees={ department.employees } isDepartmentManager={ departmentManager.id === currentUserId } />
                  </div>
                : null
              }
              { activeTab === 2
                ? <div className='DepartmentCard__Projects animated fadeIn fast'>
                    <h2>Projects</h2>
                    <TechnologyCard__Projects projects={ department.projects } />
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
