// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead, Token } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class SearchForm extends Component {
  static propTypes = {
    items: PropTypes.array,
    //@TODO: should be merged with getAllSkills function, not two different actions
    search: PropTypes.func,
    searchEmployeesBy: PropTypes.func,
    isLoading: PropTypes.bool,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    labelKey: PropTypes.func,
  };

  _handleSearch = (e) => {
    console.log(e);
    const { search } = this.props;
    //@TODO: should be merged with getAllSkills function, not two different actions
    console.log(search);
    search(e);
  };

  _handleSearchBy = (selected) => {
    console.log(selected);
    const { searchEmployeesBy } = this.props;
    //@TODO: change to direct setting of callback in component props
    searchEmployeesBy(selected);
  };

  // _filter = (option, props) => {
  //   return (
  //     option.attributes.surname.toLowerCase().indexOf(props.text.toLowerCase()) !== -1 ||
  //     option.attributes.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1
  //   );
  // };

  render() {
    const { items, isLoading, multiple, placeholder, labelKey } = this.props;

    return (
      <Fragment>
        <AsyncTypeahead
          isLoading={ isLoading }
          labelKey={labelKey }
          multiple={ multiple }
          options={ items }
          minLength={ 1 }
          onSearch={ this._handleSearch }
          placeholder={ placeholder }
          // filterBy={ this._filter }
          onChange={ this._handleSearchBy }
          renderToken ={(option, props, index) => (
            <Token
              key={index}
              onRemove={props.onRemove}>
              {`${option.title}`}
            </Token>
          )}
        />
      </Fragment>
    );
  }
}

