# [DEPRECATED] Redux WebSockets

**Use [redux-thunk](https://www.github.com/gaearon/redux-thunk) instead. Since v2.1.0 [identical functionality](https://www.github.com/gaearon/redux-thunk#injecting-a-custom-argument) can be achieved with that package.**

[This article](https://medium.com/@gethylgeorge/using-socket-io-in-react-redux-app-to-handle-real-time-data-c0e734297795) outlines an example of how to use redux-thunk with WebSockets. The implementation can be found in a Github repo, starting on [this file](https://github.com/Gethyl/RealTimeTodo/blob/master/src/js/components/Layout.js). The example uses socket.io, but using web sockets directly should be similar.

---

[![npm version](https://img.shields.io/npm/v/redux-ws.svg?style=flat-square)](https://www.npmjs.com/package/redux-ws)

WebSockets middleware for [Redux](http://rackt.github.io/redux). If you ever used [Redux Thunk](https://github.com/gaearon/redux-thunk) you already know how to use this.

## What Does it Do?

Redux WebSockets exposes a socket connection to any action creator that returns a function instead of a plain object. This way you can easily 'reach' your long-living socket from any thunk that goes through Redux.

## Usage

Write action creators that return functions instead of objects. Those functions will be immediately called with an object containing the socket, dispatch, and getState as the argument.

_Note that this is a bit different from Redux Thunk — you get passed on object, not dispatch/getState/socket directly. This is done to make it easier to reach either of them, without having to 'walk over' the parameters every time. I highly recommend using destructuring to get to the right parts of the object. See below._

```js
// An action creator returns a function that gets passed an object containing
// the socket, dispatch, and getState as an argument. I am using ES2015
// destructuring to take socket and dispatch from this object and
// subsequently use it.
function subscribeToUpdates() {
  return ({ socket, dispatch }) => {
    socket.on('update', dispatch(reactToUpdate()));
  };
}

// Regular Redux action creator...
function reactToUpdate() {...}

```

## Installation

Install from npm.

```bash
npm install --save redux-ws
```

Instantiate, pass the middleware creator your socket, and add to your middleware stack.

```js
import { createStore, applyMiddleware } from 'redux';
import createSocketMiddleware from 'redux-ws';
import io from 'socket.io-client';
import reducer from './reducers/index';

const socketMiddleware = createSocketMiddleware(io('http://example.com/socket'));

const store = createStore(
  reducer,
  applyMiddleware(socketMiddleware)
);

// Now just write your actions...

```

_The above example uses socket.io, but I don't see any reason this middleware couldn't be used with other WebSockets libraries — all it does is exposes your socket process to thunks. Check out the source._
