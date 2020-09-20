declare module '*.jpg' {
  /**
   * Resolves to the hashed URL of the static asset.
   */
  const value: string;
  export = value;
}

declare var process: {
  env: {
    NODE_ENV: 'development' | 'production';
    PORT?: string;
  };
};
