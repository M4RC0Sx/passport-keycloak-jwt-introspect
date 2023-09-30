const Strategy = require("../lib/strategy");
const passportKeycloakJwtIntrospect = require("../lib/index");

describe("passport-keycloak-jwt-introspect", () => {
  describe("exports", () => {
    it("should export Strategy constructor", () => {
      expect(passportKeycloakJwtIntrospect.Strategy).toBe(Strategy);
    });

    it("should export Strategy constructor as default", () => {
      expect(passportKeycloakJwtIntrospect).toBe(Strategy);
    });
  });
});
