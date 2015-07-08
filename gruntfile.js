module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      options: {
        transform: [
          ['babelify'],
          ['literalify', { react: 'window.React', i18next: 'window.i18n' }]
        ]
      },
      bundle: {
        src: './browser.js',
        dest: './public/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify:bundle']);

};