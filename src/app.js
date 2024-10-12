async function filler(data, type) {

    var addTradeButton = document.getElementsByClassName("add-external-trade")[0];

    for (row of data) {
        addTradeButton.click();

        await new Promise(r => setTimeout(r, 1000));

        var modelContainer = document.getElementsByClassName("modal-container")[0];

        var datePicker = document.getElementsByName("date")[0];

        var dateVal = row["order_execution_time"];
        dateVal = dateVal.substring(0, dateVal.indexOf("T"));

        datePicker.value = dateVal;

        datePicker.dispatchEvent(new Event('input', {bubbles: true}));
        datePicker.dispatchEvent(new Event('change', {bubbles: true}));

        var avgPrice = modelContainer.querySelector("input[label='Avg. price']");
        avgPrice.click();
        var price = row["price"];
        avgPrice.value = price;
        avgPrice.dispatchEvent(new Event("input"));

        var qty = modelContainer.querySelector("input[label='Qty.']");
        qty.focus();
        var quantity = row["quantity"];
        qty.value = quantity;
        qty.dispatchEvent(new Event("input"));

        var typeDD = modelContainer.getElementsByTagName("select")[0];
        typeDD.focus();
        typeDD.value = type;
        typeDD.dispatchEvent(new Event("change"))

        await new Promise(r => setTimeout(r, 1000));

        var submitButton = modelContainer.getElementsByTagName("button")[0];
        submitButton.click();

        await new Promise(r => setTimeout(r, 1000));

        var errorMsg = document.getElementsByClassName("icon-alert-triangle");
        if (errorMsg.length > 0) {
            console.log("error");
            return "error";
        }
    }

    return "success";
}


window.onload = function() {

    chrome.tabs.query({active: true, currentWindow: true})
    .then(([tab]) => {
        var url = tab["url"];
        if (url.indexOf("console.zerodha.com/portfolio/holdings/discrepancy/EQ") == -1) {
            var  form = document.getElementById("form");
            var errorDiv = document.getElementById("not-applicable");
            errorDiv.classList.add("show");
            form.classList.add("no-show");
        }
    });

    const button = document.getElementById("submit");

    button.addEventListener("click", function() {
        var inputJSON = document.getElementById("input").value;
        var isOther = document.getElementById("other").checked;
        var type = isOther ? "discrepant" : "ipo";
    
        var data = null
        try {
            data = JSON.parse(inputJSON);
            var dataRes  = data["data"];
            var res = dataRes["result"];
            if (res.length > 0) {
                chrome.tabs.query({active : true, currentWindow : true})
                    .then(([tab]) => {
                        var  form = document.getElementById("form");
                        var loader = document.getElementById("loader");
                        loader.classList.remove("no-show");
                        loader.classList.add("show");
                        loader.classList.add("warning");
                        form.classList.add("no-show");
                        chrome.scripting.executeScript({
                            target : {tabId : tab.id},
                            function : filler,
                            args: [res, type]
                        }).then(result => {
                            var res = result[0];
                            console.log(result);
                            console.log(res);
                            var response = res["result"];
                            if (response == "success") {
                                chrome.notifications.create("success-message", 
                                    {
                                        type : 'basic',
                                        iconUrl : 'icons/fav_icon.png',
                                        title : 'All discrepancies added successfully!',
                                        message : 'All discrepancies added successfully!'
                                    });
                            } else {
                                chrome.notifications.create("error-message",
                                    {
                                        type : "basic",
                                        iconUrl : "icons/fav_icon.png",
                                        title : "Discrepancies failed",
                                        message : "Discrepancies failed :("
                                });
                            }
                            window.close();
                        })
                    });
            }
        } catch(err) {
            chrome.notifications.create("invalid-input", 
                {
                    type : "basic",
                    iconUrl : "icons/fav_icon.png",
                    title : "Invalid input",
                    message : "Invalid input :("
            });
            window.close();
        }
    });
}

