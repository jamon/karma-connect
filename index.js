function Plugin(
			/* config.connect */connectOptions,
			/* config.basePath */basePath,
			/* config.files */files,
			fileList,
			customFileHandlers,
			emitter) {
	customFileHandlers.push({
		urlRegex: /^.*/,
		handler: function(req, res, next) {
			try {
				connectOptions.middleware.handle(req, res, function() {
                    res.statusCode = 404;
    				res.end('Not found');
				});
			} catch(e) {
				console.error("ERROR in karma-connect handler", e);
			}
		}
	});
}
function createPreprocesor(/* config.basePath */basePath, connectPlugin) {
	return function(content, file, done) {
		done(null, content && content.toString());
	};
}
module.exports = {
	"connectPlugin": ["type", Plugin],
	"preprocessor:connect": ["factory", createPreprocesor]
};
