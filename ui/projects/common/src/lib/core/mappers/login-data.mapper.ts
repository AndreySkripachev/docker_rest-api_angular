import { Injectable } from '@angular/core';

import { EntityValidationErrors } from '../models/app-error';
import { Login } from '../models/login';

import { LoginDto } from '../dtos/login.dto';
import { ValidationErrorDto } from '../dtos/validation-error.dto';

import { extractErrorMessage } from './extract-error-message';
import { MapperToDto, ValidationErrorMapper } from './mappers';

/** Login data mapper. */
@Injectable({
	providedIn: 'root',
})
export class LoginDataMapper
implements
    MapperToDto<LoginDto, Login>,
    ValidationErrorMapper<LoginDto, Login> {
	/** @inheritdoc */
	public validationErrorFromDto(
		errorDto: ValidationErrorDto<LoginDto> | null | undefined,
	): EntityValidationErrors<Login> {
		return {
			email: extractErrorMessage(errorDto?.email),
			password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
		};
	}

	/** @inheritdoc */
	public toDto(model: Login): LoginDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
