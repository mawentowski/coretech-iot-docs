export const DIST_DIRECTORY = 'dist';
export const SASS_FOLDER = 'scss';
export const SRC_DIRECTORY = 'src';

export function getFilenameWithoutExtension(filename) {
    const regExpExecArray = /(\S*)\./.exec(filename);
    return regExpExecArray[1];
}
