module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        expr: true
      },
      js: {
        src: ['src/**/*.js', 'lib/**/*.js', '!lib/**/*.min.js']
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
    uglify: {
      options: {
        mangle: false,
        quoteStyle: 3 // preserve original quotation marks
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'lib',
          rename: function(dest, src) {
            return dest + '/' + src.replace('.js','.min.js');
          }
        }]
      }
    },
    browserify: {
      dev: {
        files: {
          'demo/js/demo.js': ['src/js/demo.js']
        }
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js', 'lib/**/*.js', '!lib/**/*.min.js'],
        tasks: ['jshint:js', 'mochaTest', 'uglify:dev']
      },
      js_browserify: {
        files: ['src/**/*.js', 'lib/**/*.js', '!lib/**/*.min.js'],
        tasks: ['browserify:dev']
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [
    'browserify',
    'uglify',
    'watch'
  ]);

   // for some reason browserify doesn't like to run after mochaTest in the grunt default task list,
  // so separating out the test tasks for now (tests & linting are still included in the default watch task)
  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

};