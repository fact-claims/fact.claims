import { I_CRUD } from "..";

class CrudAPI<T> implements I_CRUD<T> {

  constructor(public apiPath: string) {}

  find(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }

  read = async (): Promise<T[]> => {
    const response = await fetch(this.apiPath);
    const data = await response.json();
    return data;
  };

  create = async (todo: T): Promise<T> => {
    const response = await fetch(this.apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
  };

  update = async (todo: T): Promise<T> => {
    const response = await fetch(this.apiPath+`/${todo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
  };

  delete = async (todo: T): Promise<T> => {
    const response = await fetch(this.apiPath+`/${todo}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
}

export default CrudAPI;
