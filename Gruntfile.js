module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sweet.js');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sweetjs: {
      options: {
        readableNames: true,
        modules: [
          './macros'
        ]
      },

      build: {
        expand: true,
        cwd: 'src',
        src: '**/*.js',
        dest: 'build'
      }
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
    },

    watch: {
      files: 'src/**/*.js',
      tasks: ['build']
    },

    shell: {
      server: {
        command: 'python -m SimpleHTTPServer'
      }
    },

    concurrent: {
      watchAndServer: {
        tasks: ['server', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build',
                     'Compile all files with Sweet.js',
                     ['clean', 'sweetjs:build']);
  grunt.registerTask('server',
                     'Run a local development server.',
                     ['shell:server']);
  grunt.registerTask('default', ['build',
                                 'concurrent:watchAndServer']);
};
