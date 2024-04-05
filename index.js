import log4js from 'log4js';
import config from './config.js';
import fs from 'fs';
import { execSync } from 'child_process';

const logger = log4js.getLogger('main');
logger.level = 'info';

logger.info(`
                                        ######     ##      ####    ##  ##    ####    ######   #####    ##  ##   ######   #####   
                                        ##        ####    ##  ##   ##  ##   ##  ##   ##       ##  ##   ##  ##   ##       ##  ##  
                                        ##       ##  ##   ##       ##  ##   ##       ##       ##  ##   ##  ##   ##       ##  ##  
                                        ####     ######    ####     ####     ####    ####     #####    ##  ##   ####     #####   
                                        ##       ##  ##       ##     ##         ##   ##       ####     ##  ##   ##       ####    
                                        ##       ##  ##   ##  ##     ##     ##  ##   ##       ## ##      ###    ##       ## ##   
                                        ######   ##  ##    ####      ##      ####    ######   ##  ##     ##     ######   ##  ## 
`)
logger.info('Version: 1.0.0     Author: @olliedean');
logger.info('Make sure to check out the README.md for more information on how to use this software.\n\n');

if(!fs.existsSync('client')) {
    logger.error('The client folder does not exist. Please make sure you have a client folder with your modded minecraft instance in.');
    process.exit(1);
}

logger.info("Scanning the mod folder for files to ignore...");

let modFilesToIgnore = config.modFilesToIgnore;

let modFiles = fs.readdirSync('./client/mods');

let filesToIgnore = [];

modFiles.forEach((file) => {
    modFilesToIgnore.forEach((ignore) => {
        if (file.includes(ignore)) {
            logger.info(`Ignoring file: ${file}`);
            filesToIgnore.push(file);
        }
    });
});

logger.info(`Finished scanning the mod folder. Ignoring ${filesToIgnore.length} files.\n\n`);

if (fs.existsSync('server')) {
    fs.rmSync('server', { recursive: true });
}

fs.mkdirSync('server', { recursive: true });

logger.info('Copying the config files to the server folder...');
fs.mkdirSync('server/config', { recursive: true });
if (process.platform === 'win32') {
    execSync(`xcopy /E /I .\\client\\config\\ .\\server\\config\\`);
}
else {
    execSync(`cp ./client/config/* ./server/config/`);
}

logger.info('Copying the mods to the server folder...');
fs.mkdirSync('server/mods', { recursive: true });
fs.readdirSync('./client/mods').forEach((file) => {
    if (!filesToIgnore.includes(file)) {
        if (process.platform === 'win32') {
            execSync(`xcopy /E /I ".\\client\\mods\\${file}" ".\\server\\mods\\"`);
        }
        else {
            execSync(`cp -r ./client/mods/${file} ./server/mods/`);
        }
    }
});

logger.info('Copying datapacks to the server folder...');
fs.mkdirSync('server/datapacks', { recursive: true });
if(fs.existsSync('./client/datapacks')) {
    if (process.platform === 'win32') {
        execSync(`xcopy /E /I .\\client\\datapacks\\ .\\server\\datapacks\\`);
    }
    else {
        execSync(`cp -r ./client/datapacks/* ./server/datapacks/`);
    }
}

if(fs.existsSync('./client/kubejs')) {
    logger.info('Copying KubeJS scripts to the server folder...');
    fs.mkdirSync('server/kubejs', { recursive: true });
    if (process.platform === 'win32') {
        execSync(`xcopy /E /I .\\client\\kubejs\\ .\\server\\kubejs\\`);
    }
    else {
        execSync(`cp -r ./client/kubejs/* ./server/kubejs/`);
    }
}

logger.info("Platform: " + process.platform);
logger.info("Minecraft Version: " + config.minecraftVersion);


logger.info("Finished copying files to the server folder. You can now start the server by running 'npm run start' in the server folder.");