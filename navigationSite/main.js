const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
/*
* 声明一个初始的字符串
* */
const hashMap = xObject || [
    {logo: "A", url: "https://www.acfun.cn"},
    {logo: "B", url: "https://www.bilibili.com"}
];

/* 对URL内容做简化:
*  1. 将https:// 替换为空字符串
*  2. 将http:// 替换为空字符串
*  3. 将www. 替换为空字符串
*  4. 将/及其后面的内容 替换为空字符串
*  */
const simplifyURL = url => {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, "");
};

const render = () => {
    //将li中类名不为last的全部删除掉
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyURL(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        //li被点击的话 则调用window.open方法打开对应的URL地址
        $li.on("click", () => {
            window.open(node.url);
        });
        //点击close类的话,阻止捕获和冒泡阶段中当前事件的进一步传播并且从hashMap中删除当前的对象
        $li.on("click", ".close", e => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    })
};
render();

/* 点击对应的添加按钮  */
$(".addButton").on("click", () => {
    let url = window.prompt("请问你要添加的网址是什么?");
    if (url.indexOf("http") !== 0) {
        url = `http://${url}`;
    }
    //添加了URL之后,将会添加一个站点对象
    hashMap.push({
        logo: simplifyURL(url)[0].toUpperCase(),
        url:url
    });
    /*添加之后里立即渲染*/
    render();
});

/*
  窗口即将被卸载前 讲hasMap序列化为json对象存入到localstorage中
*/
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
};
/*
*  监听文档对象 如果监听到了对应的键盘按下事件
*/
$(document).on("keypress", e => {
    const {key} = e;
    for (let i = 0; i < hashMap.length; i++) {
        //如果hasMap中的logo转换为小写和key相等的话 那么就打开对应的URL地址
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
});
