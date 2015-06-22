module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      options: {
        transform: [
          ['reactify'],
          ['literalify', { react: 'window.React' }]
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