class appErorr extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
  
}
module.exports = appErorr;
