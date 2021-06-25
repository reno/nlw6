import { Router } from 'express';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ComplimentController } from './controllers/ComplimentController';
import { IndexController } from './controllers/IndexController';
import { TagController } from './controllers/TagController';
import { UserController } from './controllers/UserController';

const router = Router();

const complimentController = new ComplimentController();
const indexController = new IndexController();
const tagController = new TagController();
const userController = new UserController();


router.get('/', indexController.handle);

router.post('/compliments', ensureAuthenticated, complimentController.create);
router.get(
  '/compliments/sent',
  ensureAuthenticated,
  complimentController.list_sent
);
router.get(
  '/compliments/received',
  ensureAuthenticated,
  complimentController.list_received
);

router.get('/tags', ensureAuthenticated, tagController.list);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  tagController.create
);
router.get('/tags/:id', ensureAuthenticated, tagController.detail);

router.post('/login', userController.authenticate);
router.get('/users', ensureAuthenticated, userController.list);
router.post('/users', userController.create);
router.get('/users/:id', ensureAuthenticated, userController.detail);

export { router };