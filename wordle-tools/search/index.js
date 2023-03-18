function loadfile(filename, func){
	let url = filename;
	let httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', url, true);
	httpRequest.send();
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == 4 && httpRequest.status == 200)
			func(httpRequest.responseText);
	};
}
var wordlist;
$(document).ready(function(){
    loadfile("wordlist.json", function(data){
        wordlist = data;
        console.log(wordlist.length);
    })
});
function submit(){
    
    var text = $("#test-input").val();
    var table = $("#test-table");
    a = text.split(" ");
    var code = "<tr>";
    for(var i = 0; i < a.length; i++){
        code = code + "<td>" + a[i] + "</td>\n";
    }
    code = code + "</tr>\n";
    table.html(table.html()+code);
}