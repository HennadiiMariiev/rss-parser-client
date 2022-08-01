import { BuildOptions } from 'esbuild';
import path from 'path';

import { CleanPlugin } from './plugins/clean-plugin';
import { env } from './plugins/env-plugin';
import { HTMLPlugin } from './plugins/html-plugin';

const mode = process.env.REACT_APP_MODE || 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

function resolveRoot(...segments: string[]) {
  return path.resolve(__dirname, '..', '..', ...segments);
}

const config: BuildOptions = {
  outdir: resolveRoot('build'),
  entryPoints: [resolveRoot('src', 'index.jsx')],
  tsconfig: resolveRoot('tsconfig.json'),
  entryNames: '[dir]/bundle.[name]-[hash]',
  bundle: true,
  minify: isProd,
  legalComments: "none",
  drop: ['debugger'],
  metafile: true,
  sourcemap: isDev,
  treeShaking: isProd,
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
  },
  plugins: [CleanPlugin, env({ process: true }), HTMLPlugin({ title: 'LifeHacker Rss', isProduction: isProd })],
  watch: isDev && {
    onRebuild(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('build...');
      }
    },
  },
};

export default config;
