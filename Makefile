install:
	npm ci

build:
	npm run build
start:
	node server.js
run: build start
dev:
	npm run dev