export const corsOpt = {
  origin: ['http://localhost:8080','http://192.168.0.103:8080'],
  preflightContinue: false,

  credentials: true,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposedHeaders: [],
  maxAge: 5,
};
