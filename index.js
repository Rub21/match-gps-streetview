#!/usr/bin/env node
const csv = require('csvtojson');
const asynccsv = require('async-csv');
const fs = require('fs');
const differece = 0.00001;
async function main() {
    const images = await asynccsv.parse(fs.readFileSync('data/images.csv', 'utf8'), { columns: true })
    const panoramas = await csv({ delimiter: '\t' }).fromFile('data/Bogota_panorama_v3.csv', 'utf8');
    const result = images.map(item => {
        const imagenNameChunks = item.image.split('.')[0].split('_');
        const imageTime = Number(`${imagenNameChunks[0]}.${imagenNameChunks[1]}`);
        const pans = panoramas.filter(panorama => {
            const panoramaTime = Number(panorama['gps_seconds[s]']);
            const diff = Math.abs(panoramaTime - imageTime)
            panorama.diff = diff;
            if (diff < differece) {
                return true;
            } else {
                return false;
            }
        })
        // if(pans.length>1){
        //     console.log(JSON.stringify(pans));
        // }
        return Object.assign(item, pans[0]);
    });
    console.log(JSON.stringify(result));
}
main();
