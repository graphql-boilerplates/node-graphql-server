const jwt = require("jsonwebtoken");

function getUserId(ctx, requireAuth = true) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  if (requireAuth) {
    throw new AuthError();
  }
  return null;
}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  AuthError
};
