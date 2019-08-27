import Dexie from 'dexie';

const db = window.db = new Dexie('AdformDB');
db.version(1).stores({ campaigns: '++id,name,startDate,endDate,budget' });

/**
 * If the campaign has a startDate that is contained in the range, it should show.
 * If the campaign has an endDate that is contained in the range, it should show.
 */
function findCampaignsByDateRange({ startDate, endDate }) {
  /*
  return db.campaigns.where('[startDate+endDate]')
    .between([
      startDate || Dexie.minKey,
      startDate || Dexie.minKey,
    ], [
        endDate || Dexie.maxKey,
        endDate || Dexie.maxKey,
      ]);
  */
  return db.campaigns
    .where('startDate')
    .between(startDate || Dexie.minKey, endDate || Dexie.maxKey)
    .or('endDate')
    .between(startDate || Dexie.minKey, endDate || Dexie.maxKey);
}

function findCampaignsByNamePrefix({ name }) {
  return db.campaigns.where('name')
    .startsWithIgnoreCase(name);
}

class AdformApi {
  addCampaigns(data) {
    return db.transaction('rw', db.campaigns, function* () {
      return yield db.campaigns.bulkPut(data);
    });
  }

  findCampaigns({ name, startDate, endDate, offset = 0, limit = Number.POSITIVE_INFINITY }) {
    if (!(name || startDate || endDate)) {
      return db.transaction('r', db.campaigns, async function () {
        const [items, total] = await Promise.all([
          db.campaigns.offset(offset).limit(limit).toArray(),
          db.campaigns.count(),
        ]);

        return { items, total };
      });
    }
    return db.transaction('r', db.campaigns, async function () {
      const results = await Promise.all([
        name && findCampaignsByNamePrefix({ name }).primaryKeys(),
        (startDate || endDate) && findCampaignsByDateRange({ startDate, endDate }).primaryKeys(),
      ].filter(Boolean));

      const primaryKeys = results.reduce((a, b) => {
        const set = new Set(b);
        return a.filter(k => set.has(k));
      });

      const items = await db.campaigns.where(':id')
        .anyOf(primaryKeys)
        .offset(offset)
        .limit(limit)
        .toArray();

      return { items, total: primaryKeys.length };
    });
  }

  countCampaigns() {
    return db.campaigns.count();
  }
}

export default new AdformApi();