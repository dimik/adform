const initialState = {
  drawer: { open: false, width: 240 },
  toolbar: { title: 'Campaigns' },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        drawer: { ...state.drawer, open: true },
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        drawer: { ...state.drawer, open: false },
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawer: { ...state.drawer, open: !state.drawer.open },
      };
    case 'SET_TOOLBAR_TITLE':
      return {
        ...state,
        toolbar: { ...state.toolbar, title: action.title },
      };
    default:
      return state;
  }
};