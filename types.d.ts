declare module '*.jpg' {
  /**
   * Resolves to the hashed URL of the static asset.
   */
  const value: string;
  export = value;
}

declare var process: {
  env: {
    APP_URL: string;
    FIREBASE_CONFIG: string;
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    PORT?: string;
  };
};
