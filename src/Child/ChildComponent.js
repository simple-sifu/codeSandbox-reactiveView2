import React, { useState } from "react";
import Presenter from "../Presenter";
import { observe } from "mobx";
import ChildChildComponent from "./ChildChild/ChildChildComponent";

const ChildComponent = (props) => {
  const presenter = new Presenter();
  const [viewModel, setViewModel] = useState({});
  // binding output goes here
  React.useEffect(() => {
    async function load() {
      observe(presenter, "viewModel", (obj) => {
        setViewModel(obj.newValue);
      });
      await presenter.load();
    }
    load();
  }, []);

  return (
    <>
      <h3>Reactive Child Component (1-way[down]) </h3>
      {viewModel.formattedString}
      <ChildChildComponent />
    </>
  );
};

export default ChildComponent;
