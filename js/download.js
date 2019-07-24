function search() {
    socket.emit("search", $("#search").val())
    document.getElementById("loading").hidden = false;
}
function selected(element) {
    chosen = results.find(e => e.title == element.innerText);
    console.log(chosen.magnet)
    var tbody = document.getElementById("results") 
    var rows = tbody.children;
    for (i = 0; i < rows.length; i++) {
        if (rows[i].children[0].innerText != element.innerText) {
            tbody.removeChild(rows[i]);
            i--;
        }
    }
    document.getElementById("options").hidden = false;
}
function download() {
    socket.emit('download', {
        link: chosen.magnet,
        name: document.URL
    })
    document.getElementById("status").hidden = false;
    socket.on('downloaded', (data) => {
        document.getElementById("status").hidden = true;
        console.log(data);
        for (i = 0; i < data.length; i++) {
            document.getElementById("files").innerHTML += `<tr><td colspan="2">${data[i]}</td></tr>`
        }
    })
}
var results;
var chosen;
socket.on('found', (found) => {
    document.getElementById("loading").hidden = true;
    document.getElementById("selectResult").hidden = false;
    results = found;
    for (i = 0; i < found.length; i++) {
        var row = document.getElementById("results").insertRow()
        var title = row.insertCell();
        var size = row.insertCell();
        title.innerText = found[i].title;
        title.setAttribute("onclick", "selected(this)");
        size.innerText = found[i].size;
    }
})