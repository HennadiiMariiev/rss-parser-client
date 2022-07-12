import { IHtmlPluginOptions } from '../../../src/interfaces/interfaces';

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

export const renderHtml = ({ template, title, cssPath, jsPath }: IHtmlPluginOptions): string => {
  if (template) {
    return template;
  }

  const cssLinks = cssPath?.map((path) => `<link href=${path} rel="stylesheet">`).join(' ');
  const scripts = jsPath?.map((path) => `<script src=${path}></script>`).join(' ');

  return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
                ${cssLinks}
            </head>
            <body>
                <div id="root"></div>
                ${scripts}
                <script>
                const evtSource = new EventSource('http://localhost:3000/subscribe')
               evtSource.onopen = function () { console.log('open') }
               evtSource.onerror = function () { console.log('error') }
               evtSource.onmessage = function () { 
                    console.log('message')
                    window.location.reload();
                }
               
               </script>
            </body>
        </html>
                      `;
};
