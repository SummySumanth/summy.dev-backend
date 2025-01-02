function Environment(NODE_ENV) {
  if (process.env.NODE_ENV === 'production') {
    const mediumToken = "";
    const hashnodeToken = "";
    this.keysAndValues = {
      mediumToken,
      hashnodeToken,
    };
  } else {
    const mediumToken = process.env.MEDIUM_API_KEY;
    const hashnodeToken = process.env.HASNHNODE_API_KEY;
    this.keysAndValues = {
      mediumToken,
      hashnodeToken,
    };
  }
  this.NODE_ENV = NODE_ENV || 'development';
}

module.exports = new Environment(process.env.NODE_ENV);
