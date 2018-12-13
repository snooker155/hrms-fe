import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { skillActions } from "../_actions";
import connect from "react-redux/es/connect/connect";

class SkillForm extends Component {
  static propTypes = {
    skills: PropTypes.array,
    getAllSkills: PropTypes.func,
    getSkillsByType: PropTypes.func
  };

  componentDidMount() {
    const { getAllSkills } = this.props;
    getAllSkills();
  }

  onChangeType = (e) => {
    console.log(e.target.value);
  };

  onChangeSkill = (e) => {
    console.log(e.target.value);
  };

  render() {
    const { skills } = this.props;

    return (
      <>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Type</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onChangeType}>
            <option value="select">select</option>
            { skills && skills.length !== 0
              ? skills.map((skill, i) => {
                return (
                  <option key={ `${ skill.title } ${ i }` } value={skill._id}>{skill.title}</option>
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
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  skills: state.skills.skills,
});

const mapDispatchToProps = dispatch => ({
  getAllSkills: () => { dispatch(skillActions.getAll()); },
  getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(SkillForm);
