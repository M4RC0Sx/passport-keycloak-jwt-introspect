import { Strategy as PassportStrategy } from "passport-strategy";
import express = require("express");

declare namespace KeycloakJwtIntrospectStrategy {
  interface Options {
    introspectUrl: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    passReqToCallback?: boolean | undefined;
  }

  interface VerifyCallback {
    (
      keycloakPayload: any,
      done: (error: any, user?: Express.User | false, options?: any) => void
    ): void;
  }

  interface VerifyCallbackWithRequest {
    (
      req: express.Request,
      keycloakPayload: any,
      done: (error: any, user?: Express.User | false, options?: any) => void
    ): void;
  }

  class Strategy extends PassportStrategy {
    constructor(options: Options, verify: VerifyCallback);
    constructor(options: Options, verify: VerifyCallbackWithRequest);
    authenticate(req: express.Request, options?: Options | undefined): void;
  }
}

export = KeycloakJwtIntrospectStrategy;
