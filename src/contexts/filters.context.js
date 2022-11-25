import React from "react";

const InitialValue = {
    filters: []
};

const FiltersContext = React.createContext(InitialValue);

export { FiltersContext, InitialValue };