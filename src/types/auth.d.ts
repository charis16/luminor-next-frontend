type LoginResponse = {
  user: {
    uuid: string;
    name: string;
    email: string;
    role: string;
  };
  access_token: string;
  refresh_token: string;
};

interface JwtPayload {
  user_id: string;
  role: string;
  exp: number;
  iat: number;
}
