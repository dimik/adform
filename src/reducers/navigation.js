import ActionTypes from 'constants/ActionTypes';

const initialState = {
  drawer: { open: false, width: 240 },
  toolbar: { title: 'Campaigns' },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.OPEN_DRAWER:
      return {
        ...state,
        drawer: { ...state.drawer, open: true },
      };
    case ActionTypes.CLOSE_DRAWER:
      return {
        ...state,
        drawer: { ...state.drawer, open: false },
      };
    case ActionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawer: { ...state.drawer, open: !state.drawer.open },
      };
    case ActionTypes.SET_TOOLBAR_TITLE:
      return {
        ...state,
        toolbar: { ...state.toolbar, title: action.title },
      };
    default:
      return state;
  }
};