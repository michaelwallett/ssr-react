var devConfig = require('./config/webpack.config.dev');

module.exports = function(grunt) {

  grunt.initConfig({
    webpack: {
      dev: devConfig
    }
  });

  grunt.loadNpmTasks("grunt-webpack");

  grunt.registerTask('default', ['webpack:dev']);
};