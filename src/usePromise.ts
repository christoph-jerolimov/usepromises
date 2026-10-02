import * as React from 'react';

import type { PromiseResult } from './types.ts';
import { defaultReducer, initialState } from './reducer.ts';

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
  }, deps);

  return state;
}
