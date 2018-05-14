const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mime=require('./mime');
const compress=require('./compress');

const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(decodeURI(filePath));
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', mime(filePath));
            let rs=fs.createReadStream(decodeURI(filePath));
            if(filePath.match(config.compress)){
                rs=compress(rs,req,res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files:files.map(file=>{
                    return {
                        file:file,
                        icon:mime(file)
                    }
                })
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(template(data));
        }
    } catch (error) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
        return;
    }
}