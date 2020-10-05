/* eslint-disable */

declare module '*.jpg' {
  /**
   * Resolves to the hashed URL of the static asset.
   */
  const value: string;
  export = value;
}

declare module '*.svg' {
  /**
   * Resolves to an SVG element.
   */
  const value: React.FC<React.HTMLProps<React.ReactSVGElement>>;
  export = value;
}

declare var process: {
  env: {
    /**
     * The JSON-serialized admin credentials for a Firebase service account.
     * This is used to pull information about other users. More information is
     * included in the documentation here:
     * https://firebase.google.com/docs/admin/setup#initialize-sdk
     */
    ADMIN_CREDENTIALS: string;

    /**
     * The canonical URL of the App, e.g:
     *  https://gomoku-boardgame-io.herokuapp.com/
     *
     *  This is needed for the OpenGraph Metadata: https://ogp.me/
     */
    APP_URL: string;

    /**
     * The URL of an available PostgreSQL database. This must contain the
     * protocol, username, password, and database name. For example:
     * postgresql://postgres:postgres@database:5432/postgres
     */
    DATABASE_URL: string;

    /**
     * The JSON-serialized non-secret client-side configuration for the Firebase
     * project. Documentation here:
     * https://firebase.google.com/docs/web/setup?authuser=0#config-object
     */
    FIREBASE_CONFIG: string;

    /**
     * The node environment. Used both client-side and server-side.
     */
    NODE_ENV: 'development' | 'production';

    /**
     * The backend server port.
     */
    PORT: string;
  };
};
