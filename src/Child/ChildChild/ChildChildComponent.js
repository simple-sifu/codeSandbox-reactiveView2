import React, { useState } from "react";
import Presenter, { presenter } from "../../Presenter";
import { observe } from "mobx";
import { useEffect } from "react";

const ChildComponent = (props) => {
  const [viewModel, setViewModel] = useState({});
  const presenter = new Presenter();
  // binding output goes here
  useEffect(() => {
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
      <h3>Reactive Child Child Component(1-way[up]) </h3>
      <input
        value={viewModel.fName}
        onChange={(event) => {
          setViewModel({
            ...viewModel,
            fName: event.target.value
          });
        }}
      />
      <input
        type="button"
        value="update"
        onClick={() => {
          presenter.submit(viewModel);
        }}
      />
    </>
  );
};

export default ChildComponent;
