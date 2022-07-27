import ESBuild from 'esbuild';
import path from 'path';
import express from 'express';
import { EventEmitter } from 'events';

import config from './esbuild-config';

const PORT = Number(process.env.PORT) || 3000;

const app = express();
const emitter = new EventEmitter();

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

app.get('/subscribe', (_, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write('');

  emitter.on('refresh', () => {
    res.write('data: message \n\n');
  });
});

function sendMessage() {
  emitter.emit('refresh', 'message');
}

app.listen(PORT, () => console.log('server started on http://localhost:' + PORT));

ESBuild.build({
  ...config,
  watch: {
    onRebuild(err) {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('build...');
        sendMessage();
      }
    },
  },
})
  .then((result) => {
    const { errors, warnings, metafile, stop } = result;
    const outputs = metafile?.outputs!;
    console.log('result: ', {errors, warnings, outputs, stop});
  })
  .catch((err) => {
    console.log(err);
  });
