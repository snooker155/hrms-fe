import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { skillActions } from "../_actions";
import connect from "react-redux/es/connect/connect";

export default class SkillForm extends Component {
  static propTypes = {
    skills: PropTypes.array,
    skillsTypes: PropTypes.array,
    // getAllSkills: PropTypes.func,
    // getSkillsByType: PropTypes.func
  };

  componentDidMount() {
    // const { getAllSkills } = this.props;
    // getAllSkills();
  }

  onChangeType = (e) => {
    console.log(e.target.value);
  };

  onChangeSkill = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Type</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onChangeType}>
            <option value="select">select</option>
            { this.props.skillsTypes && this.props.skillsTypes.length !== 0
              ? this.props.skillsTypes.map((type, i) => {
                return (
                  <option key={ `${ type } ${ i }` } value={type}>{type}</option>
                );
              })
              : null
            }
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Skill</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onChangeSkill}>
            <option value="select">select</option>
            { this.props.skills && this.props.skills.length !== 0
              ? this.props.skills.map((skill, i) => {
                return (
                  <option key={ `${ skill.title } ${ i }` } value={skill._id}>{skill.title}</option>
                );
              })
              : null
            }
          </FormControl>
        </FormGroup>
      </>
    );
  }
}


// const mapStateToProps = (state) => ({
//   skills: state.skills.skills,
// });
//
// const mapDispatchToProps = dispatch => ({
//   getAllSkills: () => { dispatch(skillActions.getAll()); },
//   getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
// });
//
// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(SkillForm);
