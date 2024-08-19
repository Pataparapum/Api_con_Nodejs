import bodyParser from 'body-parser';
import * as authmiddleware from './tools/auth-middleware.js';

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt)
}

export {setupMiddlewares}