import randomWords from 'random-words';

class Stub {
  generateCampaign(data = {}) {
    const now = Date.now();
    const year = 365 * 24 * 60 * 60 * 1000;
    return {
      name: this.generateName(),
      startDate: this.generateDate(now - year * 2, now - year).toISOString(),
      endDate: this.generateDate(now - year, now + year / 2).toISOString(),
      budget: this.generateIntegerInRange(100000, 10000000),
      ...data,
    };
  }

  generateName() {
    const [word] = randomWords(1);
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  generateDate(timestampMin, timestampMax) {
    return new Date(this.generateIntegerInRange(timestampMin, timestampMax));
  }

  generateIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default new Stub();