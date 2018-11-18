import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './EmployeeCard.scss';
import EmployeeCard__Info from '../EmployeeCard__Info';
import EmployeeCard__Skills from '../EmployeeCard__Skills';
import EmployeeCard__Projects from '../EmployeeCard__Projects';

export default class EmployeeCard extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
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
    const { employees, projects, currentUserId } = this.props;

    const [ user ] = employees.filter(employee => employee.id === Number(location.pathname.split('/').pop()));

    // * USER NOT FOUND *
    if (!user) {
      return (<Redirect to={'/' } />);
    }

    for (let i = 0; i < user.projects.length; i++) {
      const { description, technologies } = projects.find(project => project.id === user.projects[i].id);
      user.projects[i] = {
        ...user.projects[i],
        description,
        technologies
      }
    }

    return (
      <div className="EmployeeCard animated fadeIn fast">
        <div className="EmployeeCard__presentation">
          <div className="EmployeeCard__avatar">
            <img className="EmployeeCard__image" src={ `https://randomuser.me/api/portraits/${ user.gender }/${ user.id }.jpg` } />
          </div>
          <div>
            <h3 className="EmployeeCard__fullname">{ `${ user.name } ${ user.surname}` }</h3>
            <p className="EmployeeCard__department">
              <i className="material-icons">business</i>
              <Link to={ user.department.link }>
                { user.department.title }
              </Link>
            </p>

            <h3 className="EmployeeCard__contacts">
              <i className="material-icons">contact_mail</i>Contacts:
            </h3>
            <div className="EmployeeCard__contacts-images">
              {
                user.socialMedia.map(media => (
                  <Link key={ media } to={ '/' }>
                    <img src={ require(`../../static-assets/img/socialMediaIcons/${ media }.png`) } />
                  </Link>
                ))
              }
           </div>
          </div>
        </div>
        <div className="EmployeeCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Skills</span>
              </li>
              <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>
                <span>Projects</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='EmployeeCard__info animated fadeIn fast'>
                    <EmployeeCard__Info user={ user } />
                  </div>
                : null
              }

              { activeTab === 2
                ? <div className='EmployeeCard__skills animated fadeIn fast'>
                    <h2>{ user.id === currentUserId ? 'My' : null } Skills</h2>
                    <EmployeeCard__Skills user={ user } currentUserId={ currentUserId }/>
                  </div>
                : null
              }

              { activeTab === 3
                ? <div className='EmployeeCard__projects animated fadeIn fast'>
                    <h2>{ user.id === currentUserId ? 'My' : null } Projects</h2>
                    {
                      user.projects.map(project => <EmployeeCard__Projects key={ project.id } project={ project } position={ user.position } />)
                    }
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
