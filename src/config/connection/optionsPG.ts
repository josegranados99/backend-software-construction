import pgPromise from "pg-promise";
import { camelizeColums } from "./camelCase";

export const optionsPG: pgPromise.IInitOptions<{}> = {
  receive(e) {
    camelizeColums(e.data);
  },
};
