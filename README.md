# snowpack-plugin-cdn-import

A [Snowpack](https://www.snowpack.dev/) plugin that modify your import resource
to obtain from the CDN.

[Work on modern browsers](https://caniuse.com/mdn-javascript_statements_import).

Based on
[snowpack-plugin-import-maps](https://github.com/zhoukekestar/snowpack-plugin-import-map).

## Quick Start

1) Write your code as usually:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello world!</h1>,
  document.getElementById('root'),
);
```

2) Install and configure plugin:

```shell
npm i -D snowpack-plugin-cdn-import
```

Edit `snowpack.config.js`:

```js
module.exports = {
  ...
  plugins: [
    ...
    ['snowpack-plugin-cdn-import',
      {
        dependencies: require('./package.json').dependencies,
        ignore: ['@some/module', /^@another/],
        baseUrl: 'https://cdn.skypack.dev', // default value.
        extensions: ['.js', '.jsx','.tsx', '.ts'], // default value.
        enableInDevMode: false, // default value.
        formatImportValue: ({ baseUrl, dependency }) =>
          `${baseUrl}/${dependency.name}@${dependency.version}`, // default value.
      },
    ],
  ],
}
```

3) Run `npm run build` or `npm start`

And you will get result like this:

```js
import React from "https://cdn.skypack.dev/react@^16.13.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@^16.13.1";

ReactDOM.render(
  React.createElement("h1", null, "Hello world!"),
  document.getElementById('root')
);
```
