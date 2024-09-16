window.onload = function() {
    const button = document.getElementById("submit");

    button.addEventListener("click", function() {
        var inputJSON = document.getElementById("input").value;
        var isOther = document.getElementById("other").checked;
        var type = isOther ? "other" : "ipo";
    
        try {
            var data = JSON.parse(inputJSON);
            console.log(data);
        } catch(err) {
            
        }
    });
}

