// self.postMessage("Hello World!");


function heavilyComputatedValue() {
    var x = 0;
    for (var i = 0; i < 999999999; i++) {
        x = x + i;
    }
    return x;
}

// console.log("Hiiiii");
self.addEventListener('message', e => {
    self.postMessage(heavilyComputatedValue());
})
