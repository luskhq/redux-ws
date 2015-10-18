export const SUBSCRIBE = 'redux-ws/subscribe';
export const UNSUBSCRIBE = 'redux-ws/unsubscribe';

export function subscribe(handlers) {
  return {
    type: SUBSCRIBE,
    handlers,
  };
}

export function unsubscribe(handlers) {
  return {
    type: UNSUBSCRIBE,
    handlers,
  };
}
