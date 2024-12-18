(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var FontTest = function() {
};
FontTest.getLetterPoints = function(g,moji,isCentering,scale,letter) {
	if(scale == null) scale = 1;
	if(isCentering == null) isCentering = false;
	var shape = g;
	var motif = letter.motifs.get(moji);
	var ox = 0;
	var oy = 0;
	var s = scale;
	if(isCentering) {
		ox = -letter.widths.get(moji) / 2;
		oy = -letter.height / 2;
	}
	var len = motif.length;
	console.log(len);
	var count = 0;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var tgt = motif[i][0];
		if(tgt == "M") {
			if(count >= 1) {
				g = new THREE.Path();
				shape.holes.push(g);
			}
			g.moveTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy));
			count++;
		} else if(tgt == "L") g.lineTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy)); else if(tgt == "C") g.quadraticCurveTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy),s * (motif[i][1][2] + ox),-s * (motif[i][1][3] + oy));
	}
	return shape;
}
var HxOverrides = function() { }
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
var Main = function() {
	this._yy = 100;
	this._rad = 0;
	this._oldSec = 0;
	this._flag = true;
	this._amp = 400;
	this._mouseY = 0;
	this._mouseX = 0;
	js.Browser.window.onload = $bind(this,this.initialize);
};
Main.main = function() {
	new Main();
}
Main.prototype = {
	_onResize: function(object) {
		this._camera = new THREE.PerspectiveCamera(Main.isCanvas?30:60,js.Browser.window.innerWidth / js.Browser.window.innerHeight,10,50000);
		this._renderer.setSize(js.Browser.window.innerWidth,js.Browser.window.innerHeight);
	}
	,_getKeta2: function(n) {
		return Math.floor(n / 10);
	}
	,_getKeta1: function(n) {
		return n % 10;
	}
	,_run: function() {
		js.Browser.window.requestAnimationFrame($bind(this,this._run));
		var date = new Date();
		this._rad = this._mouseX * 2 * Math.PI + Math.PI / 2;
		this._yy = this._amp * this._mouseY * 2;
		this._camera.position.x += (this._amp * Math.cos(this._rad) - this._camera.position.x) / 4;
		this._camera.position.y += (this._yy - this._camera.position.y) / 4;
		this._camera.position.z += (this._amp * Math.sin(this._rad) - this._camera.position.z) / 4;
		this._camera.lookAt(new THREE.Vector3(0,0,0));
		var hh = date.getHours();
		var mm = date.getMinutes();
		var ss = date.getSeconds();
		this._digits[0].setNo(this._getKeta2(hh));
		this._digits[1].setNo(this._getKeta1(hh));
		this._digits[2].setNo(this._getKeta2(mm));
		this._digits[3].setNo(this._getKeta1(mm));
		this._digits[4].setNo(this._getKeta2(ss));
		this._digits[5].setNo(this._getKeta1(ss));
		this._renderer.render(this._scene,this._camera);
	}
	,_getPoint: function(A,radX,radY) {
		var amp = A * Math.cos(radY);
		var xx = amp * Math.sin(radX);
		var yy = A * Math.sin(radY);
		var zz = amp * Math.cos(radX);
		return new THREE.Vector3(xx,yy,zz);
	}
	,_change: function() {
		if(this._flag) {
			this._renderer.setClearColorHex(0,1);
			var _g1 = 0, _g = this._digits.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._digits[i].setColor(16777215);
			}
		} else {
			this._renderer.setClearColorHex(16777215,1);
			var _g1 = 0, _g = this._digits.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._digits[i].setColor(0);
			}
		}
	}
	,initialize: function(e) {
		var _g = this;
		Main.isCanvas = false;
		if(Main.isCanvas) this._renderer = new THREE.CanvasRenderer({ antialias : true}); else this._renderer = new THREE.WebGLRenderer({ antialias : true});
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(Main.isCanvas?30:60,js.Browser.window.innerWidth / js.Browser.window.innerHeight,10,50000);
		this._renderer.setClearColorHex(0,1);
		this._renderer.setSize(js.Browser.window.innerWidth,js.Browser.window.innerHeight);
		js.Browser.document.body.appendChild(this._renderer.domElement);
		var points = MojiPoints.getPoints();
		var s = "0123456789";
		this.letters = [];
		var _g1 = 0, _g2 = s.length;
		while(_g1 < _g2) {
			var i = _g1++;
			var shapes = [];
			var shape = new THREE.Shape();
			FontTest.getLetterPoints(shape,HxOverrides.substr(s,i,1),true,2.2,new net.badimon.five3D.typography.HelveticaMedium());
			shapes.push(shape);
			var geo = new THREE.ShapeGeometry(shapes,{ });
			var mesh = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({ color : 16777215, side : 2}));
			this.letters.push(mesh);
		}
		this._digits = [];
		var _g1 = 0;
		while(_g1 < 6) {
			var i = _g1++;
			var digit = new clock.Digit();
			digit.init(this.letters);
			digit.position.x = (i - 2.5) * 120;
			digit.position.z = 0;
			this._digits.push(digit);
			this._scene.add(digit);
		}
		js.Browser.document.addEventListener("mousemove",function(event) {
			_g._mouseX = (event.clientX - js.Browser.window.innerWidth / 2) / js.Browser.window.innerWidth;
			_g._mouseY = (event.clientY - js.Browser.window.innerHeight / 2) / js.Browser.window.innerHeight;
		},false);
		this._run();
		js.Browser.document.onmousewheel = function(e1) {
			_g._amp += e1.wheelDelta * 0.5;
			if(_g._amp < 100) _g._amp = 100;
		};
		js.Browser.window.onclick = function(e1) {
			_g._flag = !_g._flag;
			_g._change();
		};
		js.Browser.window.onresize = $bind(this,this._onResize);
		this._onResize(null);
	}
}
var IMap = function() { }
var MojiPoints = function() {
};
MojiPoints.getPoints = function() {
	var points = [];
	points = [[[-146,144],[-95.6,144],[-66.8,76.39999999999998],[65.6,76.39999999999998],[94,144],[146,144],[22.80000000000001,-138],[-22.80000000000001,-138],[-146,144]],[[-48.8,32.80000000000001],[-0.8000000000000114,-79.19999999999999],[47.599999999999994,32.80000000000001],[-48.8,32.80000000000001]]];
	return points;
}
var clock = {}
clock.Digit = function() {
	THREE.Object3D.call(this);
};
clock.Digit.__super__ = THREE.Object3D;
clock.Digit.prototype = $extend(THREE.Object3D.prototype,{
	setNo: function(n) {
		this.position.y += (-(n * 200) - this.position.y) / 10;
	}
	,setColor: function(col) {
		this.m.color = new THREE.Color(col);
	}
	,init: function(letters) {
		this.digits = [];
		var g = new THREE.Geometry();
		var _g1 = 0, _g = letters.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = letters[i].clone();
			this.digits.push(d);
			if(i == 1) d.position.x = 8;
			d.position.y = i * 200;
			THREE.GeometryUtils.merge(g,d);
		}
		this.m = new THREE.MeshBasicMaterial({ color : 16777215, overdraw : true});
		this.m.side = 2;
		this.mesh = new THREE.Mesh(g,this.m);
		this.add(this.mesh);
	}
});
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
}
var js = {}
js.Browser = function() { }
js.three = {}
js.three.Renderer = function() { }
js.three.Face = function() { }
js.three.Mapping = function() { }
js.three.Three = function() { }
js.three.Three.requestAnimationFrame = function(f) {
	return js.Browser.window.requestAnimationFrame(f);
}
js.three.Three.cancelAnimationFrame = function(f) {
	js.Browser.window.cancelAnimationFrame(id);
}
var net = {}
net.badimon = {}
net.badimon.five3D = {}
net.badimon.five3D.typography = {}
net.badimon.five3D.typography.Typography3D = function() {
	this.motifs = new haxe.ds.StringMap();
	this.widths = new haxe.ds.StringMap();
};
net.badimon.five3D.typography.Typography3D.prototype = {
	getHeight: function() {
		return this.height;
	}
	,getWidth: function($char) {
		return this.widths.get($char);
	}
	,getMotif: function($char) {
		return this.motifs.get($char);
	}
}
net.badimon.five3D.typography.HelveticaMedium = function() {
	net.badimon.five3D.typography.Typography3D.call(this);
	this.initializeMotifsUppercase();
	this.initializeMotifsLowercase();
	this.initializeMotifsNumbers();
	this.initializeMotifsPunctuation();
	this.initializeWidthsUppercase();
	this.initializeWidthsLowercase();
	this.initializeWidthsNumbers();
	this.initializeWidthsPunctuation();
	this.height = 117;
};
net.badimon.five3D.typography.HelveticaMedium.__super__ = net.badimon.five3D.typography.Typography3D;
net.badimon.five3D.typography.HelveticaMedium.prototype = $extend(net.badimon.five3D.typography.Typography3D.prototype,{
	initializeWidthsPunctuation: function() {
		this.widths.set(" ",28);
		this.widths.set("!",28);
		this.widths.set("\"",44);
		this.widths.set("#",56);
		this.widths.set("$",56);
		this.widths.set("%",100);
		this.widths.set("&",65);
		this.widths.set("'",28);
		this.widths.set("(",28);
		this.widths.set(")",28);
		this.widths.set("*",37);
		this.widths.set("+",60);
		this.widths.set(",",28);
		this.widths.set("-",39);
		this.widths.set(".",28);
		this.widths.set("/",35);
		this.widths.set(":",28);
		this.widths.set(");",28);
		this.widths.set("<",60);
		this.widths.set("=",60);
		this.widths.set(">",60);
		this.widths.set("?",56);
		this.widths.set("@",80);
		this.widths.set("[",30);
		this.widths.set("\\",35);
		this.widths.set("]",30);
		this.widths.set("^",60);
		this.widths.set("_",50);
		this.widths.set("`",24);
	}
	,initializeWidthsNumbers: function() {
		this.widths.set("0",56);
		this.widths.set("1",56);
		this.widths.set("2",56);
		this.widths.set("3",56);
		this.widths.set("4",56);
		this.widths.set("5",56);
		this.widths.set("6",56);
		this.widths.set("7",56);
		this.widths.set("8",56);
		this.widths.set("9",56);
	}
	,initializeWidthsLowercase: function() {
		this.widths.set("a",56);
		this.widths.set("b",61);
		this.widths.set("c",56);
		this.widths.set("d",61);
		this.widths.set("e",56);
		this.widths.set("f",32);
		this.widths.set("g",59);
		this.widths.set("h",57);
		this.widths.set("i",24);
		this.widths.set("j",24);
		this.widths.set("k",54);
		this.widths.set("l",24);
		this.widths.set("m",87);
		this.widths.set("n",57);
		this.widths.set("o",59);
		this.widths.set("p",61);
		this.widths.set("q",61);
		this.widths.set("r",35);
		this.widths.set("s",52);
		this.widths.set("t",33);
		this.widths.set("u",57);
		this.widths.set("v",52);
		this.widths.set("w",78);
		this.widths.set("x",54);
		this.widths.set("y",52);
		this.widths.set("z",50);
	}
	,initializeWidthsUppercase: function() {
		this.widths.set("A",67);
		this.widths.set("B",70);
		this.widths.set("C",72);
		this.widths.set("D",72);
		this.widths.set("E",63);
		this.widths.set("F",59);
		this.widths.set("G",76);
		this.widths.set("H",72);
		this.widths.set("I",28);
		this.widths.set("J",54);
		this.widths.set("K",69);
		this.widths.set("L",57);
		this.widths.set("M",89);
		this.widths.set("N",72);
		this.widths.set("O",76);
		this.widths.set("P",67);
		this.widths.set("Q",76);
		this.widths.set("R",70);
		this.widths.set("S",65);
		this.widths.set("T",59);
		this.widths.set("U",72);
		this.widths.set("V",61);
		this.widths.set("W",94);
		this.widths.set("X",65);
		this.widths.set("Y",65);
		this.widths.set("Z",63);
	}
	,initializeMotifsPunctuation: function() {
	}
	,initializeMotifsNumbers: function() {
		this.motifs.set("0",[["M",[47.45,36.05]],["C",[44.8,30.65,40.1,27.3]],["C",[35.3,23.9,27.85,23.8]],["C",[20.3,23.9,15.55,27.3]],["C",[10.8,30.65,8.15,36.05]],["C",[5.55,41.5,4.6,47.85]],["C",[3.55,54.15,3.6,60.2]],["C",[3.55,66.3,4.6,72.6]],["C",[5.55,78.95,8.15,84.35]],["C",[10.8,89.8,15.55,93.15]],["C",[20.3,96.5,27.85,96.6]],["C",[35.3,96.5,40.1,93.15]],["C",[44.8,89.8,47.45,84.35]],["C",[50.05,78.95,51.05,72.6]],["C",[52.05,66.3,52,60.2]],["C",[52.05,54.15,51.05,47.85]],["C",[50.05,41.5,47.45,36.05]],["M",[39.55,46.75]],["C",[40.65,52.8,40.65,60.2]],["C",[40.65,67.6,39.55,73.65]],["C",[38.4,79.7,35.6,83.4]],["C",[32.75,87,27.85,87.1]],["C",[22.85,87,20,83.4]],["C",[17.25,79.7,16.05,73.65]],["C",[14.95,67.6,15,60.2]],["C",[14.95,52.8,16.05,46.75]],["C",[17.25,40.7,20,37.05]],["C",[22.85,33.45,27.85,33.35]],["C",[32.75,33.45,35.6,37.05]],["C",[38.4,40.7,39.55,46.75]]]);
		this.motifs.set("1",[["M",[5.3,45.8]],["L",[22.5,45.8]],["L",[22.5,95.2]],["L",[35,95.2]],["L",[35,25.2]],["L",[25.75,25.2]],["C",[24.8,29.4,21.8,31.95]],["C",[18.8,34.55,14.5,35.75]],["C",[10.15,36.85,5.3,36.8]],["L",[5.3,45.8]]]);
		this.motifs.set("2",[["M",[46.95,31.2]],["C",[44.4,27.95,40.05,25.9]],["C",[35.7,23.85,29.3,23.8]],["C",[21.5,23.9,16.1,27.4]],["C",[10.8,30.85,8,36.95]],["C",[5.2,43,5.2,50.8]],["L",[16.6,50.8]],["C",[16.7,45.9,17.8,41.95]],["C",[19,37.95,21.6,35.7]],["C",[24.1,33.4,28.6,33.35]],["C",[33.5,33.45,36.1,35.45]],["C",[38.65,37.45,39.6,40.25]],["C",[40.55,43.15,40.45,45.75]],["C",[40.3,49.8,38.35,52.95]],["C",[36.4,56.2,33.2,58.8]],["C",[30.1,61.45,26.4,63.85]],["L",[19.3,68.7]],["C",[12.2,73.4,8.15,80]],["C",[4.05,86.6,3.9,95.2]],["L",[51.7,95.2]],["L",[51.7,85]],["L",[17.6,85]],["C",[18.65,81.9,21.55,79.35]],["C",[24.35,76.7,28.2,74.2]],["L",[36.25,68.95]],["C",[40.3,66.15,43.8,62.8]],["C",[47.35,59.4,49.55,55.1]],["C",[51.75,50.85,51.8,45.3]],["C",[51.8,41.9,50.7,38.15]],["C",[49.55,34.45,46.95,31.2]]]);
		this.motifs.set("3",[["M",[46.4,32.15]],["C",[43.2,28,38.2,25.9]],["C",[33.15,23.8,27.6,23.8]],["C",[20.5,23.85,15.45,27]],["C",[10.35,30.05,7.5,35.4]],["C",[4.75,40.75,4.4,47.6]],["L",[15.75,47.6]],["C",[15.65,43.95,16.95,40.7]],["C",[18.2,37.5,20.8,35.45]],["C",[23.45,33.4,27.4,33.35]],["C",[32.25,33.4,35.25,36.05]],["C",[38.25,38.75,38.35,43.2]],["C",[38.3,47.5,36,49.95]],["C",[33.75,52.4,30.2,53.4]],["C",[26.7,54.4,22.85,54.2]],["L",[22.8,62.7]],["L",[31.55,63.15]],["C",[35.7,63.9,38.4,66.6]],["C",[41,69.2,41.1,74.6]],["C",[41.05,78.6,39.3,81.4]],["C",[37.6,84.15,34.55,85.65]],["C",[31.55,87.1,27.7,87.1]],["C",[23.25,87.05,20.25,85.15]],["C",[17.3,83.2,15.8,79.8]],["C",[14.35,76.5,14.5,72.2]],["L",[3.15,72.2]],["C",[3.25,79.55,6.05,85]],["C",[8.8,90.45,14.2,93.55]],["C",[19.65,96.55,27.7,96.6]],["C",[34.5,96.55,40.1,94]],["C",[45.7,91.4,49,86.6]],["C",[52.4,81.8,52.5,75.2]],["C",[52.45,68.35,49.1,63.65]],["C",[45.8,59,39.8,57.7]],["L",[39.8,57.5]],["C",[44.8,55.65,47.25,51.75]],["C",[49.7,47.85,49.7,42.5]],["C",[49.6,36.3,46.4,32.15]]]);
		this.motifs.set("4",[["M",[32.4,95.2]],["L",[43.2,95.2]],["L",[43.2,78.6]],["L",[52.2,78.6]],["L",[52.2,69.6]],["L",[43.2,69.6]],["L",[43.2,25.2]],["L",[32.4,25.2]],["L",[2.45,67.3]],["L",[2.45,78.6]],["L",[32.4,78.6]],["L",[32.4,95.2]],["M",[32.4,38.8]],["L",[32.4,69.6]],["L",[11.25,69.6]],["L",[32.25,38.8]],["L",[32.4,38.8]]]);
		this.motifs.set("5",[["M",[48.5,25.2]],["L",[12.3,25.2]],["L",[4.85,63.4]],["L",[16.2,63.4]],["C",[17.65,59.8,20.7,58.4]],["C",[23.85,56.95,27.5,57]],["C",[32.1,57.05,35.05,59.1]],["C",[38,61.1,39.4,64.45]],["C",[40.8,67.75,40.8,71.65]],["C",[40.85,75.95,39.6,79.45]],["C",[38.4,82.95,35.5,85]],["C",[32.6,87.05,27.8,87.1]],["C",[22.2,87.05,18.85,84]],["C",[15.5,80.95,14.9,75.3]],["L",[3.5,75.3]],["C",[3.8,82.3,7.1,87.05]],["C",[10.35,91.8,15.75,94.15]],["C",[21.2,96.6,28.05,96.6]],["C",[34.4,96.55,39.05,94.25]],["C",[43.65,92,46.55,88.25]],["C",[49.45,84.5,50.85,80.1]],["C",[52.2,75.7,52.2,71.45]],["C",[52.2,64.7,49.6,59.4]],["C",[47,54.15,42.2,51.1]],["C",[37.3,48.1,30.3,48.05]],["C",[26.7,48.05,23.25,49.4]],["C",[19.8,50.75,17.4,53.3]],["L",[17.2,53.1]],["L",[20.8,35.4]],["L",[48.5,35.4]],["L",[48.5,25.2]]]);
		this.motifs.set("6",[["M",[47.6,32.9]],["C",[44.75,28.65,40.1,26.25]],["C",[35.4,23.85,29.8,23.8]],["C",[22.4,23.9,17.35,27.15]],["C",[12.25,30.35,9.2,35.7]],["C",[6.1,40.95,4.8,47.3]],["C",[3.4,53.65,3.4,60]],["C",[3.3,70.3,5.45,78.55]],["C",[7.55,86.8,13.15,91.65]],["C",[18.7,96.5,28.9,96.6]],["C",[35.95,96.55,41.15,93.45]],["C",[46.4,90.3,49.25,84.95]],["C",[52.15,79.6,52.2,72.7]],["C",[52.15,65.9,49.55,60.65]],["C",[46.9,55.35,42.05,52.35]],["C",[37.1,49.25,30.15,49.2]],["C",[25.4,49.2,21.4,51.3]],["C",[17.45,53.35,15.05,57.5]],["L",[14.8,57.3]],["C",[15.05,53.75,15.65,49.7]],["C",[16.2,45.6,17.7,41.9]],["C",[19.15,38.15,21.9,35.8]],["C",[24.7,33.4,29.3,33.35]],["C",[33.8,33.4,36.45,35.95]],["C",[39.1,38.6,39.5,42.9]],["L",[50.9,42.9]],["C",[50.5,37.2,47.6,32.9]],["M",[28.5,58.2]],["C",[32.6,58.25,35.35,60.25]],["C",[38.1,62.2,39.45,65.45]],["C",[40.8,68.7,40.8,72.5]],["C",[40.8,76.3,39.45,79.6]],["C",[38.1,82.95,35.35,85]],["C",[32.6,87.05,28.5,87.1]],["C",[24.35,87.05,21.6,85]],["C",[18.75,82.95,17.35,79.65]],["C",[15.9,76.35,15.9,72.5]],["C",[15.9,68.6,17.35,65.35]],["C",[18.75,62.15,21.6,60.2]],["C",[24.35,58.25,28.5,58.2]]]);
		this.motifs.set("7",[["M",[51.35,25.2]],["L",[3.5,25.2]],["L",[3.5,35.4]],["L",[39.8,35.4]],["C",[32.5,43.55,26.7,53.15]],["C",[20.9,62.85,17.3,73.45]],["C",[13.6,84.1,12.8,95.2]],["L",[25.3,95.2]],["C",[26.2,82.6,29.6,71.9]],["C",[33,61.25,38.55,52.1]],["C",[44.05,42.9,51.35,34.7]],["L",[51.35,25.2]]]);
		this.motifs.set("8",[["M",[43.95,28.9]],["C",[38.3,23.9,27.85,23.8]],["C",[17.35,23.9,11.65,28.9]],["C",[6.05,33.9,6,42.9]],["C",[6.05,48.05,8.6,51.75]],["C",[11.15,55.45,15.9,57.3]],["L",[15.9,57.5]],["C",[10,59.05,6.6,63.5]],["C",[3.15,67.95,3.15,74.65]],["C",[3.15,81.55,6.35,86.4]],["C",[9.55,91.35,15.1,94]],["C",[20.65,96.55,27.85,96.6]],["C",[34.95,96.55,40.55,94]],["C",[46.05,91.35,49.25,86.4]],["C",[52.45,81.55,52.5,74.65]],["C",[52.45,67.95,49,63.5]],["C",[45.6,59.05,39.7,57.5]],["L",[39.7,57.3]],["C",[44.5,55.45,47,51.75]],["C",[49.55,48.05,49.6,42.9]],["C",[49.55,33.9,43.95,28.9]],["M",[27.85,32.8]],["C",[32.5,32.8,35.6,35.6]],["C",[38.7,38.3,38.8,43.5]],["C",[38.7,48.45,35.7,51.1]],["C",[32.6,53.8,27.85,53.8]],["C",[23,53.8,19.9,51.1]],["C",[16.9,48.45,16.8,43.5]],["C",[16.9,38.3,20,35.6]],["C",[23.1,32.8,27.85,32.8]],["M",[37.3,65.55]],["C",[41,68.8,41.1,74.6]],["C",[41,80.8,37.3,84.2]],["C",[33.65,87.6,27.85,87.65]],["C",[21.95,87.6,18.3,84.2]],["C",[14.6,80.85,14.5,74.65]],["C",[14.6,68.8,18.3,65.55]],["C",[21.95,62.35,27.85,62.3]],["C",[33.65,62.35,37.3,65.55]]]);
		this.motifs.set("9",[["M",[42.7,28.8]],["C",[37.3,23.9,27.5,23.8]],["C",[19.8,23.85,14.45,27]],["C",[9.1,30.1,6.25,35.5]],["C",[3.4,40.85,3.4,47.7]],["C",[3.45,54.85,6.2,60.2]],["C",[8.95,65.45,13.9,68.35]],["C",[18.85,71.25,25.5,71.25]],["C",[30.35,71.25,34.35,69.1]],["C",[38.3,66.95,40.6,62.9]],["L",[40.8,63.05]],["C",[40.6,66.65,40,70.75]],["C",[39.4,74.85,37.95,78.55]],["C",[36.45,82.25,33.7,84.65]],["C",[30.9,87.05,26.3,87.1]],["C",[21.85,87.05,19.15,84.45]],["C",[16.45,81.8,16.05,77.5]],["L",[4.7,77.5]],["C",[5.1,83.25,7.95,87.55]],["C",[10.85,91.8,15.55,94.15]],["C",[20.15,96.55,25.8,96.6]],["C",[33.2,96.5,38.3,93.3]],["C",[43.35,90.05,46.45,84.75]],["C",[49.5,79.5,50.85,73.15]],["C",[52.2,66.8,52.2,60.45]],["C",[52.3,50.15,50.2,41.9]],["C",[48.1,33.65,42.7,28.8]],["M",[16.1,40.5]],["C",[17.45,37.3,20.15,35.35]],["C",[22.85,33.4,27,33.35]],["C",[31.25,33.4,34.1,35.4]],["C",[36.9,37.35,38.3,40.55]],["C",[39.7,43.8,39.7,47.6]],["C",[39.7,51.5,38.3,54.8]],["C",[36.9,58.15,34.1,60.2]],["C",[31.25,62.25,27,62.3]],["C",[22.85,62.25,20.15,60.2]],["C",[17.45,58.1,16.1,54.75]],["C",[14.8,51.45,14.8,47.6]],["C",[14.8,43.8,16.1,40.5]]]);
	}
	,initializeMotifsLowercase: function() {
	}
	,initializeMotifsUppercase: function() {
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
Main.isCanvas = false;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.three.Three.CullFaceNone = 0;
js.three.Three.CullFaceBack = 1;
js.three.Three.CullFaceFront = 2;
js.three.Three.CullFaceFrontBack = 3;
js.three.Three.FrontFaceDirectionCW = 0;
js.three.Three.FrontFaceDirectionCCW = 1;
js.three.Three.BasicShadowMap = 0;
js.three.Three.PCFShadowMap = 1;
js.three.Three.PCFSoftShadowMap = 2;
js.three.Three.FrontSide = 0;
js.three.Three.BackSide = 1;
js.three.Three.DoubleSide = 2;
js.three.Three.NoShading = 0;
js.three.Three.FlatShading = 1;
js.three.Three.SmoothShading = 2;
js.three.Three.NoColors = 0;
js.three.Three.FaceColors = 1;
js.three.Three.VertexColors = 2;
js.three.Three.NoBlending = 0;
js.three.Three.NormalBlending = 1;
js.three.Three.AdditiveBlending = 2;
js.three.Three.SubtractiveBlending = 3;
js.three.Three.MultiplyBlending = 4;
js.three.Three.CustomBlending = 5;
js.three.Three.AddEquation = 100;
js.three.Three.SubtractEquation = 101;
js.three.Three.ReverseSubtractEquation = 102;
js.three.Three.ZeroFactor = 200;
js.three.Three.OneFactor = 201;
js.three.Three.SrcColorFactor = 202;
js.three.Three.OneMinusSrcColorFactor = 203;
js.three.Three.SrcAlphaFactor = 204;
js.three.Three.OneMinusSrcAlphaFactor = 205;
js.three.Three.DstAlphaFactor = 206;
js.three.Three.OneMinusDstAlphaFactor = 207;
js.three.Three.DstColorFactor = 208;
js.three.Three.OneMinusDstColorFactor = 209;
js.three.Three.SrcAlphaSaturateFactor = 210;
js.three.Three.MultiplyOperation = 0;
js.three.Three.MixOperation = 1;
js.three.Three.AddOperation = 2;
js.three.Three.RepeatWrapping = 1000;
js.three.Three.ClampToEdgeWrapping = 1001;
js.three.Three.MirroredRepeatWrapping = 1002;
js.three.Three.NearestFilter = 1003;
js.three.Three.NearestMipMapNearestFilter = 1004;
js.three.Three.NearestMipMapLinearFilter = 1005;
js.three.Three.LinearFilter = 1006;
js.three.Three.LinearMipMapNearestFilter = 1007;
js.three.Three.LinearMipMapLinearFilter = 1008;
js.three.Three.UnsignedByteType = 1009;
js.three.Three.ByteType = 1010;
js.three.Three.ShortType = 1011;
js.three.Three.UnsignedShortType = 1012;
js.three.Three.IntType = 1013;
js.three.Three.UnsignedIntType = 1014;
js.three.Three.FloatType = 1015;
js.three.Three.UnsignedShort4444Type = 1016;
js.three.Three.UnsignedShort5551Type = 1017;
js.three.Three.UnsignedShort565Type = 1018;
js.three.Three.AlphaFormat = 1019;
js.three.Three.RGBFormat = 1020;
js.three.Three.RGBAFormat = 1021;
js.three.Three.LuminanceFormat = 1022;
js.three.Three.LuminanceAlphaFormat = 1023;
js.three.Three.RGB_S3TC_DXT1_Format = 2001;
js.three.Three.RGBA_S3TC_DXT1_Format = 2002;
js.three.Three.RGBA_S3TC_DXT3_Format = 2003;
js.three.Three.RGBA_S3TC_DXT5_Format = 2004;
js.three.Three.LineStrip = 0;
js.three.Three.LinePieces = 1;
Main.main();
})();
