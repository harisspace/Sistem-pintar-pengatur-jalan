// interface
export interface Signup {
  username: string;
  email: string;
  password: string;
}

export interface Signin {
  email: string;
  password: string;
}

export interface SignupErrors {
  username: string;
  email: string;
  password: string;
}

export interface SigninErrors {
  email: string;
  password: string;
}

export interface JwtPayload {
  username: any;
  email: any;
}
