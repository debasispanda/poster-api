class Response {
  constructor(data, message = "") {
    this.data = data;
    this.message = message;

    return this.toJSON();
  }

  toJSON() {
    let response = {};

    if (this.data) {
      response.data = this.data;
    }

    if (this.message) {
      response.message = this.message;
    }

    return response;
  }
}

module.exports = { Response };
