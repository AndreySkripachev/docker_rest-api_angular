import { getAppVersion } from './version';

/** Production environment. */
export const environment = {
	production: true,
	apiUrl: process.env.NG_APP_API_URL,
	version: getAppVersion('prod'),
};
