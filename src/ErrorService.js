export default class ErrorService {
  static parseErrorMessage(errorType) {
    let message = '';
    switch (errorType) {
      case "unsupported-code": {
        message += `The supplied currency code is not supported. See <a href="https://www.exchangerate-api.com/docs/supported-currencies">list of supported currencies</a>`;
        break;
      }
      case "base-code-only-on-pro": {
        message += "The request to the free.exchangerate-api.com endpoint was for a base code besides USD or EUR";
        break;
      }
      case "malformed-request": {
        message += "Some portion of the request to free.exchangerate-api.com did not follow their required structure or protocol.";
        break;
      }
      case "invalid-key": {
        message += "The API key used in this query was invalid.";
        break;
      }
      case "quota-reached": {
        message += "The account used to query exchangerate-API has reached or exceeded its quota of requests in its current plan (FREE).";
        break;
      }
      case "not-available-on-plan": {
        message += "The free plan &mdash; in use on this page &mdash; does not support this type of request.";
        break;
      }
      default: {
        message += "An error has occurred. The exact nature of this error could not be determined from exchangerate-API's response.";
        break;
      }
    }
    return message;
  }
}