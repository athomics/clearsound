/*!
 * wavesurfer.js microphone plugin 6.6.1 (2023-03-18)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("WaveSurfer", [], t) : "object" == typeof exports ? exports.WaveSurfer = t() : (e.WaveSurfer = e.WaveSurfer || {}, e.WaveSurfer.microphone = t()) }(self, (() => (() => { "use strict"; var e = { 872: (e, t) => { function r(e) { return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }, r(e) } function i(e, t) { for (var i = 0; i < t.length; i++) { var n = t[i]; n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, (o = n.key, a = void 0, a = function (e, t) { if ("object" !== r(e) || null === e) return e; var i = e[Symbol.toPrimitive]; if (void 0 !== i) { var n = i.call(e, t || "default"); if ("object" !== r(n)) return n; throw new TypeError("@@toPrimitive must return a primitive value.") } return ("string" === t ? String : Number)(e) }(o, "string"), "symbol" === r(a) ? a : String(a)), n) } var o, a } Object.defineProperty(t, "__esModule", { value: !0 }), t.default = void 0; var n = function () { function e(t, r) { var i = this; !function (e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e), this.params = t, this.wavesurfer = r, this.active = !1, this.paused = !1, this.browser = this.detectBrowser(), this.reloadBufferFunction = function (e) { return i.reloadBuffer(e) }; void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function (e, t, r) { var i = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia; return i ? new Promise((function (t, r) { i.call(navigator, e, t, r) })) : Promise.reject(new Error("getUserMedia is not implemented in this browser")) }), this.constraints = this.params.constraints || { video: !1, audio: !0 }, this.bufferSize = this.params.bufferSize || 4096, this.numberOfInputChannels = this.params.numberOfInputChannels || 1, this.numberOfOutputChannels = this.params.numberOfOutputChannels || 1, this._onBackendCreated = function () { i.micContext = i.wavesurfer.backend.getAudioContext() } } var t, r, n; return t = e, n = [{ key: "create", value: function (t) { return { name: "microphone", deferInit: !(!t || !t.deferInit) && t.deferInit, params: t, instance: e } } }], (r = [{ key: "init", value: function () { this.wavesurfer.on("backend-created", this._onBackendCreated), this.wavesurfer.backend && this._onBackendCreated() } }, { key: "destroy", value: function () { this.paused = !0, this.wavesurfer.un("backend-created", this._onBackendCreated), this.stop() } }, { key: "start", value: function () { var e = this; navigator.mediaDevices.getUserMedia(this.constraints).then((function (t) { return e.gotStream(t) })).catch((function (t) { return e.deviceError(t) })) } }, { key: "togglePlay", value: function () { this.active ? (this.paused = !this.paused, this.paused ? this.pause() : this.play()) : this.start() } }, { key: "play", value: function () { this.paused = !1, this.connect() } }, { key: "pause", value: function () { this.paused = !0, this.disconnect() } }, { key: "stop", value: function () { this.active && (this.stopDevice(), this.wavesurfer.empty()) } }, { key: "stopDevice", value: function () { this.active = !1, this.disconnect(), this.stream && this.stream.getTracks && this.stream.getTracks().forEach((function (e) { return e.stop() })) } }, { key: "connect", value: function () { void 0 !== this.stream && ("edge" === this.browser.browser && (this.localAudioBuffer = this.micContext.createBuffer(this.numberOfInputChannels, this.bufferSize, this.micContext.sampleRate)), this.mediaStreamSource = this.micContext.createMediaStreamSource(this.stream), this.levelChecker = this.micContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels), this.mediaStreamSource.connect(this.levelChecker), this.levelChecker.connect(this.micContext.destination), this.levelChecker.onaudioprocess = this.reloadBufferFunction) } }, { key: "disconnect", value: function () { void 0 !== this.mediaStreamSource && this.mediaStreamSource.disconnect(), void 0 !== this.levelChecker && (this.levelChecker.disconnect(), this.levelChecker.onaudioprocess = void 0), void 0 !== this.localAudioBuffer && (this.localAudioBuffer = void 0) } }, { key: "reloadBuffer", value: function (e) { if (!this.paused) if (this.wavesurfer.empty(), "edge" === this.browser.browser) { var t, r; for (t = 0, r = Math.min(this.localAudioBuffer.numberOfChannels, e.inputBuffer.numberOfChannels); t < r; t++)this.localAudioBuffer.getChannelData(t).set(e.inputBuffer.getChannelData(t)); this.wavesurfer.loadDecodedBuffer(this.localAudioBuffer) } else this.wavesurfer.loadDecodedBuffer(e.inputBuffer) } }, { key: "gotStream", value: function (e) { this.stream = e, this.active = !0, this.play(), this.fireEvent("deviceReady", e) } }, { key: "deviceError", value: function (e) { this.fireEvent("deviceError", e) } }, { key: "extractVersion", value: function (e, t, r) { var i = e.match(t); return i && i.length >= r && parseInt(i[r], 10) } }, { key: "detectBrowser", value: function () { var e = { browser: null, version: null, minVersion: null }; return "undefined" != typeof window && window.navigator ? navigator.mozGetUserMedia ? (e.browser = "firefox", e.version = this.extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1), e.minVersion = 31, e) : navigator.webkitGetUserMedia ? (e.browser = "chrome", e.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2), e.minVersion = 38, e) : navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (e.browser = "edge", e.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), e.minVersion = 10547, e) : window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./) ? (e.browser = "safari", e.minVersion = 11, e.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1), e) : (e.browser = "Not a supported browser.", e) : (e.browser = "Not a supported browser.", e) } }]) && i(t.prototype, r), n && i(t, n), Object.defineProperty(t, "prototype", { writable: !1 }), e }(); t.default = n, e.exports = t.default } }, t = {}; var r = function r(i) { var n = t[i]; if (void 0 !== n) return n.exports; var o = t[i] = { exports: {} }; return e[i](o, o.exports, r), o.exports }(872); return r })()));
//# sourceMappingURL=wavesurfer.microphone.min.js.map