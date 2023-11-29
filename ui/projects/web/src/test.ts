// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { AppConfig } from '@saanbo/common/core/services/app.config';
import { TestAppConfig } from '@saanbo/common/testing/test-app-config';

import { provideWebAppRoutes } from './app/features/shared/web-route-paths';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(),
);

defineGlobalsInjections({
	providers: [
		{ provide: AppConfig, useClass: TestAppConfig },
		provideWebAppRoutes(),
	],
});
