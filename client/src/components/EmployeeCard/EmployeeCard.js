import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import facebook from '../../static-assets/img/socialMediaIcons/facebook.png';
import googlePlus from '../../static-assets/img/socialMediaIcons/google_plus.png';
import instagram from '../../static-assets/img/socialMediaIcons/instagram.png';
import linkedin from '../../static-assets/img/socialMediaIcons/linkedin.png';
import telegram from '../../static-assets/img/socialMediaIcons/telegram.png';
import twitter from '../../static-assets/img/socialMediaIcons/twitter.png';
import whatsapp from '../../static-assets/img/socialMediaIcons/whatsapp.png';

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

  componentWillReceiveProps() {
    this.setState({
      activeTab: 1
    });
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
            <p className="EmployeeCard__department"><i className="material-icons">group</i><Link to={ user.department.link }>{ user.department.title }</Link></p>

            <h3 className="EmployeeCard__contacts">
              <i className="material-icons">contact_mail</i>Contacts:
            </h3>
            <div className="EmployeeCard__contacts-images">
              {
                user.socialMedia.map(media => {
                  switch(media) {
                    case 'telegram':
                      return (<Link key={ media } to={ '/' }><img src={ telegram } /></Link>);
                    case 'whatsapp':
                      return (<Link key={ media } to={ '/' }><img src={ whatsapp } /></Link>);
                    case 'facebook':
                      return (<Link key={ media } to={ '/' }><img src={ facebook } /></Link>);
                    case 'googlePlus':
                      return (<Link key={ media } to={ '/' }><img src={ googlePlus } /></Link>);
                    case 'twitter':
                      return (<Link key={ media } to={ '/' }><img src={ twitter } /></Link>);
                    case 'instagram':
                      return (<Link key={ media } to={ '/' }><img src={ instagram } /></Link>);
                    case 'linkedin':
                      return (<Link key={ media } to={ '/' }><img src={ linkedin } /></Link>);
                    default:
                      return null;
                  }
                })
              }
           </div>
          </div>
        </div>
        <div className="EmployeeCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? "current" : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? "current" : null } onClick={ () => this.onTabClick(2) }>
                <span onClick={ () => this.onTabClick(2) }>Skills</span>
              </li>
              <li className={ activeTab === 3 ? "current" : null } onClick={ () => this.onTabClick(3) }>
                <span onClick={ () => this.onTabClick(3) }>Projects</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              <div className={ activeTab === 1 ? 'EmployeeCard__info animated fadeIn fast' : 'hidden' }>
                <EmployeeCard__Info user={ user } />
              </div>

              <div className={ activeTab === 2 ? 'EmployeeCard__skills animated fadeIn fast' : 'hidden' }>
                <h3>{ user.id === currentUserId ? 'My' : null } Skills</h3>
                <EmployeeCard__Skills user={ user } currentUserId={ currentUserId }/>
              </div>

              <div className={ activeTab === 3 ? 'EmployeeCard__projects animated fadeIn fast' : 'hidden' }>
                <h3>{ user.id === currentUserId ? 'My' : null } Projects</h3>
                {
                  user.projects.map(project => (
                    <EmployeeCard__Projects key={ project.id } project={ project } position={ user.position } />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
