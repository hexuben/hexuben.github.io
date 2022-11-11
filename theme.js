function changeTheme(theme) {
    $('body').removeClass("mdui-theme-primary-" + localStorage.maincolor);
	localStorage.maincolor = theme;
    $('body').addClass("mdui-theme-primary-" + localStorage.maincolor);
}
$(document).ready(function(){
    if(localStorage.maincolor==undefined)
        localStorage.maincolor="deep-purple";
    var maincolor=localStorage.maincolor;
    $('body').addClass("mdui-theme-primary-"+maincolor);
});
