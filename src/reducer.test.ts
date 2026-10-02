import { describe, it, expect } from 'vitest';
import { defaultReducer, initialState } from './reducer.js';
import { PromiseAction } from './types.js';

describe('defaultReducer', () => {
  it('changes state for resolved action', () => {
    const prevState = initialState;
    const action: PromiseAction<string, never> = { type: 'RESOLVED', value: 'yeah' };
    const nextState = defaultReducer(prevState, action);

    expect(prevState).toEqual({
      isPending: true,
      isResolved: false,
      isRejected: false,
    });
    expect(nextState).toEqual({
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

    expect(prevState).toEqual({
      isPending: true,
      isResolved: false,
      isRejected: false,
    });
    expect(nextState).toEqual({
      isPending: false,
      isResolved: false,
      isRejected: true,
      error: 'nope',
    });
  });
});
