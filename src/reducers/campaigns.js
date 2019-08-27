const { localStorage: storage } = window;
const initialState = {
  isLoading: false,
  isPopulating: false,
  populated: storage.getItem('campaigns.populated') === '1',
  items: [],
  query: { offset: 0, limit: 10 },
};

export default function campaigns(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_CAMPAIGNS_REQUEST':
      return {
        ...state,
        query: action.query,
        isLoading: true,
      };
    case 'SEARCH_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        ...action.data,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case 'POPULATE_CAMPAIGNS_REQUEST':
      return {
        ...state,
        isPopulating: true,
      };
    case 'POPULATE_CAMPAIGNS_SUCCESS':
      storage.setItem('campaigns.populated', '1');
      return {
        ...state,
        isPopulating: false,
        populated: true,
      };
    default:
      return state;
  }
};