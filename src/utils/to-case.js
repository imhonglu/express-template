const pascalRegex = /(^\w|-\w|_\w)/g;
const kebabRegex = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const camelRegex = /(-\w)/g;

const toCase = {
    pascal: string => string.replace(
        pascalRegex,
        s => (s.length === 2 ? s[1].toUpperCase() : s.toUpperCase()),
    ),
    kebab: string => string.replace(
        kebabRegex,
        s => `-${s.toLowerCase()}`,
    ),
    camel: string => string.replace(
        camelRegex,
        s => s[1].toUpperCase(),
    ),
    upper: string => string.toUpperCase().replace(
        '-',
        () => '_',
    ),
    none: string => string,
};

export default toCase;
