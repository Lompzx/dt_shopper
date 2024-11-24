//filtro de excessao
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionResponse } from 'src/interfaces/exceptionresponse.interface';
import * as os from 'os';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as ExceptionResponse;

        const errorDescription =
            Array.isArray(exceptionResponse.message)
                ? exceptionResponse.message.join('<br>')//Code-Smell 
                : exceptionResponse.message || 'Unexpected error';


        let errorCode = exceptionResponse.errorCode || 'INVALID_DATA';

        response.status(status).json({
            error_code: errorCode,
            error_description: errorDescription,
        });
    }
}
