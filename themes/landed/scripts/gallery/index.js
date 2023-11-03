const fs = require('fs');
const YAML = require('js-yaml');


hexo.extend.filter.register('after_clean', function (){
    fs.unlink('./source/_data/gallery.yml',(err,data)=> {
        if (!err) {
            hexo.log.info('删除gallery.yml文件成功');
        }
    });
});


hexo.extend.filter.register('before_post_render', function(data){
    let yml = {};
    if(data.title !== "" && data.title !== "Comments" && data.layout === "post"){
        yml[data.title] = {
            full_link: data.thumbnail,
            descp: data.title,
        };
        fs.appendFile('./source/_data/gallery.yml', YAML.dump(yml), err => {
            if (err) {
                console.error(err);
                return data;
            }
            //文件写入成功。
        });
    }
    return data;
});