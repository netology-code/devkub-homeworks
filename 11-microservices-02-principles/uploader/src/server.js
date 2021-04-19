const { Client } = require('minio'),
    express = require('express'),
    metrics = require('express-prometheus-middleware'),
    { v4: uuidv4 } = require('uuid'),
    FileType = require('file-type');
;

const {
    S3_HOST,
    S3_PORT,
    S3_ACCESS_KEY,
    S3_ACCESS_SECRET,
    S3_BUCKET,
    PORT
} = process.env;

console.log(`S3: ${S3_HOST}:${S3_PORT} ${S3_BUCKET}`);

const app = express(),
    client = new Client({
        endPoint: S3_HOST,
        port: parseInt(S3_PORT),
        useSSL: false,
        accessKey: S3_ACCESS_KEY,
        secretKey: S3_ACCESS_SECRET
    });

app.disable('etag');
app.use(metrics(
    {
        metricsPath: '/metrics',
        collectDefaultMetrics: true,
        normalizeStatus: false,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5, 2],
        customLabels: ['app_name'],
        transformLabels(labels, req) {
            labels.app_name = 'uploader';
        }
    }
));

app.get('/status', (_, response) => {
    return response.status(200).json({ "status": "OK" });
});

app.post('/v1/upload', (request, response) => {    
    var bufs = [];
    request.on('data', (d) => bufs.push(d));
    request.on('end', async () => {
        var buf = Buffer.concat(bufs);

        const fileType = await FileType.fromBuffer(buf);
        console.log(`Detected file type: ${fileType.mime}`);

        if(!fileType) {
            console.warn(`Failed to detect file mime type`);
            return response.status(400).json({ 'error': 'Failed to detect file mime type' });
        }

        if(!fileType.mime.startsWith('image/')) {
            console.warn(`Expected image, but got ${fileType.mime}`);
            return response.status(400).json({ 'error': 'File expected to be image' });
        }

        const id = uuidv4();
        const filename =  `${id}.${fileType.ext}`;
        
        client.putObject(S3_BUCKET, filename, buf, function (err, objInfo) {
            if (err) {
                console.error(`Failed to save file due to error ${err}`);
                return response.status(500).json({ "error": err });
            }
            console.log(`Saved file: ${filename}`);
            return response.json({filename});
        })
    });    
});

const port = PORT || 3000;
app.listen(port, "0.0.0.0");
console.log(`Listening on port ${port}`);