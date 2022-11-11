$(document).ready(function(){
    if(localStorage.maincolor==undefined)
        localStorage.maincolor="purple";
    var maincolor=localStorage.maincolor;
    $('body').addClass("mdui-theme-primary-"+maincolor);
});