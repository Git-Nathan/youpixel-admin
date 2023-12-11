import { appFetch } from "./configs";

export class User {
  getListUsers(page: number, pageSize: number) {
    return appFetch.get(
      "/users?" +
        new URLSearchParams({
          page: page.toString(),
          per_page: pageSize.toString(),
        }),
    );
  }
}
