import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Loading state directive. Applies loading state on element. Color and size are customizable via `--spinner-color` and `--spinner-size`.
 * @example
 * ```html
 * <button [saanbocLoading]="isLoading$ | async" (click)="isLoading$.next(true)">Submit</button>
 * ```
 *
 */
@Directive({
	selector: '[saanbocLoading]',
	standalone: true,
})
export class LoadingDirective {

	private readonly elementRef = inject(ElementRef<HTMLElement>);

	/** Loading beacon. */
	@Input()
	public set saanbocLoading(loading: boolean | null) {
		if (loading) {
			this.elementRef.nativeElement.classList.add('saanboc-loading');
			this.disable();
		} else {
			this.elementRef.nativeElement.classList.remove('saanboc-loading');
			this.enable();
		}
	}

	/** Enable element. */
	private disable(): void {
		this.elementRef.nativeElement.setAttribute('disabled', 'true');
	}

	/** Disable element. */
	private enable(): void {
		this.elementRef.nativeElement.removeAttribute('disabled');
	}
}
