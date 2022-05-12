const path = require("path");

module.exports = {
  // Where does your app start?
  entry: "./src/app.ts",
  //   creating the single js file that will be produced after bundling
  output: {
    filename: "bigBoy.js",
    path: path.resolve(__dirname, "dist"),
  },
  //   tells webpack that there will be generated source maps to work with
  devtools: "inline-source-map",
  //   tell webpack how to work with files in project
  module: {
    rules: [
      {
        // any files that end with .ts will follow this rule, in this case use ts-loader
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  //   which file extentions webpack adds to imports it finds
  resolve: {
    extensions: [".ts", ".js"],
  },
};
