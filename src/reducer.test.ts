import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { defaultReducer, initialState } from './reducer.ts';
import type { PromiseAction } from './types.ts';

describe('defaultReducer', () => {
  it('changes state for resolved action', () => {
    const prevState = initialState;
    const action: PromiseAction<string, never> = { type: 'RESOLVED', value: 'yeah' };
    const nextState = defaultReducer(prevState, action);

    assert.deepEqual(prevState, {
      isPending: true,
      isResolved: false,
      isRejected: false,
    });
    assert.deepEqual(nextState, {
      isPending: false,
      isResolved: true,
      isRejected: false,
      value: 'yeah',
    });
  });

  it('changes state for rejected errors', () => {
    const prevState = initialState;
    const action: PromiseAction<never, string> = { type: 'REJECTED', error: 'nope' };
    const nextState = defaultReducer(prevState, action);

    assert.deepEqual(prevState, {
      isPending: true,
      isResolved: false,
      isRejected: false,
    });
    assert.deepEqual(nextState, {
      isPending: false,
      isResolved: false,
      isRejected: true,
      error: 'nope',
    });
  });
});
