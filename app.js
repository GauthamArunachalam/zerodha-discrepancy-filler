async function filler(restAPIData) {
    var addTradeButton = document.getElementsByClassName("add-external-trade");
    console.log(addTradeButton);
    addTradeButton = addTradeButton[0];
    console.log(addTradeButton);
    addTradeButton.click();
    console.log(restAPIData);

    await new Promise(r => setTimeout(r, 1000));

    var modelContainer = document.getElementsByClassName("modal-container");
    console.log(modelContainer);
    var ab = modelContainer[0];
    console.log(ab);
    var datePicker = document.getElementsByName("date")[0];
    console.log(datePicker);
    datePicker.value = "2024-07-01";
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    
    // Trigger both events to simulate a user input
    datePicker.dispatchEvent(inputEvent);
    datePicker.dispatchEvent(changeEvent);

    var avgPrice = ab.querySelector("input[label='Avg. price']");
    console.log(avgPrice);
    avgPrice.click();
    avgPrice.value = 8;
    avgPrice.dispatchEvent(new Event("input"))


    var qty = ab.querySelector("input[label='Qty.']");
    console.log(qty);
    qty.focus();
    qty.value = 13.392;
    qty.dispatchEvent(new Event("input"))

    var typeDD = ab.getElementsByTagName("select")[0];
    console.log(typeDD);
    typeDD.focus();
        
    typeDD.value = "discrepant";
    typeDD.dispatchEvent(new Event("change"))

    await new Promise(r => setTimeout(r, 1000));

    var submitButton = ab.getElementsByTagName("button")[0];
    console.log(submitButton);
    submitButton.click();

}


window.onload = function() {
    const button = document.getElementById("submit");

    button.addEventListener("click", function() {
        var inputJSON = document.getElementById("input").value;
        var isOther = document.getElementById("other").checked;
        var type = isOther ? "other" : "ipo";
    
        var data = null
        try {
            data = JSON.parse(inputJSON);
            var dataRes  = data["data"];
            var res = dataRes["result"];
            if (res.length > 0) {
                chrome.tabs.query({active : true, currentWindow : true})
                    .then(([tab]) => {
                        chrome.scripting.executeScript({
                            target : {tabId : tab.id},
                            function : filler,
                            args: [data]
                        }
                    )
                });
            }
            //console.log(data);
        } catch(err) {
            
        }

        //window.close();

    });
}

