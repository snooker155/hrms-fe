import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './DepartmentCard__Staff.scss';
import CardTableActions from '../CardTableActions';

export default class DepartmentCard__Staff extends Component {
  static propTypes = {
    employees: PropTypes.shape({
      data: PropTypes.array,
    }),
    // isDepartmentManager: PropTypes.bool.isRequired
  };

  // state = {
  //   employees: this.props.employees,
  //   editableRow: null
  // };

  componentDidMount() {
    // const { employees: { data: employees } } = this.props;
    // document.querySelector('.DepartmentCard__staffCount').innerHTML = `<i class="material-icons">people</i>Staff count: ${ employees.length }`;
  }

  // onAddClick = () => {
  //   const newEmployee = {
  //     name: '',
  //     surname: '',
  //     link: '/employees',
  //     startDate: new Date().toJSON()
  //   };
  //
  //   const count = Number(document.querySelector('.DepartmentCard__staffCount').innerHTML.split(' ').pop());
  //   document.querySelector('.DepartmentCard__staffCount').innerHTML = `<i class="material-icons">people</i>Staff count: ${ count + 1 }`;
  //
  //   this.setState(state => ({
  //     employees: [ ...state.employees, { ...newEmployee, id: state.employees.length } ],
  //     editableRow: state.employees.length
  //   }));
  // };

  // onEditClickHandler = i => {
  //   this.setState({
  //     editableRow: i
  //   });
  // };

  // onDeleteClickHandler = i => {
  //   const count = Number(document.querySelector('.DepartmentCard__staffCount').innerHTML.split(' ').pop());
  //   document.querySelector('.DepartmentCard__staffCount').innerHTML = `<i class="material-icons">people</i>Staff count: ${ count - 1 }`;
  //
  //   this.setState(state => ({
  //     employees: [ ...state.employees.slice(0, i), ...state.employees.slice(i + 1) ]
  //   }));
  // };

  // onApplyClickHandler = i => {
  //   const { employees } = this.state;
  //   const newFullName = document.querySelector('.js-input-field-fullname');
  //   const newPosition = document.querySelector('.js-input-field-position');
  //
  //   const splittedFullName = newFullName.value.trim().split(' ');
  //   if (splittedFullName.length < 2 || splittedFullName[0] === '' || splittedFullName[1] === '') {
  //     newFullName.classList.add('invalid');
  //     return;
  //   }
  //
  //   if (newPosition.value.trim() === '') {
  //     newPosition.classList.add('invalid');
  //     return;
  //   }
  //
  //   const user = {
  //     ...employees[i],
  //     name: splittedFullName[0],
  //     surname: splittedFullName[1],
  //     position: newPosition.value.trim()
  //   };
  //
  //   this.setState(state => ({
  //     employees: [ ...state.employees.slice(0, i), user,...state.employees.slice(i + 1) ],
  //     editableRow: null
  //   }));
  // };

  // onCancelClickHandler = i => {
  //   const { employees } = this.state;
  //   if (employees[i].name === '' && employees[i].surname === '') {
  //     const count = Number(document.querySelector('.DepartmentCard__staffCount').innerHTML.split(' ').pop());
  //     document.querySelector('.DepartmentCard__staffCount').innerHTML = `<i class="material-icons">people</i>Staff count: ${ count - 1 }`;
  //
  //     this.setState((state) => ({
  //       employees: [ ...state.employees.slice(0, i), ...state.employees.slice(i + 1) ],
  //       editableRow: null
  //     }));
  //   } else {
  //     this.setState({
  //       editableRow: null
  //     });
  //   }
  // };

  render() {
    // const { employees, editableRow } = this.state;
    const {
      employees: { data: employees },
      //


    } = this.props;

    return (
      <>
        {/*{ isDepartmentManager*/}
          {/*? <i className={ editableRow !== null*/}
                          {/*? 'material-icons material-icons--add material-icons--disabled'*/}
                          {/*: 'material-icons material-icons--add'}*/}
               {/*onClick={ this.onAddClick }>*/}
              {/*note_add*/}
            {/*</i>*/}
          {/*: null*/}
        {/*}*/}
        <table className="dc-staff striped">
          <thead>
            <tr className="ec-skills__row">
              <th className="dc-staff__item">
                <span>Full Name</span>
              </th>
              <th className="dc-staff__item">
                <span>Position</span>
              </th>
              <th className="dc-staff__item">
                <span>Start Date</span>
              </th>
              {/*{ isDepartmentManager*/}
                {/*?  <th className="ec-skills__item">*/}
                      {/*<span>Actions</span>*/}
                    {/*</th>*/}
                {/*: null*/}
              {/*}*/}
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee, i) => (
                <tr key={ employee.id }
                    // className={ editableRow !== null && editableRow !== i
                    //           ? 'dc-staff__row dc-staff__row--disabled'
                    //           : 'dc-staff__row'
                  // }
                    className= 'dc-staff__row'
                >
                  <td className="dc-staff__item">
                    {/*{ editableRow === i*/}
                      {/*? <input type="text"*/}
                              {/*className="input-field js-input-field-fullname"*/}
                              {/*defaultValue= { `${ employee.name } ${ employee.surname }` }*/}
                              {/*autoFocus={ true }*/}
                              {/*onFocus={ (e) => { e.target.classList.remove('invalid'); } }*/}
                        {/*/>*/}
                      {/*: <Link to={ employee.link } >*/}
                          {/*{ `${ employee.name } ${ employee.surname }` }*/}
                        {/*</Link>*/}
                    {/*}*/}
                    <Link to={`/employees/${employee.attributes.login }`} >
                      { `${ employee.attributes.name } ${ employee.attributes.surname }` }
                    </Link>
                  </td>
                  <td className="dc-staff__item">
                    {/*{ editableRow === i*/}
                      {/*? <input type="text"*/}
                              {/*className="input-field js-input-field-position"*/}
                              {/*defaultValue={ employee.position }*/}
                              {/*onFocus={ (e) => { e.target.classList.remove('invalid'); } }*/}
                        {/*/>*/}
                      {/*: <> { employee.position } </>*/}
                    {/*}*/}
                    <> { employee.relationships.position.data.title } </>
                  </td>
                  <td className="dc-staff__item">
                    { new Date(employee.attributes['start-date']).toLocaleDateString() }
                  </td>
                  {/*{ isDepartmentManager*/}
                    {/*?  <td className="dc-staff__item dc-staff__item--edit">*/}
                          {/*<CardTableActions*/}
                            {/*isActive={ editableRow === i }*/}
                            {/*onEditClick={ () => { this.onEditClickHandler(i) } }*/}
                            {/*onDeleteClick={ () => { this.onDeleteClickHandler(i) } }*/}
                            {/*onApplyClick={ () => { this.onApplyClickHandler(i) } }*/}
                            {/*onCancelClick={ () => { this.onCancelClickHandler(i) } }*/}
                          {/*/>*/}
                        {/*</td>*/}
                    {/*: null*/}
                  {/*}*/}
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}
