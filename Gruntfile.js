module.exports = function(grunt) {

  /**
   * Takes a 'vanilla' JS module and replaces "var moduleName =" with "module.exports =""
   * to turn it into a Node module 
   */
  grunt.registerMultiTask('modulify', function () {
    var moduleContents = grunt.file.read(this.files[0].src[0]),
        moduleName = this.options().moduleName,
        dest = this.files[0].dest;

    moduleContents = moduleContents.replace('var ' + moduleName, 'module.exports');
    grunt.file.write(dest, moduleContents);
  });

  grunt.registerMultiTask('simple_log', function () {
    var logText = this.options().logText;

    grunt.log.ok(logText);
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    simple_log: {
      coverage_complete: {
        options: {
          logText: 'Coverage report available at coverage/reports/icov-report/index.html'
        }
      }
    },

    modulify: {
      scaleMaker: {
        options: {
          moduleName: 'ScaleMaker'
        },
        src: ['lib/scaleMaker.js'],
        dest: 'lib/node/scaleMaker.js'
      }
    },

    jshint: {
      options: {
        expr: true,
        ignores: ['test/coverage/**/*.js']
      },
      demoJs: {
        src: ['demo/js/*.js']
      },
      js: {
        src: ['lib/**/*.js', '!lib/**/*.min.js']
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
        src: ['test/mocha/**/*.spec.js']
      }
    },

    env: {
      dist: {
        LIB_DIR: '../../lib/'
      },
      coverage: {
        LIB_DIR: '../../test/coverage/instrument/lib/'
      }
    },

    instrument: {
      files: ['lib/node/**/*.js'],
      options: {
        lazy: true,
        basePath: 'test/coverage/instrument/'
      }
    },

    storeCoverage: {
      options: {
        dir: 'test/coverage/reports'
      }
    },

    makeReport: {
      src: 'test/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/coverage/reports',
        print: 'detail'
      }
    },

    coveralls: {
      coverage: {
        src: 'test/coverage/reports/**/*.info',
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

    watch: {
      js: {
        files: ['lib/**/*.js', '!lib/**/*.min.js'],
        tasks: ['jshint:js', 'modulify', 'mochaTest', 'uglify:dev']
      },
      demoJs: {
        files: ['demo/js/*.js'],
        tasks: ['jshint:demoJs']
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('coverage', [
    'env:coverage',
    'instrument',
    'mochaTest',
    'storeCoverage',
    'makeReport',
    'simple_log:coverage_complete'
  ]);

  grunt.registerTask('dist', [
    'env:dist',
    'jshint',
    'modulify',
    'mochaTest',
    'uglify',
    'coverage'
  ]);

  grunt.registerTask('default', [
    'dist',
    'watch'
  ]);

};