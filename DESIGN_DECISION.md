# Design decision

### Why do we show loading screen while filling?

- If we close the extension window before the full filling is finished the process is terminated and not all records are added. Hence we show a loading screen.

### Why cant the extend also extract data from source account without getting the data from dev tools REST API response?

- For first version it is better to go with REST API as it solves the core issue. In future the extension can be extended to extract the data.