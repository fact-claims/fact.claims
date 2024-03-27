import { I_CRUD, I_CRUD_ID } from "..";

export default class LocalStorageCRUD<T extends I_CRUD_ID> implements I_CRUD<T> {
    private storageKey: string;
    private idKey = "id"

    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    private getDataFromStorage(): T[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private setDataToStorage(data: T[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    public async read(): Promise<T[]> {
        return this.getDataFromStorage();
    }

    public async find(id: string): Promise<T | undefined> {
        const data = this.getDataFromStorage();
        return data.find((item: T) => (item as any)[this.idKey] === id);
    }

    // public async findByParams(id: object): Promise<T | undefined> {
    //         const data = this.getDataFromStorage();
    //         return data.find((item: T) => (item as any)[this.idKey] === id);
    //     }

    public async create(item: T): Promise<T> {
        const data = this.getDataFromStorage();
        data.push(item);
        this.setDataToStorage(data);
        return item;
    }

    public async update(item: T): Promise<T> {
        const data = this.getDataFromStorage();
        const index = data.findIndex((storedItem: T) => storedItem.id === item.id);
        if (index !== -1) {
            data[index] = item;
            this.setDataToStorage(data);
            return item;
        } else {
            throw new Error(`Item with ID ${item.id} does not exist.`);
        }
    }

    public async delete(item: T): Promise<T> {
        const data = this.getDataFromStorage();
        const index = data.findIndex((storedItem: T) => storedItem.id === item.id);
        if (index !== -1) {
            data.splice(index, 1);
            this.setDataToStorage(data);
            return item;
        } else {
            throw new Error(`Item with ID ${item.id} does not exist.`);
        }
    }
}
