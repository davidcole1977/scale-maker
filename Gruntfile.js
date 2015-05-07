module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      js: {
        src: [ 'src/js/**/*.js']
      },
      testJs: {
        src: [ 'test/**/*.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },
    mochaTest: {
      dev: {
        options: {
          reporter: 'spec',
          clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false) 
        },
        src: ['test/**/*.spec.js']
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js', '!src/js/vendor/*'],
        tasks: ['jshint:js', 'mochaTest']
      },
      gruntfileJs: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:gruntfile']
      },
      testJs: {
        files: ['test/**/*.js'],
        tasks: ['jshint:testJs', 'mochaTest']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', [
    'jshint',
    'mochaTest',
    'watch'
  ]);

};