import express, { NextFunction, Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { generate } from "randomstring";
import invariant from "tiny-invariant";
import { createAuthUser } from "../graphql/create-auth-user";
import { adminRequestHeaders } from "../app";
import { getAuthUser } from "../graphql/get-auth-user";
import { createAuthSession } from "../graphql/create-auth-session";

const router = express.Router();
const token = process.env.AUTH_TOKEN

//Log in screen
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

//Create Account screen
router.get('/admin', async (req: Request, res: Response, next: NextFunction) => {
  
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

router.post('/account/new', async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body

  let encryptedPassword = await encryptToken(password)

  try {
    const user =  await createAuthUser({email: email, password: encryptedPassword}, adminRequestHeaders);
    const id = user.insert_auth_users_one.id
    
    res.render('auth', {
      title: 'Please Sign In',
      action: 'validate',
      message: 'New user added successfully', id,
      error: false
    });

    res.redirect("/auth");

  } catch (error) {
    res.render('auth', {
      message: 'There was a problem adding the user, please check the logs',
      title: 'Create an Account',
      action: 'new',
      error: true
    });
  }

});

router.post('/account/validate', async (req: Request, res: Response, next: NextFunction) => {
  
  const { email, password } = req.body

  const user = await getAuthUser({email: {_eq: email}}, adminRequestHeaders)

  const result = await validateToken(password, user.auth_users[0].password);

  if (!result) {
    res.render('auth', {
      title: 'Please Sign In',
      action: 'validate',
      message: 'Username or Password incorrect.',
      error: true
    });
  }

    // Set up the cookie w/ encrypted token
    let token = generate();
    let hashedToken = await encryptToken(token);
    let date = Date.now();
    
    res.cookie('_sunnysessionauth', {
      user_id: user.auth_users[0].id,
      time: date,
      token: hashedToken,
    },
      {
        secure: true,
        signed: true,
      })
    
    const authSession = await createAuthSession({user_id: user.auth_users[0].id, token: token, enc_token: hashedToken, date: date }, adminRequestHeaders)

    const hideTheToken = await validateToken(authSession.insert_auth_sessions_one.token, hashedToken);

    if (!hideTheToken) {
      res.render('auth', {
        title: 'Please Sign In',
        action: 'validate',
        message: 'Failed to set up user session, please try logging in again.',
        error: true
      });
    }

    res.redirect(`/episode?auth=${hashedToken}`)

});

async function encryptToken(input: string) {
    const salt = await genSalt(10);
    const newHash = await hash(input, salt);
    return newHash
}

const validateToken = async (input: string, hash: string) => compare(input, hash);

module.exports = router;