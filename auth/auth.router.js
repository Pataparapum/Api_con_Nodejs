import express from "express";
const router = express.Router();

import * as authHttpHandler from './auth.http.js';

router.route('/login')
    .post(authHttpHandler.login);

export {router}