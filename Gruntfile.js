
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        browser: true,
		ignores: "src/showdown.js"
      },
	  all: ['src/**/*.js', 'test/**/*.js']
    },
    simplemocha: {
      all: {
        src: 'test/run.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', ['simplemocha', 'jshint']);
};
