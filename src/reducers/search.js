import ActionTypes from 'constants/ActionTypes';

const initialState = {
  text: '',
  filters: [],
  inProgress: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_FILTER:
      return {
        ...state,
        filters: [
          ...state.filters.filter(filter => filter.name !== action.filter.name),
          action.filter,
        ],
      };
    case ActionTypes.REMOVE_SEARCH_FILTER:
      return {
        ...state,
        filters: state.filters.filter(filter => filter.name !== action.name),
      };
    case ActionTypes.REMOVE_ALL_SEARCH_FILTERS:
      return {
        ...state,
        filters: [],
      };
    case ActionTypes.TOGGLE_SEARCH_FILTER:
      return {
        ...state,
        filters: state.filters.reduce((filters, filter) => ([
          ...filters,
          filter.name === action.name ? { ...filter, active: !filter.active } : filter,
        ]), []),
      };
    case ActionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ActionTypes.SEARCH_CAMPAIGNS_REQUEST:
      return {
        ...state,
        inProgress: true,
      };
    case ActionTypes.SEARCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        inProgress: false,
      };
    default:
      return state;
  }
};