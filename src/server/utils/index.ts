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

export const responseHandler = (r, h) => {
  try {
    const additionalHeaders = {
      'access-control-allow-credentials': config.cors.allowCredentials,
      'access-control-allow-origin': config.cors.origins
    };
    if (r.app.error || (r.response.isBoom && r.response.data)) {
      const errorData = r.app.error ? r.app.error.data : r.response.data;
      const { message } = r.app.error ? r.app.error.output.payload : r.response.output.payload;
      r.response = h.response({
        ok: false,
        code: errorData.code,
        data: errorData.data,
        msg: message
      }).code(Math.floor(errorData.code / 1000));
    }

    r.response.headers = { ...r.response.headers, ...additionalHeaders };

    return h.continue;
  } catch (e) {
    console.log(e);
  }
};

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
