import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gridfsBucket;

const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
});


// ✅ Upload Image
export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(404).json("File not found");
    }

    const imageUrl = `http://localhost:8000/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
};


// ✅ Get Image
export const getImage = async (request, response) => {
    try {
        const files = await conn.db.collection('fs.files')
            .find({ filename: request.params.filename })
            .toArray();

        if (!files || files.length === 0) {
            return response.status(404).json("File not found");
        }

        const readStream = gridfsBucket.openDownloadStream(files[0]._id);
        readStream.pipe(response);

    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};