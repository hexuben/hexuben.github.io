$(document).ready(function(){
    if(localStorage.maincolor==undefined)
        localStorage.maincolor="grey-900";
    var maincolor=localStorage.maincolor;
    $('body').addClass("mdui-theme-primary-"+maincolor);
});
