import api from 'api';
import validator from 'util/validator';
import datesUtil from 'util/dates';
import stubUtil from 'util/stub';

function requestPopulateCampaigns() {
  return {
    type: 'POPULATE_CAMPAIGNS_REQUEST',
  };
}

function receivePopulateCampaigns() {
  return {
    type: 'POPULATE_CAMPAIGNS_SUCCESS',
  };
}

function requestCampaignsSearch(query) {
  return {
    type: 'SEARCH_CAMPAIGNS_REQUEST',
    query,
  };
}

function receiveCampaignsSearch(data) {
  return {
    type: 'SEARCH_CAMPAIGNS_SUCCESS',
    data,
    receivedAt: Date.now(),
  };
}

function fetchCampaignsSearch(query = {}) {
  return dispatch => {
    dispatch(requestCampaignsSearch(query));
    return api.findCampaigns(query)
      .then(data => dispatch(receiveCampaignsSearch(data)));
  };
}

function shouldFetchCampaigns({ campaigns }, query) {
  return !(campaigns.isLoading || campaigns.isPopulating);
}

function validateCampaigns(campaigns) {
  return campaigns
    // Validation
    .filter(campaign => {
      const error = validator.validateCampaign(campaign);
      if (error) {
        console.error('Campaign id="%d" is invalid', campaign.id);
        console.table(error);
        return false;
      }
      return true;
    })
    // Normalization
    .map(({ Budget, startDate, endDate, ...restProps }) => ({
      ...restProps,
      budget: Budget || restProps.budget,
      startDate: datesUtil.formatDateStringISO(startDate),
      endDate: datesUtil.formatDateStringISO(endDate),
    }));
}

export function populateCampaigns() {
  return (dispatch, getState) => {
    if (getState().campaigns.populated) {
      return Promise.resolve();
    }

    const campaigns = [];

    for (let i = 0; i < 10000; i++) {
      campaigns.push(stubUtil.generateCampaign());
    }

    dispatch(addCampaigns(campaigns, false));
  };
}

export function addCampaigns(campaigns = [], needValidate = true) {
  return dispatch => {
    dispatch(requestPopulateCampaigns());

    return api.addCampaigns(needValidate ? validateCampaigns(campaigns) : campaigns)
      .then(() => dispatch(receivePopulateCampaigns()));
  };
}

export function searchCampaigns(query = {}) {
  return (dispatch, getState) => {
    if (shouldFetchCampaigns(getState(), query)) {
      return dispatch(fetchCampaignsSearch(query));
    } else {
      return Promise.resolve();
    }
  };
}