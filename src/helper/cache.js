const {cache}=require('../config/defaultConfig');
function refreshRes(stats,res){
    const {maxAge,cacheControl,lastModified,etag}=cache;
    if(cacheControl){
         res.setHeader('Cache-Control',`public,max-age=${maxAge}`);
    }
    if(lastModified){
        res.setHeader('lastModified',stats.mtime.toUTCstring);

    }
    if(etag){
        res.setHeader('etag',`${stats.size}-${stats.mtime}`);
    }
    module.exports=function ifFresh(stats,req,res){
        refreshRes(stats,res);
        const lastModified=req.headers['if-modified-since'];
        const etag=req.headers['if-none-match'];
        if(!lastModified&&!etag){
            return false;
        }
        if(lastModified&&lastModified!==res.getHeader('lastModified')){
            return false;
        }
        if(etag&&etag!==res.getHeader('ETag')){
            return false;
        }
        return true;
    }
}