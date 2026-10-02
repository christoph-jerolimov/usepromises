import { PromiseResult, PromiseAction } from './types.js';

export function defaultReducer<Resolved, Rejected>(
  prevState: PromiseResult<Resolved, Rejected>,
  action: PromiseAction<Resolved, Rejected>
): PromiseResult<Resolved, Rejected> {
  switch (action.type) {
    case 'RESOLVED':
      return { isPending: false, isResolved: true, isRejected: false, value: action.value };
    case 'REJECTED':
      return { isPending: false, isResolved: false, isRejected: true, error: action.error };
    default:
      return prevState;
  }
}

export const initialState: { isPending: true; isResolved: false; isRejected: false } = {
  isPending: true,
  isResolved: false,
  isRejected: false,
};
