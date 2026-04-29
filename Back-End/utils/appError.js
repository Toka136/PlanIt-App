class appErorr extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
  }
  
}
module.exports = appErorr;
