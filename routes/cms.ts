import express, { NextFunction, Request, Response } from "express";
import { hash, genSalt } from "bcrypt";
import { generate } from "randomstring";
import invariant from "tiny-invariant";

const router = express.Router();
const token = process.env.AUTH_TOKEN

//Log in
router.get('/auth', async (req: Request, res: Response, next: NextFunction) => {
  
  let hashedToken = await encryptToken(generate());
  console.log('token', hashedToken);

  // Set up the cookie w/ encrypted token
  res.cookie('_sunnysessionauth', {
    time: Date.now(),
    token: hashedToken,
  },
    {
      secure: true,
      signed: true,
    })
  
  res.render('auth', {
    title: 'Please Sign In',
    action: 'validate'
  });
});

//Create Account
router.get('/admin', async (req: Request, res: Response, next: NextFunction) => {
  // let hashedPassword = await encryptToken(req.body.password);

  invariant(token, "AUTH_TOKEN not set!")
  
  if (req.query.auth === token) {
    res.render('auth', {
      title: 'Create an Account',
      action: 'new'
    });
  } else {
    res.render('error');
  }
});

async function encryptToken(input: string) {
    const salt = await genSalt(10);
    const newHash = await hash(input, salt);
    return newHash
}

module.exports = router;