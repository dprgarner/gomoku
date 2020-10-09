export const server =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined;

export const serverRoot =
  process.env.NODE_ENV === 'development' ? '//localhost:8000' : '';
