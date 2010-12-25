function(head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);
    var Atom = require("vendor/couchapp/lib/atom");

    var indexPath = path.list('today','today_status',{descending:false});

    var path_parts = req.path;
    // The provides function serves the format the client requests.
    // The first matching format is sent, so reordering functions changes 
    // thier priority. In this case HTML is the preferred format, so it comes first.
    provides("html", function() {
        var today = new Date();
        // render the html head using a template
        var stash = {
            title : today.toDateString(),
            scripts : {},
            db : req.path[0],
            design : req.path[2],
            assets : path.asset(),
            posts : List.withRows(function(row) {
                var post = row.value;
                var d = new Date(Date.parse(post.created_at));
                var currentHours = d.getHours();
                var currentMinutes = d.getMinutes();
                currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
                currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
                var timeString = currentHours + ":" + currentMinutes;
                return {
                    time : timeString,
                    text : post.text
                }
            })
        }
        return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
    });
};
