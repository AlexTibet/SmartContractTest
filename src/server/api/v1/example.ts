import { output, error } from '../../utils';
import { Boom } from '@hapi/boom';

export const exampleHandler = async (r): Promise<object | Boom> => {
  try {
    const { exampleParam } = r.params;
    return output({ message: exampleParam });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};
