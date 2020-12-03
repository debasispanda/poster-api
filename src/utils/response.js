class Response {
  constructor(data, message = '') {
    this.data = data;
    this.message = message;
  }

  toJSON() {
    return { data: this.data, message: this.message };
  }
}

module.exports = Response;
