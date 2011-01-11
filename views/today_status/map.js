function(doc) {
    if (doc.type == 'status') {
        var date = Date.parse(doc.created_at); 
        var now = new Date();
        var diff = 8*60*60*1000; 
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
        today = new Date(today.getTime() - diff);

        if (date >= today.getTime()) {
            emit(date, doc.text);
        }
    }
}

