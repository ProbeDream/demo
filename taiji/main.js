let html = document.querySelector("#html");
let style = document.querySelector("#style");
let string = `
    /*初始化一个正方形*/
    #div1{
        border:1px solid red;
        width:200px;
        height:200px;
    }
    /*
    将正方形变为原型
    设置对应的阴影部分
    */
    #div1{
        border-radius:50%;
        box-shadow:0 0 3px rgba(0,0,0,0.5);
        border:none;
    }
    /*画一个八卦*/
    #div1{
        background:linear-gradient(90deg,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,1) 50%,
        rgba(0,0,0,1) 50%,
        rgba(0,0,0,1) 100%
        );
    }
    #div1::before{
        width:100px;
        height:100px;
        top:0;
        left:50%;
        transform:translateX(-50%);
        border-radius:50%;
        background:#000;
        /*https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient()*/
        background:radial-gradient(circle,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,1) 25%,
        rgba(0,0,0,1) 25%,
        rgba(0,0,0,1) 100%
        );
    }
    #div1::after{
        width:100px;
        height:100px;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        border-radius:50%;
        background:#fff;
        background:radial-gradient(circle,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 25%,
        rgba(255,255,255,1) 25%,
        rgba(255,255,255,1) 100%,
        rgba(0,0,0,1) 100%
        );
    }    
`;
let string2 = "";
let n = 0;
/*定义一个代码执行的方法*/
const step = () => {
    setTimeout(() => {
        /*
          如果string里面的回车 替换标签<br>
          如果string里面的空格则 替换为 &nbsp;
          否则则拼接上去
        * */
        if (string[n] === "\n") {
            string2 += "<br>";
        } else if (string[n] === " ") {
            string2 += "&nbsp;";
        } else {
            string2 += string[n];
        }
        /*
        因为string2是一个不断变化的过程
        因此内容呈现页的内容就是 string2(处理后的string)
        此时的样式就是 不断从string中截取渲染的内容
        */
        html.innerHTML = string2;
        style.innerHTML = string.substring(0, n);
        console.log(string2);
        if (n < string.length - 1) {
            n += 1;
            step();
        }
    }, 10);
};
step();


