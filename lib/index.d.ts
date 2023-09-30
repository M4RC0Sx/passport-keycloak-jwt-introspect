import { Strategy as PassportStrategy } from "passport-strategy";
import express = require("express");

declare namespace KeycloakJwtIntrospectStrategy {
  interface IOptions {
    introspectUrl: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    passReqToCallback?: false | undefined;
  }

  interface IOptionsWithRequest {
    introspectUrl: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    passReqToCallback?: true;
  }

  interface VerifyCallback {
    (
      keycloakData: any,
      done: (error: any, user?: Express.User | false, options?: any) => void
    ): void;
  }

  interface VerifyCallbackWithRequest {
    (
      req: express.Request,
      keycloakData: any,
      done: (error: any, user?: Express.User | false, options?: any) => void
    ): void;
  }

  class Strategy extends PassportStrategy {
    constructor(options: IOptions, verify: VerifyCallback);
    constructor(
      options: IOptionsWithRequest,
      verify: VerifyCallbackWithRequest
    );
    authenticate(req: express.Request, options?: Options | undefined): void;
  }
}

export = KeycloakJwtIntrospectStrategy;
