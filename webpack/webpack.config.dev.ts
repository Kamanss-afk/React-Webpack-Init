import webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import { cssModuleRules, cssRules, sassRules } from './webpack.config.styles';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  cache: {
    type: 'filesystem',
  },
  devServer: {
    host: 'localhost',
    port: 4000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$$/,
        use: ['style-loader', ...cssRules],
      },
      {
        test: /\.module\.css$$/,
        use: ['style-loader', ...cssModuleRules],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$$/,
        use: ['style-loader', ...cssRules, ...sassRules],
      },
      {
        test: /\.module\.scss$$/,
        use: ['style-loader', ...cssModuleRules, ...sassRules],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
};

export default config;
