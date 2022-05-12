const path = require("path");

module.exports = {
  // Where does your app start?
  entry: "./src/app.ts",
  //   creating the single js file that will be produced after bundling
  output: {
    filename: "bigBoy.js",
    path: path.resolve(__dirname, "dist"),
  },
};
