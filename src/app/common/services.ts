import { Config } from "../../config";
import { HttpClient } from "../../utils";

export class BaseService {
	private static kerosApi: HttpClient;

	public static get api() {
		if (!BaseService.kerosApi) {
			BaseService.kerosApi = new HttpClient(Config.backendBaseUrl);
		}
		return {
			keros: BaseService.kerosApi
		};
	}
}
