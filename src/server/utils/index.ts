import { v4 as uuidv4 } from 'uuid';
import { Boom } from '@hapi/boom';
import * as FileType from 'file-type';
import config from '../config/config';

interface IFileWithExt {
  data: Buffer;
  fileExt: string;
}

interface IOutput {
  ok: boolean
  result: object | null
}

export type ResponseData = IOutput | Boom

export function getUUID(): string {
  return uuidv4();
}

export function output(res?: object | null): IOutput {
  return {
    ok: true,
    result: res
  };
}

export function error(code: number, msg: string, data: object): Boom {
  return new Boom(msg, {
    data: {
      code,
      data,
      api: true
    },
    statusCode: Math.floor(code / 1000)
  });
}

export function responseHandler(r, h) {
  // Handle default hapi errors (like not found, etc.)
  if (r.response.isBoom && r.response.data === null) {
    r.response = h
        .response({
          ok: false,
          code: Math.floor(r.response.output.statusCode * 1000),
          data: {},
          msg: r.response.message
        })
        .code(r.response.output.statusCode);
    return h.continue;
  }

  // Handle custom api error
  if (r.response.isBoom && r.response.data.api) {
    r.response = h
        .response({
          ok: false,
          code: r.response.data.code,
          data: r.response.data.data,
          msg: r.response.output.payload.message
        })
        .code(Math.floor(r.response.data.code / 1000));
    return h.continue;
  }

  // Handle non api errors with data
  if (r.response.isBoom && !r.response.data.api) {
    r.response = h
        .response({
          ok: false,
          code: Math.floor(r.response.output.statusCode * 1000),
          data: r.response.data,
          msg: r.response.message
        })
        .code(r.response.output.statusCode);
    return h.continue;
  }

  return h.continue;
}

export async function handleValidationError(r, h, err) {
  return error(
      400000,
      'Validation error',
      err.details.map((e) => ({ field: e.context.key, reason: e.type.replace('any.', '') }))
  );
}

export const getFileExt = async (file: Buffer): Promise<IFileWithExt> => {
  if (!Buffer.isBuffer(file)) {
    throw error(400000, 'This file type is now allowed', null);
  }

  const fileExt = await FileType.fromBuffer(file);
  if (!fileExt || !fileExt.ext.match(config.files.allowedExtensions)) {
    throw error(400000, 'This file type is now allowed', null);
  }

  return { data: file, fileExt: fileExt.ext };
};
