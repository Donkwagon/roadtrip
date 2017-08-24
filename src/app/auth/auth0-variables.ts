interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'sOONh5zgOxZ0lFmoz4NkBpove0AI0ati',
  domain: 'donkwhan.auth0.com',
  callbackURL: 'http://localhost:8080/#/callback'
};
