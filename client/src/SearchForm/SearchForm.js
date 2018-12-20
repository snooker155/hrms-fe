// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead, Token } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class SearchForm extends Component {
  static propTypes = {
    searchNames: PropTypes.array,
    getNames: PropTypes.func,
    isLoading: PropTypes.any,
  };

  state = {
    multiple: true,
    allowNew: false,
  };

  _handleNamesSearch = (e) => {
    console.log(e);
    const { getNames } = this.props;
    getNames(e);
  };

  _handleSearch = (selected) => {
    console.log(selected);
  };

  _filter = (option, props) => {
    return (
      option.attributes.surname.toLowerCase().indexOf(props.text.toLowerCase()) !== -1 ||
      option.attributes.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1
    );
  };

  render() {
    const { multiple } = this.state;
    const { searchNames, isLoading } = this.props;

    return (
      <Fragment>
        <AsyncTypeahead
          isLoading={ isLoading }
          labelKey={(option) => `${option.attributes.surname} ${option.attributes.name}`}
          multiple={ multiple }
          options={ searchNames }
          minLength={ 3 }
          onSearch={ this._handleNamesSearch }
          placeholder="Search for employees..."
          filterBy={ this._filter }
          onChange={ this._handleSearch }
          renderToken ={(option, props, index) => (
            <Token
              key={index}
              onRemove={props.onRemove}>
              {`${option.attributes.surname} ${option.attributes.name}`}
            </Token>
          )}
        />
      </Fragment>
    );
  }
}

