
test:
	NODE_ENV=test ./node_modules/.bin/mocha --reporter dot --require ./test/init.js --require should test/*.test.js
testing:
	NODE_ENV=test ./node_modules/.bin/mocha --watch --reporter min --require ./test/init.js --require should test/*.test.js

.PHONY: test
.PHONY: doc
.PHONY: docs
