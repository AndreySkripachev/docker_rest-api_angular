import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '@saanbo/common/core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '@saanbo/common/core/interceptors/refresh-token.interceptor';
import { AppConfig } from '@saanbo/common/core/services/app.config';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { WebAppConfig } from './app/features/shared/web-app.config';
import { environment } from './environments/environment';
import { provideWebAppRoutes } from './app/features/shared/web-route-paths';

const httpInterceptorProviders = [
	// The refresh interceptor should be before the auth interceptor, otherwise refreshed bearer would not be updated
	{
		provide: HTTP_INTERCEPTORS,
		useClass: RefreshTokenInterceptor,
		multi: true,
	},
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule),
		...httpInterceptorProviders,
		{ provide: AppConfig, useClass: WebAppConfig },
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(appRoutes),
		provideWebAppRoutes(),
	],
})
	.catch(err => console.error(err));
