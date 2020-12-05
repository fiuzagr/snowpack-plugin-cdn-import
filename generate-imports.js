const ignoreSome = (ignoreValue) => (ignoreEntry) => {
  if (ignoreEntry instanceof RegExp) {
    return ignoreEntry.test(ignoreValue);
  }
  return ignoreEntry === ignoreValue;
};

const defaultFormatImportValue = ({ baseUrl, dependency }) => {
  return `${baseUrl}/${dependency.name}@${dependency.version}`;
};

const generateImports = (options = {}) => {
  const baseUrl = (options.baseUrl || 'https://cdn.skypack.dev').replace(
    /\/$/,
    ''
  );
  const dependencies = options.dependencies || {};
  const ignore = options.ignore || [];
  const formatImportValue =
    options.formatImportValue || defaultFormatImportValue;

  return Object.fromEntries(
    Object.entries(dependencies)
      .map(([name, version]) => {
        if (ignore.some(ignoreSome(name))) {
          return undefined;
        }

        return [
          name,
          formatImportValue({ baseUrl, dependency: { name, version } }),
        ];
      })
      .filter((e) => e) // remove undefined
  );
};

module.exports = generateImports;
