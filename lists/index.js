function(head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);
    var Atom = require("vendor/couchapp/lib/atom");
    
    var indexPath = path.list('today','today_status',{descending:false});

    var path_parts = req.path;

    var padDigit = function(val) {
        return (val < 10 ? "0" : "") + val;
    }

    // The provides function serves the format the client requests.
    // The first matching format is sent, so reordering functions changes 
    // thier priority. In this case HTML is the preferred format, so it comes first.
    provides("html", function() {
        var today = new Date();
        // render the html head using a template
        var stash = {
            title : today.getTime(),
            scripts : {},
            posts : List.withRows(function(row) {
                return {
                    time : row.key,
                    text : row.value
                }
            })
        }
        return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
    });

  provides("text", function() {    
      var row;
      while (row = getRow()) {
          var post = row.value;
          var d = new Date(Date.parse(post.created_at));
          var timeString = padDigit(d.getHours()) + ":" + padDigit(d.getMinutes());
          var entry = timeString + " ==> " + post.text + "\n";
          send(entry);
      }
  });

};
