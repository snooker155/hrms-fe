// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EmployeeCard__Skills.scss';
import StarRating from '../StarRating';
import CardTableActions from '../CardTableActions';
import SkillForm from '../SkillForm';
import { Modal, Button } from 'react-bootstrap';

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
  };

  state = {
    stateSkills: JSON.parse(JSON.stringify(this.props.employee.skills)),
    editableRow: null,
    showModal: false,
  };

  constructor(props) {
    super(props);
  }

  addSkill = () => {
    this.setState(state => ({
      stateSkills: [ ...state.stateSkills, {
        skill: {
          title: '',
        },
        employee_degree: 0,
        manager_degree: 0,
        updated: Date.now()
      }],
      editableRow: state.stateSkills.length
    }));
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

  onEditClickHandler = index => {
    this.setState({
      editableRow: index
    });
  };

  onDeleteClickHandler = index => {
    const { employee, deleteSkill } = this.props;
    employee.skills.splice(index, 1);
    deleteSkill(employee);
    this.setState({
      stateSkills: JSON.parse(JSON.stringify(employee.skills)),
      editableRow: null,
    });
  };

  onChangeDegree = (e) => {
    const value = +e.target.value;
    const { stateSkills, editableRow } = this.state;
    const { employee: { attributes: { manager: { username: employeeManagerUsername }}}, currentUserUsername } = this.props;
    if(currentUserUsername === employeeManagerUsername){
      stateSkills[editableRow].manager_degree = value;
    }else{
      stateSkills[editableRow].employee_degree = value;
    }
    this.setState({
      stateSkills: stateSkills,
      editableRow: editableRow,
    });
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

    // const inputValue = document.querySelector('.js-input-field-skill');
    // if (inputValue.value.trim() === '') {
    //   inputValue.classList.add('invalid');
    //   return;
    // }

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

  render() {
    const { editableRow, stateSkills } = this.state;
    const { skills, skillsTypes, employee: { attributes: { login: employeeUsername, manager: { username: employeeManagerUsername }} },  currentUserUsername } = this.props;

    return (
      <>
        { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername
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
                { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername
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
                        isManager={ currentUserUsername === employeeManagerUsername }
                        employeeUsername={ employeeUsername }
                        index={ i }
                        editableRow={ editableRow === i }
                        onChangeDegree={ this.onChangeDegree }/>
                    </td>
                    <td className="ec-skills__item">
                      <span>{ new Date(skill.updated).toLocaleDateString() }</span>
                    </td>
                    { currentUserUsername === employeeUsername || currentUserUsername === employeeManagerUsername
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
          <Modal.Header>
            <Modal.Title>Add skill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SkillForm skills={ skills } skillsTypes={ skillsTypes } />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.hideModal}>Save</Button>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
