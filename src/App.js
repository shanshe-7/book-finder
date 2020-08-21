import React, { Suspense, lazy } from "react";
import classes from "./App.module.scss";

const SearchField = lazy(() => import("./content/searchField"));
function App() {
  return (
    <div className={classes.App}>
      <Suspense
        fallback={
          <>
            <div> Loading...</div>
          </>
        }
      >
        <SearchField />
      </Suspense>
    </div>
  );
}

export default App;
