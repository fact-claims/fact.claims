import { I_File } from "../types";

export function extractExtension(filename: string) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return filename.slice(lastDotIndex + 1).toLowerCase();
    }
    return '';
}

export function separatePrefixAndSuffix(input: string) {
    const regex = /^(\d+)_([^\.]+)/;
    const match = input.match(regex);
  
    if (match) {
      const prefix = match[1];
      const suffix = match[2];
      return { prefix, suffix };
    }
  
    // Return default values if no match found
    return { prefix: '', suffix: input };
  }
  
  export function toName(path: string) {
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex<0) return separatePrefixAndSuffix(path).suffix;
    return separatePrefixAndSuffix(path.substring(0,lastDotIndex)).suffix;
}

export function toID(path: string) {
    return path.replace(/[^a-zA-Z0-9-]/g, ':');
}

export function toFile(root: string, path: string): I_File {
    const fullPath = path.startsWith(root)?path:root + path
    return {
        _id: toID(path),
        name: toName(path.split('/').pop() || path),
        _path: fullPath
    };
}
