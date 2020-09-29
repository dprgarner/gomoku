module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        APP_URL: process.env.APP_URL,
      },
    },
  },
};
