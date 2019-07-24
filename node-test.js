var Client = require('node-torrent');
var client = new Client();
var torrent = client.addTorrent("magnet:?xt=urn:btih:6c6c914bc0b5cf6349028d8c8b829f828cd3f301&dn=Doctor+who+Season+8+Episode+9+Flatline&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969")

// when the torrent completes, move it's files to another area
torrent.on('complete', function () {
    console.log('complete!');
    var arr = [];
    torrent.files.forEach(function (file) {
        var ext = file.path.slice(-3);
        console.log(ext)
        var path = file.path
        console.log(path)
        var newPath = path.indexOf("/") > -1 ? path.slice(path.lastIndexOf("/") + 1) : "/home/amon/movies/" + path
        if (ext == "mp4" || ext == "avi" || ext == "mp3") {
            arr.push(name + " Successfully downloaded");
            fs.writeFileSync(newPath, buffer);
        }
        fs.rename(path, newPath);
        file.path = newPath;
    });
});