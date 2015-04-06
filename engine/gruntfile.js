module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shared-config');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['shared_config', 'sass', 'uglify']);

	// Clean out the contents of the config file
	grunt.file.write('sass/config.scss', '');
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// Shared config
		shared_config: {
			default: {
				options: {
					name: "config",
					cssFormat: "dash",
					mask: 'config-mask.json'
				},
				src: '../project/config.json',
				dest: [
					'sass/config.scss'
				]
			}
		},
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: [{
					// Core file
					'css/styles.css': 'sass/core.scss'
				},{
					// Project files
					expand: true,
					cwd: '../project/sass',
					src: ['**/*.scss'],
					dest: '../project/css',
					ext: '.css'
				},{
					// UI files
					expand: true,
					cwd: '../project/ui',
					src: ['**/style.scss'],
					dest: '../project/ui',
					ext: '.css'
				}]
			}
		}, 
		// End of SASS
		// Uglify
		uglify: {
			// Start file
			start: {
				files: {
					'../start.js': [
						'js/core.js'
					]
				}
			},
			// Imports
			imports: {
				files: {
					'js/min/scripts.min.js': [
						'js/modernizr.js',
						'js/velocity.js',
						'js/tools.js'
					]
				}
			},
			// Touch
			touch: {
				files: {
					'js/min/touch.min.js': [
						'js/fastclick.js'
					],
				}
			},
			// Project files
			project: {
				files: [{
					expand: true,
					cwd: '../project/js',
					src: '*.js',
					dest: '../project/js/min',
					ext: '.min.js'
				}]
			},
			// UI files
			ui: {
				files: [{
					expand: true,
					cwd: '../project/ui',
					src: '**/script.js',
					dest: '../project/ui',
					ext: '.min.js'
				}]
			},
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: [
					'**/*.scss', 
					'../_settings.scss', 
					'../project/sass/*.scss', 
					'../project/sass/**/*.scss',
					'../project/ui/**/*.scss'
				],
				tasks: ['sass']
			},
			// End of CSS
			// Scripts
			start: {
				files: ['js/core.js'],
				tasks: ['uglify:start']
			},
			imports: {
				files: [
					'js/jquery.js',
					'js/modernizr.js',
					'js/hammer.js',
					'js/hammer-jquery.js',
					'js/velocity.js',
					'js/tools.js'
				],
				tasks: ['uglify:imports']
			},
			touch: {
				files: [
					'js/fastclick.js'
				],
				tasks: ['uglify:touch']
			},
			project: {
				files: ['../project/js/*.js'],
				tasks: ['uglify:project']
			},
			ui: {
				files: ['../project/ui/**/script.js'],
				tasks: ['uglify:ui']
			},
			// End of scripts
			// Config
			config: {
				files: ['../project/config.json'],
				tasks: ['shared_config', 'sass', 'uglify']
			},
			// End of config
			// Live reload
			options: {
		    	livereload: true,
		    } 
		    // End of live reload
		} 
		// End of watch
	});
	// End of initialize config
}