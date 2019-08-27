import validator from '.';

describe('Validator', () => {
  it('invalidates empty array campaigns', () => {
    const result = validator.validateCampaigns([]);
  
    expect(result).toHaveProperty('campaigns', ['Campaigns can\'t be an empty array']);
  });

  it('invalidates campaign if the endDate is before the startDate', () => {
    const campaign = { 'id': 3, 'name': 'Miboo', 'startDate': '11/1/2017', 'endDate': '6/20/2017', 'Budget': 239507 };
    const result = validator.validateCampaign(campaign);

    expect(result).toHaveProperty('startDate', ['Start date must be no later than 6/20/2017']);
  });

  it('invalidates budget if it is not a number', () => {
    const campaign = { 'id': 3, 'name': 'Miboo', 'startDate': '11/1/2017', 'endDate': '6/20/2018', 'Budget': 'foo' };
    const result = validator.validateCampaign(campaign);

    expect(result).toHaveProperty('Budget', ['Budget must be of type number', 'Budget must be a valid number']);
  });

  it('invalidates name if it is absent', () => {
    const campaign = { 'id': 3, 'startDate': '11/1/2017', 'endDate': '6/20/2018', 'Budget': 239507 };
    const result = validator.validateCampaign(campaign);
    
    expect(result).toHaveProperty('name', ["Name can't be blank"]);
  });
});