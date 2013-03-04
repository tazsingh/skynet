## Chrome Apps ##
* Manifest.json
** Specify UDP permissions
* Main.js
** Bootstraps the window with chrome.app.window.create
* Index.html
** The actual app inside the browser

## Gamepad API ##
* webkitGetGamepads()
** Multidevice support
** Requires initial user input (this prevents fingerprinting - it would be nice if they exposed the existence of a device but not the details)
* Chrome API makes you poll the device
* Every poll returns the state of the controller - including button values
* Polling trick: requestAnimationFrame() [scheduleNextTick]
* The axis' are floating points
* Mozilla is nicer

## Chrome Sockets ##
* chrome.socket.create
* sendKeepAliveCommand
** chrome.socket.sendTo
** chrome.socket.read
*** data is an Array Buffer - use DataView JS object

## Mediasource API ##
* Holy shit you can read video from an arrayBuffer - wtf - this shit is cray
