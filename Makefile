
test:
	NODE_ENV=test ./node_modules/.bin/mocha --require ./test/init.js test/*.test.js
test-verbose:
	NODE_ENV=test ./node_modules/.bin/mocha --reporter spec --require ./test/init.js test/*.test.js
testing:
	NODE_ENV=test ./node_modules/.bin/mocha --watch --reporter min --require ./test/init.js test/*.test.js

.PHONY: test
.PHONY: doc
.PHONY: docs
