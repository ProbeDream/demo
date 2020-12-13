let html = document.querySelector('#html');
let style = document.querySelector('#style');
let string = `
    #div1{
        width:200px;
        height:200px;
        border:1px solid red;
    }
    #div1{
        border-radius:50%;
        box-shadow:0 0 3px rgba(0,0,0,0.5);
    }
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
        background:#000;
        border-radius:50%;
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
        bottom:0px;
        left:50%;
        transform:translateX(-50%);
        background:#fff;
        border-radius:50%;
         background: radial-gradient(circle, 
         rgba(0,0,0,1) 0%, 
         rgba(0,0,0,1) 25%, 
         rgba(255,255,255,1) 25%, 
         rgba(255,255,255,1) 100%, 
         rgba(0,0,0,1) 100%);
    }
`;
let string2 = '';
let n = 0;
const step = () => {
  setTimeout(() => {
    if (string[n] === '\n') {
      string2 += '<br>';
    } else if (string[n] === ' ') {
      string2 += '&nbsp;';
    } else {
      string2 += string[n];
    }
    html.innerHTML = string2;
    style.innerHTML = string.substring(0, n);
    if (n < string.length - 1) {
      n += 1;
      step();
    }
  }, 10);
};

step();

