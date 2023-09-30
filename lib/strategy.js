var passport = require("passport-strategy"),
  util = require("util");

/**
 * KeycloakJwtIntrospectStrategy Constructor
 *
 * @classdesc This `Strategy` authenticates reuqest by validating the token
 * against the Keycloak server using the `introspect` endpoint.
 *
 * @public
 * @class
 * @augments passport.Strategy
 * @param {Object} [options]
 * @param {string} [options.introspectUrl] - Keycloak introspect url.
 * @param {string} [options.clientId] - Keycloak client id.
 * @param {string} [options.clientSecret] - Keycloak client secret.
 * @param {boolean} [options.passReqToCallback] - If `true`, `req` is the first argument to the verify callback (default: `false`).
 *
 * @param {*} verify
 */
function KeycloakJwtIntrospectStrategy(options, verify) {
  passport.Strategy.call(this);
  this.name = "keycloak-jwt-introspect";

  this._introspectUrl = options.introspectUrl;
  this._clientId = options.clientId;
  this._clientSecret = options.clientSecret;

  if (!this._introspectUrl) {
    throw new TypeError(
      "KeycloakJwtIntrospectStrategy requires a introspectUrl option!"
    );
  }
  if (!this._clientId) {
    throw new TypeError(
      "KeycloakJwtIntrospectStrategy requires a clientId option!"
    );
  }
  if (!this._clientSecret) {
    throw new TypeError(
      "KeycloakJwtIntrospectStrategy requires a clientSecret option!"
    );
  }
  this._passReqToCallback = options.passReqToCallback || false;

  this._verify = verify;
  if (!this._verify) {
    throw new TypeError(
      "KeycloakJwtIntrospectStrategy requires a verify callback!"
    );
  }
}

util.inherits(KeycloakJwtIntrospectStrategy, passport.Strategy);

/**
 * Authenticate request by introspecting the token against the Keycloak server.
 *
 * @protected
 * @param {http.IncomingMessage} req - The request to authenticate.
 * @param {Object} [options]
 *
 * This startegy should be used without session support.
 *
 * @example
 * passport.authenticate('keycloak-jwt-introspect', { session: false })
 */
KeycloakJwtIntrospectStrategy.prototype.authenticate = async function (
  req,
  options
) {
  var self = this;
  options = options || {};

  if (!req.headers.authorization) {
    return this.fail(401);
  }

  var token = req.headers.authorization.split(" ")[1];
  var requestData = {
    client_id: this._clientId,
    client_secret: this._clientSecret,
    token: token,
  };

  var urlParams = new URLSearchParams("");
  for (var key in requestData) {
    urlParams.append(key, requestData[key]);
  }

  var response = await fetch(this._introspectUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlParams,
  });

  if (!response.ok) {
    return this.fail(401);
  }

  var json = await response.json();
  var responseObj = JSON.parse(JSON.stringify(json));

  var verified = function (err, user, info) {
    if (err) {
      return self.error(err);
    }
    if (!user) {
      return self.fail(info);
    }
    self.success(user, info);
  };

  try {
    if (self._passReqToCallback) {
      self._verify(req, responseObj, verified);
    } else {
      self._verify(responseObj, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};

module.exports = KeycloakJwtIntrospectStrategy;
