export const cssModuleRules = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: '[local]__[sha1:hash:hex:7]',
      },
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer', 'cssnano'],
      },
    },
  },
];

export const cssRules = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer', 'cssnano'],
      },
    },
  },
];

export const sassRules = [
  {
    loader: 'sass-loader',
  },
];
