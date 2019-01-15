import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProjectCard__Technologies.scss';
import CardTableActions from '../CardTableActions';
import {Modal} from "react-bootstrap";
import SkillForm from "../SkillForm";
import {ConfirmationModal} from "../_components";

export default class ProjectCard__Technologies extends Component {
  static propTypes = {
    project: PropTypes.object,
    isProjectManager: PropTypes.bool,
    updateTechnology: PropTypes.func,
    deleteTechnology: PropTypes.func,
    skills: PropTypes.array,
    skillsTypes: PropTypes.array,
    getSkillsByType: PropTypes.func,
  };

  state = {
    stateTechnologies: JSON.parse(JSON.stringify(this.props.project.technologies)),
    index: null,
    editableRow: null,
    showModal: false,
    showConfirmationModal: false,
  };

  showModal = () => {
    this.setState((state) => ({
      ...state,
      showModal: true,
    }));
  };

  hideModal = () => {
    this.setState((state) => ({
      ...state,
      showModal: false,
    }));
  };

  hideConfirmationModal = () => {
    this.setState((state) => ({
      ...state,
      showConfirmationModal: false,
      index: null,
    }));
  };

  // onEditClickHandler = index => {
  //   this.setState({
  //     editableRow: index
  //   });
  // };

  onDeleteClickHandler = index => {
    // const { employee, deleteSkill } = this.props;
    // employee.skills.splice(index, 1);
    // deleteSkill(employee);
    // this.setState(state => ({
    //   ...state,
    //   stateSkills: JSON.parse(JSON.stringify(employee.skills)),
    //   editableRow: null,
    // }));
    this.setState(state => ({
      ...state,
      showConfirmationModal: true,
      index: index,
    }));
  };

  deleteTechnology = () => {
    const { index } = this.state;
    const { project, deleteTechnology } = this.props;
    project.technologies.splice(index, 1);
    deleteTechnology(project);
    this.setState(state => ({
      ...state,
      stateTechnologies: JSON.parse(JSON.stringify(project.technologies)),
      showConfirmationModal: false,
      index: null,
    }));
  };

  // onApplyClickHandler = () => {
  //   const { stateSkills } = this.state;
  //   const { employee, updateSkill } = this.props;
  //
  //   employee.skills = stateSkills;
  //   updateSkill(employee);
  //
  //   this.setState({
  //     editableRow: null,
  //   });
  // };

  // onCancelClickHandler = () => {
  //   const { employee: { skills: skills } } = this.props;
  //
  //   this.setState({
  //     stateSkills: JSON.parse(JSON.stringify(skills)),
  //     editableRow: null
  //   });
  // };

  addTechnology = (technologyId) => {
    const { project, updateTechnology } = this.props;

    project.technologies.push(technologyId);
    updateTechnology(project);

    this.setState((state) => ({
      ...state,
      showModal: false,
    }));
  };

  render() {
    const { editableRow, showConfirmationModal } = this.state;
    const {
      project: { employees: employees, technologies: technologies },
      isProjectManager,
      skillsTypes,
      skills,
      getSkillsByType
    } = this.props;

    return (
      <>
        { isProjectManager
          ? <i className={ editableRow !== null
                          ? 'material-icons material-icons--add material-icons--disabled'
                          : 'material-icons material-icons--add'}
               onClick={ this.showModal }>
              note_add
            </i>
          : null
        }
        <table className="pc-technologies striped">
          <thead>
            <tr className="pc-technologies__row">
              <th className="pc-technologies__item">
                <span>Technology Title</span>
              </th>
              <th className="pc-technologies__item">
                <span>Version</span>
              </th>
              <th className="pc-technologies__item">
                <span>Staff Count</span>
              </th>
              { isProjectManager
                ? <th className="pc-technologies__item">
                      <span>Actions</span>
                    </th>
                : null
              }
            </tr>
          </thead>
          <tbody>
            {
              technologies.map((technology, i) => (
                <tr key={ technology.title + i }
                    // className={ editableRow !== null && editableRow !== i
                    //           ? 'pc-technologies__row pc-technologies__row--disabled'
                    //           :}
                      className='pc-technologies__row'>
                  <td className="pc-technologies__item">
                    {/*{ editableRow === i*/}
                      {/*? <input type="text"*/}
                              {/*className="input-field js-input-field-technology"*/}
                              {/*defaultValue= { technology.title }*/}
                              {/*autoFocus={ true }*/}
                              {/*onFocus={ e => { e.target.classList.remove('invalid'); } }*/}
                        {/*/>*/}
                      {/*: */}
                      <Link to={ `/skills/${ technology._id}` } >
                          { technology.title }
                        </Link>
                     {/*}*/}
                  </td>
                  <td className="pc-technologies__item">
                    {/*{ editableRow === i*/}
                      {/*? <input type="text"*/}
                              {/*className="input-field js-input-field-version"*/}
                              {/*defaultValue= { technology.version }*/}
                              {/*onFocus={ e => { e.target.classList.remove('invalid'); } }*/}
                        {/*/>*/}
                      {/*: */}
                      <> { technology.latest_ver } </>

                     {/*}*/}
                  </td>
                  <td className="pc-technologies__item">
                  {
                    employees.reduce((sum, employee) => employee.skills.find(skill => skill.skill.title === technology.title) ? (sum + 1) : sum, 0)
                  }
                  </td>
                  { isProjectManager
                    ?  <td className="pc-technologies__item pc-technologies__item--edit">
                          <CardTableActions
                            isActive={ editableRow === i }
                            // onEditClick={ () => { this.onEditClickHandler(i) } }
                            onDeleteClick={ () => { this.onDeleteClickHandler(i) } }
                            // onApplyClick={ () => { this.onApplyClickHandler(i) } }
                            // onCancelClick={ () => { this.onCancelClickHandler(i) } }
                          />
                        </td>
                    : null
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

        <Modal
          dialogClassName="add-skill-modal"
          show={this.state.showModal}>
          <SkillForm
            skills={ skills }
            skillsTypes={ skillsTypes }
            getSkillsByType={ getSkillsByType }
            hideModal={ this.hideModal }
            addSkill={ this.addTechnology }/>
        </Modal>

        <Modal
          dialogClassName="add-skill-modal"
          show={ showConfirmationModal }>
          <ConfirmationModal
            text='Вы действительно хотите удалить эту технологию'
            submit={ this.deleteTechnology }
            cancel={ this.hideConfirmationModal }
            showConfirmationModal={ showConfirmationModal }
          />
        </Modal>
      </>
    );
  }
}
