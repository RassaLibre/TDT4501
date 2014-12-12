module.exports = function(config){
	config.set({

		basePath : '../',
		frameworks: ['jasmine', 'closure'],
		files: [
			//base file
			'app/components/closure-library/closure/goog/base.js',
      'app/components/react/react-with-addons.js',
			//tests
			'app/App/**/*.test.js',
			// source files - these are only watched and served
      {pattern: 'app/App/**/*.js', included: false},
      // external deps
      {pattern: 'app/components/closure-library/closure/goog/deps.js', included: false, served: false},
      {pattern: 'app/components/closure-library/closure/goog/**/*.js', included: false},
		],

		//what kinda reports one wants to see
		reporters: ['coverage','progress'],

    preprocessors: {
      'jsx/*.jsx': [ 'react-jsx' ],
      // tests are preprocessed for dependencies (closure) and for iits
      'app/App/**/*.test.js': ['closure', 'closure-iit'],
      // source files are preprocessed for dependencies
      'app/App/**/*.js': ['closure'],
      'app/components/react/react-with-addons.js' : ['closure'],
      // external deps
      'app/components/closure-library/closure/goog/deps.js': ['closure-deps'],
      // specify coverage files
      'app/App/**/{*.js,!*.test.js}' : ['coverage']
    },		

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

		autoWatch : true,
		
		browsers: ['Chrome']
	});
}