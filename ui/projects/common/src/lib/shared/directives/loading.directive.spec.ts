import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { LoadingDirective } from './loading.directive';

describe('LoadingDirective', () => {
	let spectator: SpectatorDirective<LoadingDirective>;

	const createSpectator = createDirectiveFactory(LoadingDirective);

	beforeEach(() => {
		spectator = createSpectator(`<div saanbocLoading></div>`);
	});

	it('applies loading class on element', () => {
		spectator.setInput('saanbocLoading', true);
		expect(spectator.element.classList.contains('saanboc-loading')).toBe(true);
	});

	it('removes loading class on element', () => {
		spectator.setInput('saanbocLoading', false);
		expect(spectator.element.classList.contains('saanboc-loading')).toBe(false);
	});

	it('disables element', () => {
		spectator.setInput('saanbocLoading', true);
		expect(spectator.element.hasAttribute('disabled')).toBe(true);
	});

	it('enables element', () => {
		spectator.setInput('saanbocLoading', false);
		expect(spectator.element.hasAttribute('disabled')).toBe(false);
	});
});
