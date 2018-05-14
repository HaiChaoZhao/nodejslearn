const path=require('path');
const mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/js',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/w-wav',
    'wma': 'audio/w-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
};
module.exports=(filePath)=>{
    let ext=path.extname(filePath).split('.').pop().toLowerCase();
    if(!ext){
        ext=filePath;
    }
    return mimeTypes[ext]||mimeTypes['txt'];
}