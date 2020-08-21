import React, { Suspense, lazy } from "react";
import SearchField from "./content/searchField";
import classes from "./App.module.scss";
function App() {
  return (
    <div className={classes.App}>
      <SearchField />
    </div>
  );
}

export default App;
