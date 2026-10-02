import * as React from 'react';

export function useMountPromise(promise: Promise<any> | (() => Promise<any>)) {
  React.useEffect(() => {
    try {
      const pending = typeof promise === 'function' ? promise() : promise;
      pending.then(
        () => null,
        (error) => console.warn('useMountPromise failed:', error)
      );
    } catch (error) {
      console.warn('useMountPromise failed:', error);
    }
  }, []);
}
