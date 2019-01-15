import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './TechnologyCard.scss';
import { skillActions } from "../_actions";
import connect from "react-redux/es/connect/connect";
import ProjectCard from "../ProjectCard/ProjectCard";
import Spinner from "react-spinner-material";
import TechnologyCard__Info from "../TechnologyCard_Info/TechnologyCard__Info";
import TechnologyCard__Community from "../TechnologyCard_Community/TechnologyCard__Community";
// import TechnologyCard__Projects from "../TechnologyCard_Projects/TechnologyCard__Projects";

class TechnologyCard extends Component {
  static propTypes = {
    // employees: PropTypes.array.isRequired,
    // projects: PropTypes.array.isRequired,
    skill: PropTypes.any,
    skillId: PropTypes.string,
    getTechnologyById: PropTypes.func.isRequired,
  };

  state = {
    activeTab: 1
  };

  componentDidMount() {
    window.scroll(0, 0);

    const { skillId, getTechnologyById } = this.props;
    getTechnologyById(skillId);
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
    const { skill } = this.props;

    // const [ skill ] = skills.filter(skill => skill.title === decodeURI(location.pathname).split('/').pop());

    // * SKILL NOT FOUND *
    if (!skill) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    const isTechnology = skill.type ==='technology';
    // const filteredEmployees = employees.filter(employee => employee.skills.some(item => item.title === skill.title));
    // const filtetedProjects = projects.filter(project => project.technologies.some(item => item.title === skill.title));

    return (
      <div className="TechnologyCard animated fadeIn fast">
        <div className="TechnologyCard__presentation">
          <div className="TechnologyCard__avatar">
            <img className="TechnologyCard__image"
                 src={ isTechnology
                        ? require(`../static-assets/img/technologies/${ skill.title }.png` )
                        : `https://ui-avatars.com/api/?name=${ skill.title }?background=d7dbe0&color=233242&size=128` } />
          </div>
          <div>
            <h3 className="TechnologyCard__title">{ skill.title }</h3>
            { isTechnology
              ? <p className="TechnologyCard__officialSite">
                  <i className="material-icons">public</i>
                  <a href={ skill.url } target='_blank' rel='noopener noreferrer'>Official Website</a>
                </p>
              : <p className="TechnologyCard__officialSite">
                  <i className="material-icons">public</i>
                  <a href={ skill.wiki } target='_blank' rel='noopener noreferrer'>Wikipedia</a>
                </p>
            }
            <p className="TechnologyCard__staffCount">
              <i className="material-icons">school</i>Staff count: { skill.employees.length }
            </p>
            {/*{ isTechnology*/}
                {/*? <p className="TechnologyCard__projectsCount">*/}
                    {/*<i className="material-icons">folder</i>Used in projects: { filtetedProjects.length }*/}
                  {/*</p>*/}
                {/*: null*/}
            {/*}*/}
          </div>
        </div>
        <div className="TechnologyCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Community</span>
              </li>
              {/*{ isTechnology*/}
                  {/*? <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>*/}
                      {/*<span>Projects</span>*/}
                    {/*</li>*/}
                  {/*: null*/}
              {/*}*/}
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='TechnologyCard__Info animated fadeIn fast'>
                    <TechnologyCard__Info skill={ skill } />
                  </div>
                : null
              }
              { activeTab === 2
                ? <div className='TechnologyCard__Community animated fadeIn fast'>
                    <h2>Community</h2>
                    <TechnologyCard__Community employees={ skill.employees } />
                  </div>
                : null
              }
              {/*{ activeTab === 3*/}
                {/*? <div className='TechnologyCard__Projects animated fadeIn fast'>*/}
                    {/*<h2>Projects</h2>*/}
                    {/*<TechnologyCard__Projects projects={ skill.projects } />*/}
                  {/*</div>*/}
                {/*: null*/}
              {/*}*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  skill: state.skills.skill,
  // employee: state.employees.employee,
  skillId: ownProps.match.params.skillId,
  currentUserId: state.auth.user.id,
  // // currentUserId: ownProps.match.params.employeeId,
  // skills: state.skills.skills,
  // skillsTypes: state.skills.skillsTypes,
});

const mapDispatchToProps = dispatch => ({
  getTechnologyById: (id) => { dispatch(skillActions.getById(id)); },
  // updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  // deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  // getAllSkills: () => { dispatch(skillActions.getAll()); },
  // getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  // getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(TechnologyCard);
