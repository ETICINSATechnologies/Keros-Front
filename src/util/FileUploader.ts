import { FileArray, UploadedFile } from "express-fileupload";
import * as winston from "winston";

export class FileUploader {

    static obtainFileBase64(files: FileArray, filename: string): string | undefined {
        const file = files.filename;
        if (file === null) {
            winston.warn("File named " + filename + " doesn't exist.");
            return;
        }
        if (file instanceof Array) {
            winston.error("Many files named " + filename + " have been found.");
            return;
        }
        return (file).data.toString("base64");
    }
}
