# Secure GraphQL + Vue Example

This example app shows how to use GraphQL and Vue.js to build a Olympic Events app and add authentication with Okta.

Please read [Use Vue and GraphQL to Build a Secure App](https://developer.okta.com/blog/2019/11/11/graphql-vue) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/) and an internet connection.

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git https://github.com/oktadeveloper/okta-graphql-vue-olympics-example.git graphql-vue
cd graphql-vue
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the GraphQL API, cd into the `olympics-server` folder and install its dependencies:
 
```bash
npm i
```

Then start the server `node index.js`.

To run the client, cd into the `olympics-client` folder and run:
 
```bash
npm i
npm run serve
```

You won't be able to login unless you configure the app to use your Okta organization.

### Setup Okta

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, and give the app a name you’ll remember. 

On the following screen, select `Authorization Code` for **Grant type allowed** and click **Done** to finalize the set-up.

#### Server Configuration

Open `olympics-server/auth.js` and replace `{yourOktadomain}` and `{yourClientId}` in the following code block. 

```ts
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '{yourClientId}',
  issuer: 'https://{yourOktaDomain}/oauth2/default'
});
```

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.okta.com`. Make sure you don't include `-admin` in the value!

#### Client Configuration

For the client, set the `issuer` and `client_id` in `olympics-client/main.js`.

```js
Vue.use(Auth, {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  client_id: '{yourClientId}',
  redirect_uri: 'http://localhost:8080/callback',
  pkce: true
});
```

Then restart both your server and client and you should be able to authenticate!

## Links

This example uses the following libraries provided by Okta:

* [Okta JWT Verifier](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta Vue SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2019/11/11/graphql-vue), or visit our [Okta Developer Forums](https://devforum.okta.com/). 

## License

Apache 2.0, see [LICENSE](LICENSE).
