function(head, req) {
    var row; 
    start({
        "headers": {
            "Content-Type": "text/html"
        }
    });
    send("<ul>");
    while (row = getRow()) {
        var d = new Date(Date.parse(row.value.created_at));
        var currentHours = d.getHours();
        var currentMinutes = d.getMinutes();
        currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        var timeString = currentHours + ":" + currentMinutes;
        send("<li>" + timeString + " - " + row.value.text + "</li>");
    }
    send("</ul>");
}
