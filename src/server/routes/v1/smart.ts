import * as handlers from '../../api/v1/smart';
import { ServerRoute } from '@hapi/hapi';
import * as schemes from '../../schemes/smart';

export default [
  {
    method: 'POST',
    path: '/v1/smart/approve',
    handler: handlers.approve,
    options: {
      id: 'v1.smart.approve',
      auth: false,
      tags: ['api', 'v1', 'smart'],
      description: 'For approve',
      notes: 'For approve',
      validate: {
        payload: schemes.approvePayload
      }
    }
  },
  {
    method: 'POST',
    path: '/v1/smart/deposit',
    handler: handlers.deposit,
    options: {
      id: 'v1.smart.deposit',
      auth: false,
      tags: ['api', 'v1', 'smart'],
      description: 'For deposit',
      notes: 'For deposit',
      validate: {
        payload: schemes.depositPayload
      }
    }
  },
  {
    method: 'GET',
    path: '/v1/smart/tokens',
    handler: handlers.getTokens,
    options: {
      id: 'v1.smart.tokens',
      auth: false,
      tags: ['api', 'v1', 'smart'],
      description: 'For get token list for smart contract',
      notes: 'For get token list for smart contract'
    }
  },
  {
    method: 'GET',
    path: '/v1/smart/info/{type}/{token}',
    handler: handlers.getTokenInfo,
    options: {
      id: 'v1.smart.info',
      auth: false,
      tags: ['api', 'v1', 'smart'],
      description: 'For get token list for smart contract',
      notes: 'For get token list for smart contract',
      validate: {
        params: schemes.getTokenInfoParams
      }
    }
  },
  {
    method: 'POST',
    path: '/v1/smart/withdraw',
    handler: handlers.withdraw,
    options: {
      id: 'v1.smart.withdraw',
      auth: false,
      tags: ['api', 'v1', 'smart'],
      description: 'For withdraw',
      notes: 'For withdraw',
      validate: {
        payload: schemes.withdrawPayload
      }
    }
  }
] as ServerRoute[];
