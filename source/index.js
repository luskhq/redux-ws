export default function createSocketMiddleware(socket) {

  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action({ dispatch, socket, getState });
    }

    return next(action);

  };
}
