# usePromises

**React and React Native hooks to consume a Promise (similar to `useEffect`) with full TypeScript support**

- `usePromise` runs a promise and returns its pending, resolved or rejected state.
- `useMountPromise` runs a promise once when the component mounts.
- `useUnmountPromise` runs a promise when the component unmounts.

The package ships ES module and CommonJS builds with type declarations, has no runtime dependencies, and works with any React version from 16.8 onwards, including React Native.

## Installation

```sh
npm install usepromises
```

or

```sh
yarn add usepromises
```

## Usage / Examples

### usePromise

`usePromise` accepts either a promise or a function that returns one, plus an optional dependency list that works exactly like the one of `useEffect`. Pass a function when the promise should be created inside the hook, so that it is not started again on every render.

```tsx
import { usePromise } from 'usepromises';

interface SampleResponse {
  slideshow: {
    title: string;
  };
}

function Example() {
  const response = usePromise<SampleResponse>(async () => {
    const response = await fetch('https://httpbin.org/json');
    return response.json();
  }, []);

  return (
    <div>
      {response.isPending && 'Loading…'}

      {response.isResolved && response.value.slideshow.title}

      {response.isRejected ? `Error: ${response.error}` : null}
    </div>
  );
}
```

The returned object is a discriminated union, so TypeScript narrows `value` and `error` for you:

| State    | `isPending` | `isResolved` | `isRejected` | Available field |
| -------- | ----------- | ------------ | ------------ | --------------- |
| Pending  | `true`      | `false`      | `false`      |                 |
| Resolved | `false`     | `true`       | `false`      | `value`         |
| Rejected | `false`     | `false`      | `true`       | `error`         |

The first type parameter is the resolved value. The optional second one is the rejection type and defaults to `Error`:

```tsx
const response = usePromise<SampleResponse, string>(fetchSomething, []);
```

If the function you pass throws synchronously, the hook reports that as a rejection too.

### useMountPromise

Runs the promise once after the component has mounted. A rejection is logged with `console.warn` and does not throw.

```tsx
import { useState } from 'react';
import { useMountPromise } from 'usepromises';

interface SampleData {
  slideshow: {
    title: string;
  };
}

function Example() {
  const [data, setData] = useState<SampleData>();

  useMountPromise(async () => {
    const response = await fetch('https://httpbin.org/json');
    setData(await response.json());
  });

  return <div>{data?.slideshow.title}</div>;
}
```

### useUnmountPromise

Runs the promise when the component unmounts, for example to send a final request. A rejection is logged with `console.warn` and does not throw.

```tsx
import { useUnmountPromise } from 'usepromises';

function Example() {
  useUnmountPromise(async () => {
    const response = await fetch('https://httpbin.org/json');
    console.warn('Server status code:', response.status);
  });

  return <div>…</div>;
}
```

## Development

The library is built with plain `tsc`, tested with Node's built-in test runner and needs Node 22 or newer.

```sh
npm ci
npm run build   # emits dist/esm and dist/cjs with type declarations
npm test        # runs src/**/*.test.ts with node --test
npm run lint    # type-checks and verifies formatting
```

## License

[MIT](LICENSE)
