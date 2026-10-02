import * as React from 'react';

export type PromiseResult<Resolved, Rejected> =
  | { isPending: true; isResolved: false; isRejected: false }
  | { isPending: false; isResolved: true; isRejected: false; value: Resolved }
  | { isPending: false; isResolved: false; isRejected: true; error: Rejected };

export type PromiseAction<Resolved, Rejected> =
  { type: 'RESOLVED'; value: Resolved } | { type: 'REJECTED'; error: Rejected };

export type PromiseReducer<Resolved, Rejected> = React.Reducer<
  PromiseResult<Resolved, Rejected>,
  PromiseAction<Resolved, Rejected>
>;
