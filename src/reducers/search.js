const initialState = {
  text: '',
  filters: [],
  inProgress: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SEARCH_FILTER':
      return {
        ...state,
        filters: [
          ...state.filters.filter(filter => filter.name !== action.filter.name),
          action.filter,
        ],
      };
    case 'REMOVE_SEARCH_FILTER':
      return {
        ...state,
        filters: state.filters.filter(filter => filter.name !== action.name),
      };
    case 'REMOVE_ALL_SEARCH_FILTERS':
      return {
        ...state,
        filters: [],
      };
    case 'TOGGLE_SEARCH_FILTER':
      return {
        ...state,
        filters: state.filters.reduce((filters, filter) => ([
          ...filters,
          filter.name === action.name ? { ...filter, active: !filter.active } : filter,
        ]), []),
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'SEARCH_CAMPAIGNS_REQUEST':
      return {
        ...state,
        inProgress: true,
      };
    case 'SEARCH_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        inProgress: false,
      };
    default:
      return state;
  }
};