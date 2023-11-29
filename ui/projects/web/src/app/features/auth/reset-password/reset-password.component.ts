import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordReset, passwordResetDataSchema } from '@saanbo/common/core/models/password-reset';
import { UserService } from '@saanbo/common/core/services/user.service';
import { catchValidationData } from '@saanbo/common/core/utils/rxjs/catch-validation-error';
import { toggleExecutionState } from '@saanbo/common/core/utils/rxjs/toggle-execution-state';
import { FlatControlsOf } from '@saanbo/common/core/utils/types/controls-of';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LabelComponent } from '@saanbo/common/shared/components/label/label.component';
import { LoadingDirective } from '@saanbo/common/shared/directives/loading.directive';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { injectWebAppRoutes } from '../../shared/web-route-paths';

type ResetPasswordFormData = FlatControlsOf<PasswordReset.Data>;

/** Page for requesting password reset. */
@Component({
	selector: 'saanbow-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['../auth.css', './reset-password.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		ReactiveFormsModule,
		LabelComponent,
		RouterLink,
		LoadingDirective,
		NgIf,
		AsyncPipe,
	],
})
export class ResetPasswordComponent {

	/** Reset link result. */
	protected readonly resetResult$ = new ReplaySubject<string>(1);

	/** Whether the form is loading. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Form with data required to reset the password. */
	protected readonly form: FormGroup<ResetPasswordFormData>;

	/** Auth child route paths. */
	protected readonly authChildPaths = injectWebAppRoutes().auth.children;

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.form = this.initResetPasswordForm();
	}

	/** Handles form submission. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) {
			return;
		}

		this.userService
			.resetPassword(passwordResetDataSchema.parse(this.form.value))
			.pipe(
				toggleExecutionState(this.isLoading$),
				catchValidationData(this.form),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(this.resetResult$);
	}

	private initResetPasswordForm(): FormGroup<ResetPasswordFormData> {
		return this.fb.group<ResetPasswordFormData>({
			email: this.fb.control('', [Validators.required, Validators.email]),
		});
	}
}
