function(doc) {
    if (doc.type == 'status') {
        var date = Date.parse(doc.created_at); 
        var now = new Date(); 
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 

        if (date >= today.getTime()) {
            emit(date, doc.text);
	    }
    }
}

