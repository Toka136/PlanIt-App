class appErorr extends Error {
  constructor() {
    super();
  }
  create(message, statusCode, statusText) {
    (this.message = message),
      (this.statusCode = statusCode),
      (this.statusText = statusText);
    return this;
  }
}
module.exports = new appErorr();
