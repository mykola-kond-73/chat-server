export const sessionOpt={
    secret: process.env.SECRET_KEY_SESSION || 'SECRET_SESSION',
      resave: false,
      saveUninitialized: false,
}