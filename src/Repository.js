import { makeAutoObservable } from "mobx";
import Gateway from "./Gateway";

class Repository {
  programmersModel;

  constructor() {
    this.gateway = new Gateway();
    this.programmersModel = { fName: null, lName: null };
    makeAutoObservable(this);
  }

  async load() {
    const dto = await this.gateway.get();
    this.programmersModel = { fName: dto.firstName, lName: dto.lastName };
  }

  updateProgrammersModel(fName, lName) {
    this.programmersModel = { fName: fName, lName: lName };
  }
}

const repository = new Repository();

export default repository;
