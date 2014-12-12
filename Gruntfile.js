module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureDepsWriter: {
      options: {
        depswriter: 'app/components/closure-library/closure/bin/build/depswriter.py', // filepath to depswriter
        root_with_prefix: '"app/App ../../../../App"',
      },
      app: {
        dest: 'app/deps.js'
      }
    },
    closureCompiler:  {
      options: {
        compilerFile: 'app/components/closure-compiler/lib/vendor/compiler.jar',
        checkModified: false,
        compilerOpts: {
          externs: ['app/components/react-externs/externs.js'],
          compilation_level: 'WHITESPACE_ONLY',
          warning_level: 'verbose',
          extra_annotation_name: 'jsx',
          only_closure_dependencies: true,
          closure_entry_point: 'App.init',
          summary_detail_level: 3,
          output_wrapper: '"(function(){%output%})();"'
        },
        execOpts:{
          maxBuffer: 999999 * 1024
        },
      },
      app: {
        src: [
          'app/components/closure-library/**/*.js',
          'app/App/**/*.js',
          '!app/App/**/*.test.js',
          '!app/components/closure-library/**/*_test.js'
          ],
        dest: 'app/build/compiled.js'
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'app/css/main.css': 'sass/main.scss',       // 'destination': 'source'
        }
      }
    },
    closureLint: {
      app:{
        command: 'gjslint',
        src: [ 'app/App/**/*.js','!app/App/**/*.test.js','!app/App/UIC/**/*.js','!app/App/Form/**/*.js'],
        options: {
          stdout: true,
          strict: true
        }
      }
    },
    closureFixStyle: {
      app:{
        command: 'fixjsstyle',
          src: [ 'app/App/**/*.js','!app/App/UIC/**/*.js','!app/App/Form/**/*.js'],
        options: {
          stdout: true,
          strict: true
        }
      }
    },
    react: {
        dynamic_mappings: {
            files:[{
                expand: true,
                cwd: 'jsx/',
                src: ['**/*.jsx'],
                dest: 'app/',
                ext: '.js'
            }]
        }
    },
    watch: {
      scripts: {
        files: ['app/App/**/*.js','app/index.html','sass/*.scss','jsx/**/*.jsx','!app/App/**/*.test.js'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  //closure tools
  grunt.loadNpmTasks('grunt-closure-tools');

  //watcher
  grunt.loadNpmTasks('grunt-contrib-watch');

  //sass
  grunt.loadNpmTasks('grunt-contrib-sass');

  //linter
  grunt.loadNpmTasks('grunt-closure-linter');

  //react
  grunt.loadNpmTasks('grunt-react');

  // Default task(s).
  grunt.registerTask('default', ['react','closureFixStyle','closureLint','sass','closureDepsWriter:app','watch']);
  grunt.registerTask('jsxtemplates', ['react']);
  grunt.registerTask('build', ['closureCompiler:app']);

};