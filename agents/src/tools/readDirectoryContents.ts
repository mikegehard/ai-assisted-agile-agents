import {Dir, readFileSync} from "node:fs";
import {readdir, stat} from "fs/promises";
import {join} from "path";
import {opendir} from "node:fs/promises";


export type FileMap = Map<string, string>;

export async function readDirectoryContents(dir: Dir, parentDir: string = "", contents: FileMap = new Map<string, string>()): Promise<FileMap> {
    const files = await readdir(dir.path);

    for (const file of files) {
        const fullPath = join(dir.path, file);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            const subDir = await opendir(fullPath);
            await readDirectoryContents(subDir, file, contents);
            await subDir.close();
        } else {
            contents.set(join(parentDir, file), readFileSync(fullPath).toString()) ;
        }
    }

    return contents;
}


