module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    // Compile typescrupt by following the tsconfig.json configuration
    ts: {
      default : {
        tsconfig: './tsconfig.json'
      }
    },

    // Compile the Less files to less and place in dist directory
    less: {
      compile: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
          {
            expand: true,
            cwd: 'public/less/',
            src: ["**/*.less"],
            dest: 'dist/public/css',
            ext: '.css'
          }
        ]
      }
    },

    // Copy all static files (i.e. that don't need compiling) to the dist directory
    sync: {
      syncViews: {
        files: [
          { cwd: './views', src: '**/*', dest: './dist/views' }
        ]
      },
      syncPublic: {
        files: [
          { cwd: './public', src: ['**/*', '!**/less/**'], dest: './dist/public' }
        ]
      }
    },

    // Watch for any changes to TS, Less, or static files and apply necessary changes to dist
    watch: {
      ts: {
        files: ["src/**/*.ts", "test/**/*.ts"],
        tasks: ["ts"]
      },
      static: {
        files: ["views/**/*", "public/**/*", '!**/*.less'],
        tasks: ["sync"]
      },
      less: {
        files: ["public/less/**/*.less"],
        tasks: ["less"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-sync");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "ts",
    "sync",
    "less"
  ]);

};
