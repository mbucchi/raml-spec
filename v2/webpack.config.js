module.exports = {
	module: {
		loaders: [
			{ test: /\.coffee$/, loader: "coffee" },
			{ test: /\.json$/, loader: "json" }
		]
	},
	resolve: {
		extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js", ".json"]
	}
}