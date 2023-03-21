import { observe, makeAutoObservable } from "mobx";
import repository from "./Repository";

export default class Presenter {
  viewModel;

  constructor() {
    this.viewModel = { formattedString: null, fName: null, lName: null };
    makeAutoObservable(this);
  }

  load = async () => {
    observe(repository, "programmersModel", (obj) => {
      this.viewModel = {
        formattedString:
          "Hello your name is " + obj.newValue.fName + " " + obj.newValue.lName,
        fName: obj.newValue.fName,
        lName: obj.newValue.lName
      };
    });
    await repository.load();
  };

  submit = (viewModel) => {
    repository.updateProgrammersModel(viewModel.fName, viewModel.lName);
  };
}
