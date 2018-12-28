import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import './ProjectCard.scss';
import ProjectCard__Info from '../ProjectCard__Info';
import ProjectCard__Members from '../ProjectCard__Members';
import ProjectCard__Technologies from '../ProjectCard__Technologies';
import { projectActions } from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";

class ProjectCard extends Component {
  static propTypes = {
    project: PropTypes.any,
    projectId: PropTypes.number,
    getProjectById: PropTypes.func,
    currentUserId: PropTypes.number,
  };

  state = {
    activeTab: 1
  };

  componentDidMount() {
    window.scroll(0, 0);

    const { projectId, getProjectById } = this.props;
    getProjectById(projectId);
  }

  componentWillReceiveProps(props, context) {
    this.setState({
      activeTab: 1
    });

    window.scroll(0, 0);
  }

  onTabClick = (i) => {
    this.setState({
      activeTab: i
    });
  };

  render() {
    const { activeTab } = this.state;
    const { project, currentUserId } = this.props;

    // * PROJECT NOT FOUND *
    if (!project) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }


    return (
      <div className="ProjectCard animated fadeIn fast">
        <div className="ProjectCard__presentation">
          <div className="ProjectCard__avatar">
            <img className="ProjectCard__image" src={ require(`../static-assets/img/projects/${ Number(project.id.toString().slice(-1)) + 1 }.png` ) } />
          </div>
          <div>
            <h3 className="ProjectCard__title">{ project.name }</h3>
            {/*<p className="ProjectCatd__department">*/}
              {/*<i className="material-icons">business</i>*/}
              {/*<Link to={ project.department.link }>*/}
                {/*{ project.department.title }*/}
              {/*</Link>*/}
            {/*</p>*/}
            { project.manager
              ? <p className="ProjectCard__manager">
                <i className="material-icons">person_pin</i>
                <Link to={`/employees/${project.manager.attributes.login}`}>
                  {`${project.manager.attributes.name} ${project.manager.attributes.surname}`}
                </Link>
              </p>
              : null
            }
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
                    <ProjectCard__Members employees={ project.employees } isProjectManager={ !!(project.manager && project.manager.id === currentUserId) } />
                  </div>
                : null
              }
              { activeTab === 3
                ? <div className='ProjectCard__Technologies animated fadeIn fast'>
                    <h2>Technologies</h2>
                    <ProjectCard__Technologies technologies={ project.technologies } employees={ project.employees } isProjectManager={ !!(project.manager && project.manager.id === currentUserId) } />
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

const mapStateToProps = (state, ownProps) => ({
  project: state.projects.project,
  // employee: state.employees.employee,
  projectId: +ownProps.match.params.projectId,
  currentUserId: state.auth.user.attributes.id,
  // // currentUserId: ownProps.match.params.employeeId,
  // skills: state.skills.skills,
  // skillsTypes: state.skills.skillsTypes,
});

const mapDispatchToProps = dispatch => ({
  getProjectById: (id) => { dispatch(projectActions.getById(id)); },
  // updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  // deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  // getAllSkills: () => { dispatch(skillActions.getAll()); },
  // getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  // getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ProjectCard);
