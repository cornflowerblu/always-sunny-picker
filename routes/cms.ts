import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

//Test auth
router.get('/auth', (req: Request, res: Response, next: NextFunction) => {
  res.render('auth', {})
});

module.exports = router;