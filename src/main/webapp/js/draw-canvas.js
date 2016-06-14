var stompClient = null;	
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

var clickServerX = new Array();
var clickServerY = new Array();
var clickServerDrag = new Array();

var paint;
var context;

function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	if (!dragging) dragging = false;
	clickDrag.push(dragging);
	redraw();
	stompClient.send("/app/board", {}, JSON.stringify({
		'x' : x,
		'y' : y,
		'drag' : dragging
	}));
	
};

function addClickFromServer(x, y, dragging) {
	clickServerX.push(x);
	clickServerY.push(y);
	if (!dragging) dragging = false;
	clickServerDrag.push(dragging);
	redraw();
};


$(document).ready(function(){
	
	context = document.getElementById('canvas').getContext("2d");
	
	function sendName() {
		
	};
	connect();

	function showGreeting(message) {
		var response = document.getElementById('response');
		var p = document.createElement('p');
		p.style.wordWrap = 'break-word';
		p.appendChild(document.createTextNode(message));
		response.appendChild(p);
	};
	
	

	$('#canvas').mousedown(function(e) {
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;

		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});

	$('#canvas').mousemove(function(e) {
		if (paint) {
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});

	$('#canvas').mouseup(function(e) {
		paint = false;
	});

	$('#canvas').mouseleave(function(e) {
		paint = false;
	});	
});

function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears
																			// the
																			// canvas

	context.strokeStyle = "#df4b26";
	context.lineJoin = "round";
	context.lineWidth = 5;

	for (var i = 0; i < clickX.length; i++) {
		context.beginPath();
		if (clickDrag[i] && i) {
			context.moveTo(clickX[i - 1], clickY[i - 1]);
		} else {
			context.moveTo(clickX[i] - 1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
	
	for (var i = 0; i < clickServerX.length; i++) {
		context.beginPath();
		if (clickServerDrag[i] && i) {
			context.moveTo(clickServerX[i - 1], clickServerY[i - 1]);
		} else {
			context.moveTo(clickServerX[i] - 1, clickServerY[i]);
		}
		context.lineTo(clickServerX[i], clickServerY[i]);
		context.closePath();
		context.stroke();
	}
};

function setConnected(connected) {
};

function connect() {
	var socket = new SockJS('/board');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		setConnected(true);
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/board', function(point) {
			var obj = JSON.parse(point.body);
			addClickFromServer(obj.x, obj.y, obj.drag);
		});
	});
};

function disconnect() {
	if (stompClient != null) {
		stompClient.disconnect();
	}
	setConnected(false);
	console.log("Disconnected");
};
