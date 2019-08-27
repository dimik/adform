import { isWithinInterval, parse as parseDate, format as formatDate } from 'date-fns';

class DatesUtil {
  formatDateString(dateString) {
    return formatDate(new Date(dateString), 'MM/dd/yyyy');
  }

  parseDateString(dateString) {
    return parseDate(dateString, 'M/d/yyyy', new Date());
  }

  formatDateStringISO(dateString) {
    return formatDate(this.parseDateString(dateString), "yyyy-MM-dd'T'HH:mm:ss");
  }

  formatDateLocalized(date) {
    return formatDate(date, 'P');
  }

  isWithinInterval(date, { startDate, endDate }) {
    return isWithinInterval(date, {
      start: new Date(startDate),
      end: new Date(endDate),
    });
  }
}

export default new DatesUtil();