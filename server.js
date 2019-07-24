const fs = require("fs");
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const WebTorrent = require('webtorrent');
var client = new WebTorrent()
const search = require('torrent-search-api');
search.enableProvider("ThePirateBay");

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static('./'))
app.get('/download', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.sendFile(__dirname + '/download.html');
});

app.get('/play', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.sendFile(__dirname + '/play.html');
})

io.on('connection', function (socket) {
    socket.on('getfiles', () => {
        var files = fs.readdirSync("/home/amon/movies/", { withFileTypes: true })
            .filter(f => f.isDirectory())
            .map(f => f.name)
        socket.emit('files', files);
    })

    socket.on('search', (query) => {
        search.search(query, "Video", 20).then(torrents => {
            socket.emit('found', torrents)
        })
    })

    socket.on('download', (opts) => {
        client.add(opts.link)
        client.on("torrent", torrent => {
            torrent.on("done", () => {
                var path = "/home/amon/movies/";
                var arr = []
                var files = torrent.files;
                var finished = 0;
                for (i = 0; i < files.length; i++) {
                    var callback = (function (name) {
                        return {
                            call: function (err, buffer) {
                                console.log(name)
                                var ext = name.slice(-3);
                                if (ext == "mp4" || ext == "avi") {
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
                        socket.emit("downloaded", arr);
                        clearInterval(wait);
                    }
                }, 1000);
            })
        })
    })
});
server.listen(8080);