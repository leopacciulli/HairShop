import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetForgotPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetForgotPasswordController = new ResetForgotPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetForgotPasswordController.create);

export default passwordRouter;
