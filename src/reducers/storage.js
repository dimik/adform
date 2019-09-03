import ActionTypes from 'constants/ActionTypes';

const initialState = {
  isPopulating: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.POPULATE_CAMPAIGNS_REQUEST:
      return {
        ...state,
        isPopulating: true,
      };
    case ActionTypes.POPULATE_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        isPopulating: false,
      };
    default:
      return state;
  }
};