import { createNamespace } from 'cls-hooked';

export const requestContext = createNamespace('app-context');

export const setTx = (tx) => requestContext.set('tx', tx);
export const getTx = () => requestContext.get('tx');