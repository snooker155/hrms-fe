import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import './ProjectCard.scss';
import ProjectCard__Info from '../ProjectCard__Info';
import ProjectCard__Members from '../ProjectCard__Members';
import ProjectCard__Technologies from '../ProjectCard__Technologies';

export default class ProjectCard extends Component {
  static propTypes = {
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
    const { projects, currentUserId } = this.props;


    const [ project ] = projects.filter(project => project.id === Number(decodeURI(location.pathname).split('/').pop()));

    // * PROJECT NOT FOUND *
    if (!project) {
      return (<Redirect to={ '/projects' } />);
    }

    return (
      <div className="ProjectCard animated fadeIn fast">
        <div className="ProjectCard__presentation">
          <div className="ProjectCard__avatar">
            <img className="ProjectCard__image" src={ require(`../../static-assets/img/projects/${ project.id }.png` ) } />
          </div>
          <div>
            <h3 className="ProjectCard__title">{ project.title }</h3>
            <p className="ProjectCatd__department">
              <i className="material-icons">business</i>
              <Link to={ project.department.link }>
                { project.department.title }
              </Link>
            </p>
            <p className="ProjectCard__manager">
              <i className="material-icons">person_pin</i>
              <Link to={ project.manager.link }>
                { `${ project.manager.name } ${ project.manager.surname }`}
              </Link>
            </p>
            <p className="ProjectCard__staffCount">
              <i className="material-icons">people</i>{ `Team: ${ project.employees.length }` }
            </p>
          </div>
        </div>

        <div className="ProjectCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Members</span>
              </li>
              <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>
                <span>Technologies</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='ProjectCard__Info animated fadeIn fast'>
                    <ProjectCard__Info project={ project } />
                  </div>
                : null
              }
              { activeTab === 2
                ? <div className='ProjectCard__Members animated fadeIn fast'>
                    <h2>Members</h2>
                    <ProjectCard__Members employees={ project.employees } isProjectManager={ project.manager.id === currentUserId } />
                  </div>
                : null
              }
              { activeTab === 3
                ? <div className='ProjectCard__Technologies animated fadeIn fast'>
                    <h2>Technologies</h2>
                    <ProjectCard__Technologies technologies={ project.technologies } employees={ project.employees } isProjectManager={ project.manager.id === currentUserId } />
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
