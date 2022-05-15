global.console.log('global.process.argv', global.process.argv);
const isRelease = global.process.argv[2] === 'release';
global.console.log('Is release build?', isRelease);

export const config = {
    isRelease,
};
