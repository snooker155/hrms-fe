import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import url from 'url';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

const router = express.Router();
router.get('/rest/*', readRestHandler(path.resolve(__dirname, '..', 'rest')));
app.use(router);

app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
});

/* */
function readRestHandler(rootPath) {
    return function(req, res) {
        const cleanedUrl = cutParamsFromUrl(req.originalUrl);
        const pagePath = parsePathname(cleanedUrl).replace(/^\/rest/, '');
        try {
            const jsonString = readFile(path.join(rootPath, pagePath) + '.json');
            res.status(200).json(JSON.parse(jsonString));
        } catch (e) {
            if (e.code === 'ENOENT') {
                res.status(404);
            } else {
                res.status(417).send(e);
            }
        }
    }
}

function readFile(filePath) {
    return fs.readFileSync(path.join(filePath), "utf-8");
}

function parsePathname(urlString) {
    return url.parse(urlString, true).pathname;
}

function cutParamsFromUrl(url) {
    var pathParamsPair = url.split(/#|\?/);
    return pathParamsPair[0];
}
