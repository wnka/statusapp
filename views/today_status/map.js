function(doc) {
    if (doc.type == 'status') {
        var date = Date.parse(doc.created_at); 
        var now = new Date();
        var diff = 24*60*60*1000; 
        today = new Date(now.getTime() - diff);

        if (date >= today.getTime()) {
            emit(date, doc.text);
        }
    }
}

