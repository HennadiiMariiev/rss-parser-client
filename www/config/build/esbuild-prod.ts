import ESBuild from 'esbuild';

import config from './esbuild-config';

ESBuild.build({ ...config }).then((result) => {
    const { errors, warnings, metafile, stop } = result;
    const outputs = metafile?.outputs!;
    console.log('result: ', {errors, warnings, outputs, stop});
    process.exit(0);
  })
  .catch(console.log);
