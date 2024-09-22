var data = {
    "tradingsymbol": "NAVI NIFTY 50 INDEX FUND - DIRECT PLAN",
    "client_id": "DWN824",
    "instrument_id": "8522ffdac59d78b5480be5c061477701",
    "exchange": "BSE",
    "quantity": 70.562,
    "price": 15.5885,
    "order_execution_time": "2024-07-01T00:00:00",
    "trade_id": "1236207327",
    "order_id": "1236207327",
    "pledged": false,
    "trade_type": "buy",
    "external_trade_type": null,
    "tags": []
};

var d = data["order_execution_time"];
console.log(d);
var a = new Date(d);
console.log(typeof d);
console.log(a);
console.log(typeof a);

console.log(a.getDate());
console.log(a.toDateString());

var b = new Date(a.toDateString());
console.log(b);
console.log(typeof b);