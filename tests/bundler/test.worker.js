// Simple test worker
self.onmessage = function (e) {
    self.postMessage({ result: e.data.value * 2 });
};
