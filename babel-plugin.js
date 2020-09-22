const { types } = require('@babel/core');

const visitor = (imports) => ({
  exit(path) {
    const source = path.get('source');

    if (!source.node) {
      return;
    }

    if (imports[source.node.value]) {
      const newSource = types.stringLiteral(imports[source.node.value]);
      source.replaceWith(newSource);
    }
  },
});

const babelPlugin = ({ imports }) => (api) => {
  api.assertVersion(7);

  return {
    visitor: {
      Program: {
        exit(path) {
          path.traverse({
            ImportDeclaration: visitor(imports),
          });
        },
      },
    },
  };
};

module.exports = babelPlugin;
