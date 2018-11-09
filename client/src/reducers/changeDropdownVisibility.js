import { CHANGE_DROPDOWN_VISIBILITY } from '../actions/changeDropdownVisibility';

const initialState = {
  dropDown: {
    isDropDownVisible: false
  }
};

export default function dropDown(state = initialState, action) {
  switch(action.type) {
    case CHANGE_DROPDOWN_VISIBILITY:
      return {
        ...state,
        dropDown: {
          isDropDownVisible: !state.dropDown.isDropDownVisible
        }
      };

    default:
      return state;
  }
}
