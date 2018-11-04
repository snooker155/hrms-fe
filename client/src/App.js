import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: null,
      projects: null,
      skills: null,
    };
  }

  componentDidMount() {
    fetch('/rest/employees')
      .then(response => response.json())
      .then(data => this.setState({ employees: data }));

    fetch('/rest/projects')
      .then(response => response.json())
      .then(data => this.setState({ projects: data }));

    fetch('/rest/skills')
      .then(response => response.json())
      .then(data => this.setState({ skills: data }));
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}
