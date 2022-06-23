export const sessionOpt={
    secret: process.env.SECRET_KEY_SESSION || 'SECRET_SESSION',
      resave: false,
      saveUninitialized: false,
      
      name:               'SID-SOCK',
      rolling:           true,
      cookie:            {
          httpOnly: true,
          maxAge:   15 * 60 * 1000,
      },
}