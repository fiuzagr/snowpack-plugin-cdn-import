const { transformAsync } = require('@babel/core');

const babelPlugin = require('./babel-plugin.js');
const generateImports = require('./generate-imports.js');

const snowpackPlugin = (_, pluginOptions) => {
  const extensions = pluginOptions.extensions || ['.js', '.jsx', '.tsx', '.ts'];
  const enableInDevMode = pluginOptions.enableInDevMode || false;
  const imports = generateImports(pluginOptions);

  return {
    async transform(options) {
      const { contents, filePath, isDev, fileExt } = options;

      if (
        ((isDev && enableInDevMode) || !isDev) &&
        extensions.includes(fileExt.toLowerCase())
      ) {
        const result = await transformAsync(contents, {
          filename: filePath,
          plugins: [babelPlugin({ imports })],
          cwd: process.cwd(),
          ast: false,
        });
        return result.code;
      }
      return contents;
    },
  };
};

module.exports = snowpackPlugin;
