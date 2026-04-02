const path = require('path');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

// Use the function-call format so the `base` option is reliably passed.
// Angular's esbuild builder calls PostCSS without the component .ts files
// in its dependency graph, so Tailwind's auto-detection finds nothing.
// Setting `base` to the src/ directory tells the Tailwind v4 scanner
// exactly where to look for class names.
module.exports = {
  plugins: [
    tailwindcss({ base: path.resolve(__dirname, 'src') }),
    autoprefixer(),
  ],
};
