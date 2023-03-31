import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import { ApplicationMiddleware } from "./application.handler";

const sagaMiddleware = createSagaMiddleware();

export const setupMiddleware = () => {
  const middleware = applyMiddleware(
    ...[sagaMiddleware, ApplicationMiddleware]
  );
  return {
    middleware,
    sagaMiddleware,
  };
};
