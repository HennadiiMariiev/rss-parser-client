import path from 'path';
import fs from 'fs/promises';

import { IHtmlPluginOptions } from '../../../src/interfaces/interfaces';

const SMALL_RES = '32x32';
const LARGE_RES = '192x192';

export function resolveRoot(...segments: string[]) {
    return path.resolve(__dirname, '..', '..', '..', ...segments);
  }

export const preparePaths = (outputs: string[]) => {
    return outputs.reduce<Array<string[]>>((acc, path) => {
        const [js, css] = acc;
        const splittedFileName = path.split('/').pop();

        if(splittedFileName?.endsWith('.js')) {
            js.push(splittedFileName)
        } else if(splittedFileName?.endsWith('.css')) {
            css.push(splittedFileName)
        }

        return acc;
    }, [[], []])
}


export async function scan2(directoryName = '', results = []) {
    let files = await fs.readdir(directoryName, {withFileTypes: true});
    for (let f of files) {
        let fullPath = path.join(directoryName, f.name);
        if (f.isDirectory()) {
            await scan2(fullPath, results);
        } else {
            results.push(fullPath as never);
        }
    }
    return results;
}

export const prepareFaviconPath = (pathArr : string[]) =>  pathArr.map(str => {
        const idx = str.lastIndexOf('/');
        return idx !== -1 ? str.slice(idx + 1) : '';
    });

export const getFaviconResolution = (favicon : string) => {
    if(!favicon) {
        return '';
    }
    return favicon.includes(SMALL_RES) ? SMALL_RES : favicon.includes(LARGE_RES) ? LARGE_RES : '';
}

export const renderHtml = ({ template, title, cssPath, jsPath, faviconPath, isProduction = false }: IHtmlPluginOptions): string => {
  if (template) {
    return template;
  }

  const cssLinks = cssPath?.map((path) => `<link href=${path} rel="stylesheet">`).join(' ');
  const scripts = jsPath?.map((path) => `<script src=${path}></script>`).join(' ');
  const favicons = faviconPath?.map((path) => {
    const resolution = getFaviconResolution(path);
    return `<link rel="icon" href="${path}" ${resolution && `sizes="${resolution}"`}>`;
  }).join('')

  const devScript = "<script>\n" +
                      "const evtSource = new EventSource('http://localhost:3000/subscribe');\n" +
 "evtSource.onopen = function () { console.log('open') };\n" +
 "evtSource.onerror = function () { console.log('error') };\n" +
 "evtSource.onmessage = function () { " +
 "   console.log('message');\n" +
"     window.location.reload();\n" +
 "}\n" +
"</script>";

  return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta content="rss-parser-client.netlify.app" property="og:site_name">
                <meta content="Lifehacker RSS parser" property="og:title">
                <meta content="Lifehacker's RSS client application for viewing posts" property="og:description">
                ${favicons}
                <title>${title}</title>
                ${cssLinks}
            </head>
            <body>
                <div id="root"></div>
                ${scripts}
                ${!isProduction ? devScript : ''}
            </body>
        </html>
                      `;
};
