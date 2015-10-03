PATH := node_modules/.bin:$(PATH)
assets := $(shell find ./assets -path ./assets/bundles -prune -o -type f -print)


build: node_modules assets/bundles

node_modules: package.json
	@npm install
	@touch node_modules

assets/bundles: node_modules webpack.config.js $(assets)
	@webpack
	@touch assets/bundles

run: node_modules
	@webpack-dev-server --hot

clean:
	@rm -rf assets/bundles
