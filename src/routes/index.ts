import { Request, Router} from 'express';

import CashFlowRouter  from './CashFlows';
import UsersRouter from './Users';
import PropertiesRouter  from './Properties';
import apiKeyMW from '@middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';

const router  = Router();

// http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);
router.use('/security', apiKeyMW, UsersRouter);
router.use('/properties', apiKeyMW, jwtValidator, PropertiesRouter);


export default router;

export interface WithUserRequest extends Request {
  user?: any;
}
