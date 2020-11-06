module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // TypeScript compilation using tsconfig.json
    ts: {
      default: {
        tsconfig: 'tsconfig.json'
      }
    },
    
    // TSLint
    tslint: {
      options: {
        configuration: 'tslint.yml',
        project: 'tsconfig.json',
        force: false,
        fix: false
      },
      all: {
        src: ['**/*.ts', '!node_modules/**/*.ts']   
      }
    },
    
    watch: {
      scripts: {
        files: ['**/*.ts', '!node_modules/**/*.ts'],
        tasks: ['newer:tslint:all', 'ts'],
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
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('serve', ['concurrent:watchers']);
  grunt.registerTask('default', ['tslint:all', 'ts']);
}
