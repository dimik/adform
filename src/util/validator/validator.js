import validate from 'validate.js';
import { parse as parseDate, format as formatDate } from 'date-fns';

const campaignConstraints = {
  id: {
    type: 'integer',
    numericality: {
      onlyInteger: true,
      strict: true,
      greaterThan: 0,
    },
  },
  name: {
    type: 'string',
    presence: { allowEmpty: false },
  },
  startDate: {
    type: 'string',
    presence: { allowEmpty: false },
    datetime: function (value, attributes, attributeName, options, constraints) {
      return {
        latest: attributes.endDate,
      }
    },
  },
  endDate: {
    type: 'string',
    presence: { allowEmpty: false },
    datetime: function (value, attributes, attributeName, options, constraints) {
      return {
        earliest: attributes.startDate,
      }
    },
  },
  Budget: {
    presence: true,
    type: 'number',
    numericality: {
      strict: true,
      greaterThan: 0,
    },
  },
};

const campaignsConstraints = {
  type: 'array',
  presence: { allowEmpty: false, message: "can't be an empty array" },
};

validate.extend(validate.validators.datetime, {
  parse: function (value) {
    return Number(parseDate(value, 'M/d/yyyy', new Date()));
  },
  format: function (value) {
    return formatDate(value, 'M/d/yyyy');
  },
});

class Validator {
  validateCampaign(campaign) {
    return validate(campaign, campaignConstraints);
  }

  validateCampaigns(campaigns) {
    return validate({ campaigns }, { campaigns: campaignsConstraints });
  }
}

export default new Validator();