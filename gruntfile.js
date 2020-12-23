module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // TypeScript compilation using tsconfig.json
    ts: {
      default: {
        tsconfig: 'tsconfig.json'
      }
    },

    //ESLint
    eslint: {
      default: {
        options: {
          configFile: '.eslintrc.yml'
        },
        src: ['src/**/*.ts']
      }
    },

    watch: {
      scripts: {
        files: ['**/*.ts', '!node_modules/**/*.ts'],
        tasks: ['newer:eslint:default', 'ts'],
        options: {
          spawn: false
        }
      }
    },

    nodemon: {
      dev: {
        script: 'dist/index.js'
      },
      options: {
        ignore: ['node_modules/**', 'gruntfile.js'],
        env: {
          PORT: '8080'
        }
      }
    },

    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('serve', ['concurrent:watchers']);
  grunt.registerTask('default', ['eslint:default', 'ts']);
}
