function(doc, req) {  
    return "<h1>" + doc.created_at + "</h1><p>" + doc.text + "</p>";
}
