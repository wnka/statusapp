function(newDoc, oldDoc, userCtx) {
    if (!userCtx.name) {
        throw({forbidden:"log in"}); 
    } 
    function require(field, message) {
        message = message || "document must have a " + field;     
        if (!newDoc[field]) throw({forbidden:message});}; 

    if (newDoc.type == "status") {
        require("text");     
        require("created_at");
        if (!Date.parse(newDoc["created_at"])) {
            throw({forbidden: "invalid created_at value " + newDoc["created_at"]}); }
        require("isWork"); 
    } 
}
