import { SUBSCRIBE, UNSUBSCRIBE } from './actions';

export default function createSocketIOMiddleware(io, url) {
  const socket = io(url);

  return ({ dispatch }) => (next) => (action) => {
    const { type } = action;
    if (type !== SUBSCRIBE || type !== UNSUBSCRIBE) {
      next(action);
    }

    if (type === SUBSCRIBE) {
      action.handlers.forEach((handler) => {
        socket.on(handler.event, (data) => dispatch(handler.action(data)));
      });
    }

    if (type === UNSUBSCRIBE) {
      action.handlers.forEach((handler) => {
        socket.removeListener(handler.event, (data) => dispatch(handler.action(data)));
      });
    }

    return next(action);

  };
}
