const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oaj1ntwqaajDQ3Ih0h7',
  issuer: 'https://dev-322018.oktapreview.com/oauth2/default'
});

module.exports =  async function oktaAuth(req, res, next) {
  try {
    const token = req.token;
    if (!token) {
      return res.status(401).send('Not Auhorised');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    return res.status(401).send(err.message);
  }
}
