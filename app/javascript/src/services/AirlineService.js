import Config from "../utils/config";
import RestClient from "../utils/RestClient";

class AirlineService {
    static async fetchAllAirlines() {
        try {
            return await RestClient.get(Config.URLS.AIRLINES_INDEX, {});
        } catch(e) {
            return { message: 'error fetching response', error: e }
        }

    }
}

export default AirlineService
