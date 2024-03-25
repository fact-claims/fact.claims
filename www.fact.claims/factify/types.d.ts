
export interface I_File {
    _id: string;
    _path: string;
    name: string;
}

export interface I_ContentFile<T> extends I_File {
    content: T;
    mime_type: string;
}

export interface I_Folder extends I_File {
    children: I_File[];
}

export interface I_FileReader<T> {
    readFile(file: I_File): Promise<I_ContentFile<T>>
    exists(file: I_File): Promise<boolean>
}

export interface I_FileWriter<T> {
    writeFile(file: I_File, data: any, mime_type?: string): Promise<I_ContentFile<T>>
}

export interface I_Filing {
    toFile(path: string): I_File
    listFolder(path: string): Promise<I_Folder>
}

export interface I_FileStore<T> extends I_FileReader<T>, I_Filing{

}

/** CRUD */

export interface I_CRUD<T> {
    read(): Promise<T[]>;
    find(id: string): Promise<T | undefined>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(item: T): Promise<T>;
  }
  
  export interface I_CRUD_ID {
    id: string
  }

  /** Graph */

  export interface Graph {
    nodes: Record<string, Node>
    edges: Record<string, Edge>
    layouts: {
      nodes: Record<string, any>
    }
  }
  export interface Node extends vNG.Node {
    "@id": string
    prefLabel: string
  }
  
  export interface Edge extends vNG.Edge {
    prefLabel?: string
  }
  
  