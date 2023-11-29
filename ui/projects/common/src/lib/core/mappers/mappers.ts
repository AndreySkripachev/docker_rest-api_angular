import { EntityValidationErrors } from '../models/app-error';

import { ValidationErrorDto } from '../dtos/validation-error.dto';

/** Mapper of DTO to domain model. */
export interface MapperFromDto<TDto, TDomain> {

	/** Maps from DTO to domain model. */
	fromDto(dto: TDto): TDomain;
}

/** Mapper of domain model to DTO. */
export interface MapperToDto<TDto, TModel> {

	/** Maps from domain model to DTO. */
	toDto(model: TModel): TDto;
}

/** Mapper of errors of DTO to domain model errors. */
export interface ValidationErrorMapper<TDto, TModel> {

	/**
	 * Map validation error DTO to error for domain model.
	 * @param errorDto Error DTO.
	 */
	validationErrorFromDto(
		errorDto: ValidationErrorDto<TDto>
	): EntityValidationErrors<TModel>;
}

/** Mapper from DTO to domain model and vice versa. */
export interface Mapper<TDto, TModel>
	extends MapperFromDto<TDto, TModel>,
	MapperToDto<TDto, TModel> {}
