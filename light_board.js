var dotLightTot = 0;
var AddLightTag = 0;
$(document).ready(function(){
	var line = document.createElement('line');
	$("#screen").mousedown(function(event){
		if(AddLightTag == 0){
			var dot = document.createElement('circle');
			dot.setAttribute('class', "dotLight");
			dotLightTot++;
			dot.setAttribute('id', "dotLight" + dotLightTot);
			var x1 = event.pageX, y1 = event.pageY - 48;
			dot.setAttribute('cx', x1);
			dot.setAttribute('cy', y1);
			dot.setAttribute('r', "1");
			dot.setAttribute('stroke', "black");
			dot.setAttribute('stroke-width', "2px");
			dot.setAttribute('fill', "black");
		    document.getElementById("screen").append(dot);
			$("#screen").html($("#screen").html());
			line.setAttribute('stroke', "black");
			line.setAttribute('stroke-width', "2px");
			line.setAttribute('x1', x1);
			line.setAttribute('y1', y1);
			line.setAttribute('x2', event.pageX);
			line.setAttribute('y2', event.pageY);
			AddLightTag = 1;
		} else if (AddLightTag == 1){
			line.setAttribute('x2', event.pageX);
			line.setAttribute('y2', event.pageY - 48);
			document.getElementById("screen").append(line);
			$("#screen").html($("#screen").html());
			AddLightTag = 0;
		}
	});
});
