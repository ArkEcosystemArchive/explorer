const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer(),
    process.env.NODE_ENV === 'production'
      ? purgecss({
          content: ["./public/index.html", "./src/**/*.vue", "./src/**/*.js", "./src/**/*.ts"],
          extractors: [
            {
              extractor: (content) => {
                return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
              },
              extensions: ["html", "vue", "js", "ts"],
            },
          ],
          whitelist: [
            "html",
            "body",
            "border-theme-page-background",
            "table-component__th--sort-asc",
            "table-component__th--sort-desc",
            "tooltip",
            "tooltip-inner",
            "tooltip-arrow",
            "tr",
            "td",
            "th",
            "v-spinner",
            "text-status-became-active"
          ],
          whitelistPatterns: [/^tooltip-bg-/, /^vgt-/],
          whitelistPatternsChildren: [/^vgt-/],
        })
      : "",
  ],
};
