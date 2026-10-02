import * as React from 'react';

export function useUnmountPromise(promise: Promise<any> | (() => Promise<any>)) {
  React.useEffect(() => {
    return () => {
      try {
        const pending = typeof promise === 'function' ? promise() : promise;
        pending.then(
          () => null,
          (error) => console.warn('useUnmountPromise failed:', error)
        );
      } catch (error) {
        console.warn('useUnmountPromise failed:', error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
