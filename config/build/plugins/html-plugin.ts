import { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';
import { rm, writeFile } from 'fs/promises';
import fs_extra from 'fs-extra';

import { IHtmlPluginOptions } from '../../../src/interfaces/interfaces';
import { renderHtml, preparePaths, scan2, prepareFaviconPath, resolveRoot } from './helpers';

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
        try {
          const outputs = result.metafile?.outputs;
          const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));
          const faviconPath: string[] = [];

          if (outdir) {
            const faviconsFolder = resolveRoot('public', 'favicons');

            if (fs.existsSync(faviconsFolder)) {
              const res = await scan2(faviconsFolder, []);
              faviconPath.push(...prepareFaviconPath(res));
              await fs_extra.copy(faviconsFolder, outdir);
            }
            await writeFile(
              path.resolve(outdir, 'index.html'),
              renderHtml({ jsPath, cssPath, faviconPath, ...options })
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
  };
};
