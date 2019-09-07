const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    plugins: [
        tailwindcss("./tailwind.config.js"),
        autoprefixer(),
        purgecss({
            content: ["./src/**/*.vue"],
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
                        }
                    },
                    extensions: ["html", "vue"],
                },
            ],
            whitelist: ["html", "body"],
        }),
    ],
};