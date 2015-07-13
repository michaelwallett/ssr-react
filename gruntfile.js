var devConfig = require('./config/webpack.config.dev');
var releaseConfig = require('./config/webpack.config.release');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      dev: devConfig,
      release: releaseConfig
    }
  });

  grunt.loadNpmTasks("grunt-webpack");
  grunt.registerTask('build:dev', ['webpack:dev']);
  grunt.registerTask('build:release', ['webpack:release']);
  grunt.registerTask('default', ['webpack:dev']);
};