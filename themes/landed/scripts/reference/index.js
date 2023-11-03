const reg = /\[.*?\]\((https?):\/\/[^\s/$.?#].[^\s]*[^\s.?#]\)/g;

// 图片类型的扩展名列表
const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];

hexo.extend.filter.register('before_post_render', function (data) {
    const urlArray = data.content.match(reg);
    const uniqueUrls = [...new Set(urlArray)];
    let need_header = true;
    for (let i = 0; i < uniqueUrls.length; i++) {
        let pass = true;
        imageExtensions.forEach(function (ext) {
            if (uniqueUrls[i].endsWith("." + ext + ")")) {
                pass = false;
            }
        })
        if (pass) {
            hexo.log.info("find a reference link: " + uniqueUrls[i]);
            if (need_header) {
                data.content = data.content + "\n" + "#### 参考链接\n";
                need_header = false
            }
            data.content = data.content + "> " + i + "." + uniqueUrls[i].split("(")[0].replace("[", "").replace("]", "") +
                " : " + uniqueUrls[i].split("(")[1].replace(")", "") + "\n";

        }
    }
    return data;
});
