# passport-keycloak-jwt-introspect

By using [Keycloak](https://www.keycloak.org/), you can validate access tokens in different ways: online or offline.

This [Passport](https://www.passportjs.org/) strategy allows you to perform an online validation of an access token by doing instrospect.


## Installation
```shell
npm install passport-keycloak-jwt-introspect
```

## Usage

#### Configuration
```javascript
import keycloak from "passport-keycloak-jwt-introspect";
const KeycloakJwtIntrospectStrategy = keycloak.Strategy;

passport.use(
    new KeycloakJwtIntrospectStrategy(
      {
        clientId: KEYCLOAK_CLIENT_ID,
        clientSecret: KEYCLOAK_CLIENT_SECRET,
        introspectUrl: KEYCLOAK_INTROSPECT_URL,
        passReqToCallback: true,
      },
      function (req, keycloakData, done) {
        // You should always check that the token is active!
        if (!keycloakData.active) return done(null, false);

        // You can use all info. in jwtPayload to make your validations and create your user
        return done(null, jwtPayload);
      },
    ),
);
```

**KEYCLOAK_INTROSPECT_URL_EXAMPLE:**  http://localhost:8080/realms/YOUR_REALM/protocol/openid-connect/token/introspect

Check out [Keycloak Data Example](doc/keycloak_data_example.json) JSON file to learn about all available attributes in the object.

#### Request authentication
Since this is a Bearer-like strategy, you don't have to use sessions. The token will be validated on every request.

We could create a function to use as middleware and validate every request:
```javascript
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("keycloak-jwt-introspect", { session: false })(
    req,
    res,
    next,
  );
};
```

Then, we can use it wherever we need to. For example, as a global middleware for our app:
```javascript
app.use(checkAuth);
```

## Examples
Example usage cases and configuration are coming soon. Any help is appreciated, so feel free to contribute!

## TODO
- [ ] Improve documentation
- [ ] Add more unit tests, specially to check different responses from keycloak
- [ ] Create usage examples
- [ ] Add repository badges

## Issues and contributing
As I said, any help is appreciated. You can report any issue on the [Issues page](https://github.com/M4RC0Sx/passport-keycloak-jwt-introspect/issues) as well as making a pull request to improve any aspect of the project.

## License
[The MIT License](http://opensource.org/licenses/MIT)



