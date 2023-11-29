import { App } from '../lib/app';
import { apiConfig } from '../config';
import { cors } from '../middleware/cors';
import { authRequired } from '../middleware/auth-required';
import { errorHandler } from '../middleware/error-handler';

export const app = new App({ host: apiConfig.host, port: apiConfig.port });

app.onError(errorHandler);
app.use(cors());
app.use(authRequired(['/users/profile/']));

console.log('Current settings:')
console.log(`Host: ${apiConfig.host}`);
console.log(`Port: ${apiConfig.port}`);
console.log('Starting server...');
