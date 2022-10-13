import { Request, Response } from "express";
import { compare } from "bcrypt";
import InitGraphQL from "./graphql";
import { getAuthSession } from "../graphql/get-auth-session";
import { getShows } from "../graphql/select-episode-filters/get-shows";

const client = InitGraphQL();

export async function authService(req: Request, res: Response, view: string) {
  let isExpired = (date: string) => date > new Date().toISOString();

  const shows = await getShows({}, client.adminRequestHeaders)
  
  let hash;
  let dbEncryptToken;
  let token;
  let expired;

  try {
    hash = req.signedCookies._sunnysessionauth.token
    dbEncryptToken = await getAuthSession({_eq: hash}, client.adminRequestHeaders)
    token = dbEncryptToken.auth_sessions[0]?.token,
    expired = isExpired(dbEncryptToken.auth_sessions[0]?.time);
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});   
  }


  let auth;
  try {
    auth = await compare(token, hash)
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
  }

  if (auth && !expired) {
    res.render(view, shows)
  } else {
    res.clearCookie('_sunnysessionauth');
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
  }
}