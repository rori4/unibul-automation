const moment = require("moment");
const DateFormats = {
  short: "DD MMMM YYYY",
  long: "dddd DD.MM.YYYY HH:mm"
};

module.exports = {
  inc: function(value, options) {
    return parseInt(value) + 1;
  },
  formatDate: function(datetime, format) {
    if (moment) {
      // can use other formats like 'lll' too
      format = DateFormats[format] || format;
      return moment(datetime).format(format);
    } else {
      return datetime;
    }
  },
  ifEquals: function(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
};
