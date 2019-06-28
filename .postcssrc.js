// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('postcss-url'),
    require('postcss-import')(),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')(),
  ],
}
