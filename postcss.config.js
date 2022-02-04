module.exports = {
  plugins: {
    "postcss-prepend-imports": {
      files: ["./styles/medias.css"],
    },
    "postcss-easy-import": {},
    "postcss-nested-ancestors": {},
    "postcss-nesting": {},
    "postcss-preset-env": { stage: 0 },
  },
};
