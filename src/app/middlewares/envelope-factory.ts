import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath, ApiProperty } from '@nestjs/swagger';

export class Envelope<T> {
  @ApiProperty()
  timestampUtc: string;

  @ApiProperty()
  requestId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  data: T;
}

export function createEnvelope(
  requestId: string,
  data: any,
  status = 'OK',
  message = '',
): any {
  return {
    timestampUtc: new Date(Date.now()).toISOString(),
    requestId,
    status,
    message,
    data: data ?? null,
  };
}

// NOTE: Inspired from https://nartc.me/blog/nestjs-swagger-generics
export const ApiEnvelopedResponse = <TModel extends Type<any>>(
  model: TModel,
  status = 200,
) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Envelope) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
