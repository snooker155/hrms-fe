import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Employee.scss';

import facebook from '../../static-assets/img/socialMediaIcons/facebook.png';
import googlePlus from '../../static-assets/img/socialMediaIcons/google_plus.png';
import instagram from '../../static-assets/img/socialMediaIcons/instagram.png';
import linkedin from '../../static-assets/img/socialMediaIcons/linkedin.png';
import telegram from '../../static-assets/img/socialMediaIcons/telegram.png';
import twitter from '../../static-assets/img/socialMediaIcons/twitter.png';
import whatsapp from '../../static-assets/img/socialMediaIcons/whatsapp.png';

const propTypes = {
  employee: PropTypes.shape({
    link: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    department: PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }),
    socialMedia: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired
  })
}

function Employee(props) {
  const { employee } = props;

  return (
    <div className="card employee z-depth-1 animated fadeInRight slow">
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
        <div className="employee__presentation">
          <Link to={ employee.link }>
            <img className="employee__image" src={ `https://randomuser.me/api/portraits/${ employee.gender }/${ employee.id }.jpg` } />
          </Link>
          <p className="employee__position">{ employee.position }</p>
        </div>
        <div className="employee__info">
          <p className="employee__fullname"><Link to={ employee.link } className="link">{ `${ employee.name } ${ employee.surname }` }</Link></p>
          <p className="employee__department"><i className="material-icons">group</i><Link to={ employee.department.link } className="link">{ employee.department.title }</Link></p>

          <h3><i className="material-icons">contact_mail</i>Contacts:</h3>
          <div className="employee__contacts">
            {
              employee.socialMedia.map(media => {
                switch(media) {
                  case 'telegram':
                    return (<Link key={ media } to={ employee.link }><img src={ telegram } /></Link>);
                  case 'whatsapp':
                    return (<Link key={ media } to={ employee.link }><img src={ whatsapp } /></Link>);
                  case 'facebook':
                    return (<Link key={ media } to={ employee.link }><img src={ facebook } /></Link>);
                  case 'googlePlus':
                    return (<Link key={ media } to={ employee.link }><img src={ googlePlus } /></Link>);
                  case 'twitter':
                    return (<Link key={ media } to={ employee.link }><img src={ twitter } /></Link>);
                  case 'instagram':
                    return (<Link key={ media } to={ employee.link }><img src={ instagram } /></Link>);
                  case 'linkedin':
                    return (<Link key={ media } to={ employee.link }><img src={ linkedin } /></Link>);
                  default:
                    return null;
                }
              })
            }
          </div>
        </div>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>

        <h3><i className="material-icons">folder</i>Projects:</h3>
        <div className="employee__projects">
          { employee.projects.map(project => {
            return (
              <Link key={ project.title } to={ project.link }>
                <div className="project">
                  { project.title }
                </div>
              </Link>
            );
          })
          }
        </div>

        <h3><i className="material-icons">school</i>Skills:</h3>
        <div className="employee__skills">
          { employee.skills.map(skill => {
              return (
                <Link key={ skill.title } to={ skill.link }>
                  <div className="skill">
                    { skill.title }
                  </div>
                </Link>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

Employee.propTypes = propTypes;

export default Employee;
