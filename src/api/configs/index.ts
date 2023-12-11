import { User } from "../Users";
import { AppFetch } from "./AppFetch";

export const appFetch = new AppFetch("https://reqres.in/api");

const user = new User();

export const Api = { user };
