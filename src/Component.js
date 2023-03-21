import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Presenter from "./Presenter";
import { observe } from "mobx";
import ChildComponent from "./Child/ChildComponent";

function App() {
  const presenter = new Presenter();
  // binding output goes here
  const [viewModel, setViewModel] = useState({});
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
      <h3>Reactive Parent Component (1-way [up/down])</h3>
      {viewModel.formattedString}

      <br />
      <br />
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
        value={viewModel.lName}
        onChange={(event) => {
          setViewModel({
            ...viewModel,
            lName: event.target.value
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
      <ChildComponent viewModel={viewModel} />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
