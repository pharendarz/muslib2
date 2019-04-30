const mongoose = require('mongoose');
const {Schema} = mongoose;

const GlobalSetupSchema = new Schema({
    setupId: Number,
    lastNumberIndexAlbum: Number,
    lastNumberIndexTrack: Number
});

mongoose.model('globals', GlobalSetupSchema);
const Setup = mongoose.model('globals', GlobalSetupSchema);

exports.updateLastNumberIndexAlbum = async (id, lastNumber) => {
    return new Promise(async (resolve, reject)=>{

        await Setup.findById(id, (err, globalSetup) => {
            globalSetup.lastNumberIndexAlbum = lastNumber;
            globalSetup.save().then(() => {
                console.log(`[][][] update number for global setup - lastNumberIndexAlbum = ${lastNumber}...`);
                resolve(lastNumber);
            });
        });    
    })
};
// exports.updateLastNumberIndexTrack = async (id, lastNumber) => {
//     await Setup.findById(id, (err, globalSetup) => {
//         globalSetup.lastNumberIndexTrack = lastNumber;
//         globalSetup.save().then(() => {
//             console.log('[][][] update number for global setup - lastNumberIndexTrack...');
//         });
//     });    
// };
exports.createSetup = async (data) => {
    await new Setup({
        setupId: 1,
        lastNumberIndexAlbum: 1,
        lastNumberIndexTrack: 1
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating Setup ...`);
    });
};