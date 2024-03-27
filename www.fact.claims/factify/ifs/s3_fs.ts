import AWS from 'aws-sdk';
import { I_FileReader, I_FileWriter, I_Filing, I_File, I_ContentFile, I_Folder } from '..';
import { toID } from './util';

export class S3Store implements I_FileReader<string>, I_FileWriter<string>, I_Filing {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(accessKeyId: string, secretAccessKey: string, bucketName: string) {
    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
    this.bucketName = bucketName;
  }

  toFile(path: string): I_File {
    return {
        name: path,
        _id: toID(path),
        _path: path
    };
}

  exists(file: I_File): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private getObjectKey(path: string): string {
    return path.startsWith('/') ? path.substring(1) : path;
  }

  private async getObject(path: string): Promise<AWS.S3.GetObjectOutput> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: this.bucketName,
      Key: this.getObjectKey(path),
    };
    return this.s3.getObject(params).promise();
  }

  private async putObject(
    path: string,
    data: any,
    mimeType: string
  ): Promise<AWS.S3.PutObjectOutput> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: this.getObjectKey(path),
      Body: data,
      ContentType: mimeType,
    };
    return this.s3.putObject(params).promise();
  }

  private async listObjects(path: string): Promise<AWS.S3.ListObjectsV2Output> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucketName,
      Prefix: this.getObjectKey(path),
    };
    return this.s3.listObjectsV2(params).promise();
  }

  private mapS3ObjectToContentFile(s3Object: AWS.S3.GetObjectOutput): I_ContentFile<string> {
    const content: string = s3Object.Body?.toString('utf-8') ?? '';
    const mimeType: string = s3Object.ContentType ?? '';
    const name: string = s3Object.Metadata?.name ?? '';
    const filePath: string = s3Object.Metadata?.path ?? '';

    return {
      _id: toID(filePath),
      name: name,
      _path: filePath,
      content: content,
      mime_type: mimeType,
    };
  }

  public async readFile(file: I_File): Promise<I_ContentFile<string>> {
    try {
      const s3Object = await this.getObject(file._path);
      return this.mapS3ObjectToContentFile(s3Object);
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  public async writeFile(
    file: I_File,
    data: any,
    mimeType: string
  ): Promise<I_ContentFile<string>> {
    try {
      await this.putObject(file._path, data, mimeType);
      const s3Object = await this.getObject(file._path);
      return this.mapS3ObjectToContentFile(s3Object);
    } catch (error: any) {
      throw new Error(`Error writing file: ${error.message}`);
    }
  }

  public async listFolder(path: string): Promise<I_Folder> {
    try {
      const objects = await this.listObjects(path);

      const contents: I_File[] = objects.Contents?.map((object: any) => {
        const name: string = object.Key ?? '';
        const filePath: string = `/${name}`;
        const isFolder: boolean = name.endsWith('/');

        if (isFolder) {
          return {
            _id: toID(filePath),
            name: name,
            _path: filePath,
            children: [],
          } as I_Folder;
        } else {
          return {
            _id: toID(filePath),
            name: name,
            _path: filePath,
          } as I_File;
        }
      }) ?? [];

      return {
        _id: toID(path),
        name: '',
        _path: path,
        children: contents,
      };
    } catch (error: any) {
      throw new Error(`Error listing folder: ${error.message}`);
    }
  }
}
