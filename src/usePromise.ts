import * as React from 'react';

import { PromiseResult } from './types.js';
import { defaultReducer, initialState } from './reducer.js';

export function usePromise<Resolved, Rejected = Error>(
  promise: Promise<Resolved> | (() => Promise<Resolved>),
  deps?: React.DependencyList
): PromiseResult<Resolved, Rejected> {
  const [state, dispatch] = React.useReducer(defaultReducer<Resolved, Rejected>, initialState);

  React.useEffect(() => {
    try {
      const pending = typeof promise === 'function' ? promise() : promise;
      pending.then(
        (value) => dispatch({ type: 'RESOLVED', value }),
        (error) => dispatch({ type: 'REJECTED', error })
      );
    } catch (error) {
      dispatch({ type: 'REJECTED', error: error as Rejected });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
