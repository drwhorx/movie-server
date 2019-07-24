var torrentstream = require('torrent-stream');
var fs = require("fs")
var torrent = torrentstream('magnet:?xt=urn:btih:6c6c914bc0b5cf6349028d8c8b829f828cd3f301&dn=Doctor+who+Season+8+Episode+9+Flatline&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969');
torrent.path = "/home/amon/movies/"
torrent.on('ready', function() {
    torrent.files.forEach(function(file) {
        var ext = file.name.slice(-3);
        console.log(file.name + " : " + ext)
        if (ext == "mp4" || ext == "avi" || ext == "mp3") {
            file.path = "/home/amon/movies/" + file.name
        }
        // stream is readable stream to containing the file content
    });
});
torrent.on("download" , () => {
    console.log("download")
})
torrent.on("idle", () => {
    console.log("idle")
})
torrent.on("upload", () => {
    console.log("upload")
})
torrent.on("torrent", () => {
    console.log("torrent")
})