const {writeFileSync, mkdirSync} = require('fs');

require('dotenv').config();

const targePath = './src/environments/environment.ts'
const targePathDev = './src/environments/environment.development.ts'

if( !process.env['MAPBOX_KEY']){
    throw new Error('MAPBOX_KEY is not set')
}

const envFileContent = `
export const environment = {
    mapboxKey:"${process.env['MAPBOX_KEY']}"    
};  
`;

mkdirSync('./src/environments',{recursive: true});

writeFileSync(targePath, envFileContent);
writeFileSync(targePathDev, envFileContent)
