test:
	@./node_modules/testacular/bin/testacular start spec/testacular.conf.js

video:
	ffplay tcp://192.168.1.1:5555

png:
	ffmpeg -i tcp://192.168.1.1:5555 -f image2 -updatefirst 1 frame.png

.PHONY: test video png
