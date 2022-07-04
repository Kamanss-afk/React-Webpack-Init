import webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import baseConfig from './webpack/webpack.config.base';
import developmentConfig from './webpack/webpack.config.dev';
import productionConfig from './webpack/webpack.config.prod';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

let config: Configuration = {};

switch (process.env.NODE_ENV) {
  case 'development':
    config = merge(baseConfig, developmentConfig);
    break;
  case 'production':
    config = merge(baseConfig, productionConfig);
    break;
  default:
    throw new Error('No matching configuration was found!');
}

export default config;
