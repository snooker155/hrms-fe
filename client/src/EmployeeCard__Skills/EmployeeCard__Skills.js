// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect, Route} from 'react-router-dom';

import './EmployeeCard__Skills.scss';
import StarRating from '../StarRating';
import CardTableActions from '../CardTableActions';
import SkillForm from '../SkillForm';
import { Modal, Button } from 'react-bootstrap';
import Dashboard from "../Dashboard";
import {ConfirmationModal, PrivateRoute} from "../_components";

export default class EmployeeCard__Skills extends Component {
  static propTypes = {
    employee: PropTypes.shape({
      id: PropTypes.string,
      attributes: PropTypes.shape({
        login: PropTypes.string,
        manager: PropTypes.number,
      }),
      skills: PropTypes.array.isRequired,
      manager: PropTypes.shape({
        username: PropTypes.string
      }),
    }),
    currentUserUsername: PropTypes.string,
    updateSkill: PropTypes.func,
    deleteSkill: PropTypes.func,
    skills: PropTypes.array,
    skillsTypes: PropTypes.array,
    getSkillsByType: PropTypes.func,
    superuser: PropTypes.bool,
  };

  state = {
    stateSkills: JSON.parse(JSON.stringify(this.props.employee.skills)),
    index: null,
    editableRow: null,
    showModal: false,
    showConfirmationModal: false,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(state => ({
      ...state,
      stateSkills: JSON.parse(JSON.stringify(this.props.employee.skills)),
    }));
  }

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

  onEditClickHandler = index => {
    this.setState({
      editableRow: index
    });
  };

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

  deleteSkill = () => {
    const { index } = this.state;
    const { employee, deleteSkill } = this.props;
    employee.skills.splice(index, 1);
    deleteSkill(employee);
    this.setState(state => ({
      ...state,
      stateSkills: JSON.parse(JSON.stringify(employee.skills)),
      showConfirmationModal: false,
      index: null,
    }));
  };

  onChangeDegree = (e) => {
    const value = +e.target.value;
    const { stateSkills, editableRow } = this.state;
    const { employee: { attributes: { manager: { username: employeeManagerUsername }}}, currentUserUsername, superuser } = this.props;
    if(currentUserUsername === employeeManagerUsername || superuser){
      stateSkills[editableRow].manager_degree = value;
    }else{
      stateSkills[editableRow].employee_degree = value;
    }
    this.setState(state => ({
      ...state,
      stateSkills: stateSkills,
      editableRow: editableRow,
    }));
  };

  onChangeSkillTitle = (e) => {
    const title = e.target.value;
    const { stateSkills, editableRow } = this.state;
    stateSkills[editableRow].skill.title = title;
    this.setState({
      stateSkills: stateSkills,
      editableRow: editableRow,
    });
  };

  onApplyClickHandler = () => {
    const { stateSkills } = this.state;
    const { employee, updateSkill } = this.props;

    employee.skills = stateSkills;
    updateSkill(employee);

    this.setState({
      editableRow: null,
    });
  };

  onCancelClickHandler = () => {
    const { employee: { skills: skills } } = this.props;

    this.setState({
      stateSkills: JSON.parse(JSON.stringify(skills)),
      editableRow: null
    });
  };

  addSkill = (skillId) => {
    const { employee, updateSkill } = this.props;
    const skill = {
      skill: skillId,
      employee_degree: 1,
      manager_degree: 1,
    };

    employee.skills.push(skill);
    updateSkill(employee);

    this.setState((state) => ({
      ...state,
      showModal: false,
    }));
  };

  render() {
    const { editableRow, stateSkills, showConfirmationModal } = this.state;
    const {
      skills,
      skillsTypes,
      getSkillsByType,
      employee: { skills: employeeSkills, attributes: { login: employeeUsername, manager: { username: employeeManagerUsername }} },
      currentUserUsername,
      superuser
    } = this.props;

    return (
      <>
        { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername || superuser
          ? <i className={ editableRow !== null ? 'material-icons material-icons--add material-icons--disabled' : 'material-icons material-icons--add'} onClick={ this.showModal }>note_add</i>
          : null
        }
        <table className="ec-skills striped">
            <thead>
              <tr className="ec-skills__row">
                <th className="ec-skills__item">
                  <span>Skill</span>
                </th>
                <th className="ec-skills__item">
                  <span>Level</span>
                </th>
                <th className="ec-skills__item">
                  <span>Last update</span>
                </th>
                { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername || superuser
                  ?  <th className="ec-skills__item">
                        <span>Actions</span>
                      </th>
                  : null
                }
              </tr>
            </thead>

            <tbody>
            {
              stateSkills.length !== 0
              ? stateSkills.map((skill, i) => {
                return (
                  <tr key={ `${ skill.skill.title } ${ i }` }
                      className={ editableRow !== null && editableRow !== i
                                 ? 'ec-skills__row ec-skills__row--disabled'
                                 : 'ec-skills__row'
                  }>
                    <td className="ec-skills__item">
                      {/*{ editableRow === i*/}
                          {/*? <input type="text"*/}
                                   {/*className="input-field js-input-field-skill"*/}
                                   {/*value={ skill.skill.title }*/}
                                   {/*onChange={ this.onChangeSkillTitle }*/}
                                   {/*autoFocus={ true }*/}
                                   {/*onFocus={ e => e.target.classList.remove('invalid') }*/}
                            {/*/>*/}
                          {/*: <span><Link to={ `/skills/${ skill.skill._id}` }>{ skill.skill.title }</Link></span>*/}
                      {/*}*/}
                      <span><Link to={ `/skills/${ skill.skill._id}` }>{ skill.skill.title }</Link></span>
                    </td>
                    <td className="ec-skills__item">
                      <StarRating
                        employee_degree={ skill.employee_degree }
                        manager_degree={ skill.manager_degree }
                        isManager={ currentUserUsername === employeeManagerUsername || superuser }
                        employeeUsername={ employeeUsername }
                        index={ i }
                        editableRow={ editableRow === i }
                        onChangeDegree={ this.onChangeDegree }/>
                    </td>
                    <td className="ec-skills__item">
                      <span>{ new Date(skill.updated).toLocaleDateString() }</span>
                    </td>
                    { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername || superuser
                        ? <td className="ec-skills__item ec-skills__item--edit">
                            <CardTableActions
                              isActive={ editableRow === i }
                              onEditClick={ () => { this.onEditClickHandler(i); } }
                              onDeleteClick={ () => { this.onDeleteClickHandler(i); } }
                              onApplyClick={ () => { this.onApplyClickHandler(i); } }
                              onCancelClick={ () => { this.onCancelClickHandler(i); } }
                            />
                          </td>
                        : null
                    }
                  </tr>
                );
              })
              : null
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
              addSkill={ this.addSkill }/>
        </Modal>

        <Modal
          dialogClassName="add-skill-modal"
          show={ showConfirmationModal }>
          <ConfirmationModal
            text='Вы действительно хотите удалить этот навык?'
            submit={ this.deleteSkill }
            cancel={ this.hideConfirmationModal }
            showConfirmationModal={ showConfirmationModal }
          />
        </Modal>
      </>
    );
  }
}
