import { promises as fs } from 'fs';
import { I_FileReader, I_File, I_ContentFile, I_Folder, I_FileWriter } from '../types';
import yaml from 'yaml';
import { extractExtension, toID, toName } from './util';
import path from 'path'

export class LocalFileReader implements I_FileReader<string> {

    constructor(public root: string = "./") {
    }

    async read(file: I_File): Promise<I_ContentFile<any>> {
        const content = await fs.readFile(file._path, 'utf8');
        const ftype = extractExtension(file._path);
        switch (ftype) {
            case 'md':
                return {
                    ...file,
                    content: content,
                    mime_type: 'text/markdown'
                };
            case 'yaml':
            case 'yml':
                    return {
                    ...file,
                    content: yaml.parse(content),
                    mime_type: 'application/json+yaml'
                };
            case 'json':
                return {
                    ...file,
                    content: JSON.parse(content),
                    mime_type: 'application/json'
                };
        }
        return {
            ...file,
            content: yaml.parse(content),
            mime_type: 'json'
        };
    }

    async readFile(file: I_File): Promise<I_ContentFile<any>> {
        if ('content' in file) {
            return Promise.resolve(file as any);
        } else {
            try {
                return this.read(file);
            } catch (err) {
                return Promise.reject()
            }
        }
    }

    async exists(file: I_File): Promise<boolean> {
        try {
            const found = await fs.stat(file._path)
            return found.isFile()
        } catch (err) {
            return false
        }

    }
    toFile(path: string): I_File {
        if (path.startsWith(this.root)) path = path.substring(this.root.length)
        return {
            name: toName(path.split('/').pop() || path),
            _id: toID(path),
            _path: this.root + "/" + path
        };
    }
}

export class LocalFileStore extends LocalFileReader implements I_FileWriter<string> {

    constructor(public root: string = "./") {
        super(root)
    }

    async listFolder(path: string): Promise<I_Folder> {
        if (!path) throw new Error("missing path")
        // console.log("listFolder: %s", path)
        const folder = this.toFile(path);
        try {
            const i_file = await fs.lstat(folder._path)
            if (i_file.isFile()) return Promise.reject()
        } catch (err) {
            return { ...folder, children: [] };
        }
        const files = await fs.readdir(folder._path);
        const filePromises = files.map(async (filename: string) => {
            const filePath = `${folder._path}/${filename}`;
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                return this.listFolder(filePath);
            } else {
                return this.readFile(this.toFile(filePath));
            }
        });
        const children = await Promise.all(filePromises);
        return {
            _id: toID(path),
            name: toName(path.split('/').pop() || path),
            _path: path,
            children
        };
    }

    async writeFile(file: I_File, data: object): Promise<I_ContentFile<string>> {
        try {
            console.log("ifs.mkdir: %s", file._path)
            await fs.mkdir(path.dirname(file._path))
        } catch (e) { }
        const content = typeof data === 'string' ? data : yaml.stringify(data);
        console.log("ifs.write: %s", file._path)
        await fs.writeFile(file._path, content)
        return Promise.resolve({...file as any,content});
    }

}
