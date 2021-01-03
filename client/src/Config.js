const ENV = {
  DEV: 'development',
  PROD: 'production',
};

export const url =
  process.env.NODE_ENV === ENV.DEV ? `http://localhost:5000` : ``;
