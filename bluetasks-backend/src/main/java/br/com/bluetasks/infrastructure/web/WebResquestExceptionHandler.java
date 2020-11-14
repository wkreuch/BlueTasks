package br.com.bluetasks.infrastructure.web;

import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.bluetasks.domain.task.DuplicateTaskException;

@RestControllerAdvice
public class WebResquestExceptionHandler {

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public RestResponseError handlerException(RepositoryConstraintViolationException e) {
		return RestResponseError.fromValidationError(e.getErrors());
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public RestResponseError handlerException(DuplicateTaskException e) {
		return RestResponseError.fromMessage(e.getMessage());
	}
}
