import React from "react";
import { useFetch } from "../../useFetch";
export var RandomQuote = function () {
    var _a = useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1"), randomQuote = _a.data, loading = _a.loading;
    var quote = randomQuote;
    return React.createElement("div", null, !loading && randomQuote ? quote.quotes : "Loading");
};
//# sourceMappingURL=index.js.map