import ErrorService from './ErrorService.js';

export default class MoneyService {
  static async getXChangeRates( iSOCode ) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${iSOCode}`);
      const jaySonResponse = await response.json();
      if (!jaySonResponse.ok || jaySonResponse.result == "error") {
        throw Error(jaySonResponse["error-type"]);
      }
      return jaySonResponse;
    } catch(error) {
      return ErrorService.parseErrorMessage(error);
    }
  }
}