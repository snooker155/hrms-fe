import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import M from 'materialize-css';

import './Technologies__List.scss';
import Project from '../Project';
import Pagination from '../Pagination';
import {departmentActions, employeeActions, projectActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import EmployeesSearchForm from "../Employees__SearchForm";
import ProjectsSearchForm from "../Projects__SearchForm/ProjectsSearchForm";
import Technology from "../Technology";

export default class Technologies__List extends Component {
  static propTypes = {
    technologies: PropTypes.array,
    count: PropTypes.number,
    isTechnologiesLoading: PropTypes.bool,
    handlePageChange: PropTypes.func,
  };

  state = {
    activePage: 1,
    itemsCountPerPage: 20,
  };

  handlePageChange = (limit, page) => {
    window.scroll(0, 0);
    const { handlePageChange } = this.props;
    handlePageChange(limit, page);
    console.log(page);
    this.setState((state) => ({
      ...state,
      activePage: page,
    }));
  };


  render() {
    const {
      activePage,
      itemsCountPerPage,
      // multiple
    } = this.state;

    const {
      technologies,
      count,
      isTechnologiesLoading
    } = this.props;

    // * TECHNOLOGIES NOT LOADED *
    if (isTechnologiesLoading) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    return (
      <>
          <div className="technologies__catalog">
            {
              technologies.length
                ? technologies.map(technology => {
                  return (
                    <Technology key={ technology.title } technology={ technology } />
                  );
                })
                : <p className="notFound">No technologies were found for a given critetia.</p>
            }
          </div>

          <div className="technologies__pagination">
            {
              Math.ceil(count / itemsCountPerPage) > 1
                ? <Pagination
                  activePage={ activePage }
                  itemsCountPerPage={ itemsCountPerPage }
                  totalItemsCount={ count }
                  onChange={ this.handlePageChange }
                />
              : null
            }
          </div>
      </>
    );
  }
}
