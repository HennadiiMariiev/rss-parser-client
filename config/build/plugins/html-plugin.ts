import { Plugin } from 'esbuild';
import { rm, writeFile } from 'fs/promises';
import path from 'path';

import { IHtmlPluginOptions } from '../../../src/interfaces/interfaces';
import { renderHtml, preparePaths } from './helpers';

export const HTMLPlugin = (options: IHtmlPluginOptions): Plugin => {
  return {
    name: 'HTMLPlugin',
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onStart(async () => {
        try {
          if (outdir) {
            await rm(outdir, { recursive: true });
          }
        } catch (e) {
          console.log('Cannot clear folder: ' + e);
        }
      });

      build.onEnd(async (result) => {
        const outputs = result.metafile?.outputs;
        const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));

        if (outdir) {
          await writeFile(path.resolve(outdir, 'index.html'), renderHtml({ jsPath, cssPath, ...options }));
        }
      });
    },
  };
};
