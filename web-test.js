const WebTorrent = require('webtorrent');
var client = new WebTorrent()
const fs = require("fs")
client.add("magnet:?xt=urn:btih:86d565c1f38441f3f3155b0ff779e36cc2f9debb&dn=Star+Trek+Border+Patrol+Episode+0&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969")
var interval = setInterval(() => {
    console.log(client.progress)
}, 3000)
client.on("torrent", torrent => {
    torrent.on("done", () => {
        console.log("done")
        var path = "/home/amon/movies/";
        var arr = []
        var files = torrent.files;
        var finished = 0;
        for (i = 0; i < files.length; i++) {
            var callback = (function (name) {
                return {
                    call: function (err, buffer) {
                        var ext = name.slice(-3);
                        if (ext == "mp4" || ext == "avi" || ext == "mp3") {
                            arr.push(name + " Successfully downloaded");
                            fs.writeFileSync(path + name, buffer);
                        }
                        finished++;
                    }
                };
            })(files[i].name);
            files[i].getBuffer(callback.call);
        }
        var wait = setInterval(() => {
            if (finished == files.length) {
                clearInterval(wait);
                clearInterval(interval)
                console.log("Finished!")
                console.log(arr);
            }
        }, 1000)
    })
})
client.on("error", err => console.log(err))