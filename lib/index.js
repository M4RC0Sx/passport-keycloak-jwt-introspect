/**
 * The `passport-keycloak-jwt-introspect` module provides a {@link https://www.passportjs.org/ Passport}
 * strategy to authenticate requests by validating the token against the Keycloak server using the `introspect` endpoint.
 *
 * @module passport-keycloak-jwt-introspect
 * @author M4RC0Sx
 */

var Strategy = require("./strategy");

/**
 * Expose `Strategy` directly from package.
 * `{@link Strategy}` constructor.
 *
 * @type {function}
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 * `{@link Strategy}` constructor.
 *
 * @type {function}
 */
exports.Strategy = Strategy;
