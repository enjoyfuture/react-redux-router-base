import incstr from 'incstr';

// 混淆 css 变量名
const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    /*
     * Removed "d" letter to avoid accidental "ad" construct.
     * @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
     */
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789_',
  });

  return name => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const getCSSModuleLocalIdent = (
  context,
  localIdentName,
  localName,
  options
) => {
  // format as URL on Windows
  let { resourcePath } = context;
  resourcePath = resourcePath.replace(/\\/g, '/');
  const componentName = resourcePath
    .split('/')
    .slice(-2, -1)
    .join('-');
  return uniqueIdGenerator(`${componentName}-${localName}`);
};

export default getCSSModuleLocalIdent;
