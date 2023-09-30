const KeycloakJwtIntrospectStrategy = require("../lib/strategy");

describe("KeycloakJwtIntrospectStrategy", () => {
  const options = {
    introspectUrl:
      "http://localhost:8080/realms/REALM/protocol/openid-connect/token/introspect",
    clientId: "keycloak-client",
    clientSecret: "asd",
  };

  const token = "ASD";

  const verify = jest.fn();

  describe("constructor", () => {
    it("should throw an error if introspectUrl option is missing", () => {
      expect(
        () =>
          new KeycloakJwtIntrospectStrategy(
            {
              clientId: options.clientId,
              clientSecret: options.clientSecret,
            },
            verify
          )
      ).toThrow(TypeError);
    });

    it("should throw an error if clientId option is missing", () => {
      expect(
        () =>
          new KeycloakJwtIntrospectStrategy(
            {
              introspectUrl: options.introspectUrl,
              clientSecret: options.clientSecret,
            },
            verify
          )
      ).toThrow(TypeError);
    });

    it("should throw an error if clientSecret option is missing", () => {
      expect(
        () =>
          new KeycloakJwtIntrospectStrategy(
            {
              introspectUrl: options.introspectUrl,
              clientId: options.clientId,
            },
            verify
          )
      ).toThrow(TypeError);
    });

    it('should set the name property to "keycloak-jwt-introspect"', () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy.name).toBe("keycloak-jwt-introspect");
    });

    it("should set the _introspectUrl property to the provided value", () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy._introspectUrl).toBe(options.introspectUrl);
    });

    it("should set the _clientId property to the provided value", () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy._clientId).toBe(options.clientId);
    });

    it("should set the _clientSecret property to the provided value", () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy._clientSecret).toBe(options.clientSecret);
    });

    it("should set the _passReqToCallback property to false if not provided", () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy._passReqToCallback).toBe(false);
    });

    it("should set the _verify property to the provided function", () => {
      const strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      expect(strategy._verify).toBe(verify);
    });

    it("should throw an error if verify callback is missing", () => {
      expect(() => new KeycloakJwtIntrospectStrategy(options)).toThrow(
        TypeError
      );
    });
  });

  describe("authenticate", () => {
    let strategy;

    beforeEach(() => {
      strategy = new KeycloakJwtIntrospectStrategy(options, verify);
      strategy.success = jest.fn();
      strategy.fail = jest.fn();
      strategy.error = jest.fn();
    });

    it("should call fail method with 401 status code if authorization header is missing", async () => {
      const req = { headers: {} };
      await strategy.authenticate(req);
      expect(strategy.fail).toHaveBeenCalledWith(401);
    });

    it("should call fail method with 401 status code if introspect request fails", async () => {
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
      await strategy.authenticate(req);
      expect(strategy.fail).toHaveBeenCalledWith(401);
    });
  });
});
