//坦克的颜色
var herocolor=new Array("#BA9658","#FEF26E");
var enemycolor=new Array("#00A2B5","#00FEFE");
//子弹类
function Bullet(x,y,direct,speed){
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=speed;
	this.timer=null;
    this.live=true;
	this.run=function run(){
		if (this.x<=0||this.x>=400||this.y>=300||this.y<=0) {window.clearInterval(this.timer);this.live=false;}
		else{
		switch(this.direct){
			case 0:
			this.y-=this.speed;
			break;
			case 1:
			this.x+=this.speed;
			break;
            case 2:
			this.y+=this.speed;
			break;
			case 3:
			this.x-=this.speed;
			break;
		}
	}
	}}
//}
//定义一个父类，通过对象冒充来实现继承
function Tank(x,y,direct,color){
this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=1;
	this.color=color;
	this.moveUp=function(){
		this.y-=this.speed;
		this.direct=0;
	}
	this.moveRight=function(){
		this.x+=this.speed;
		this.direct=1;
	}
	this.moveDown=function(){
		this.y+=this.speed;
		this.direct=2;
	}
	this.moveLeft=function(){
		this.x-=this.speed;
		this.direct=3;
	}
}

function Hero(x,y,direct,color){
	this.tank=Tank;
	this.tank(x,y,direct,color);
	this.shot=function(){
		switch(this.direct){
			case 0:
		bullet=new Bullet(this.x+9,this.y,this.direct,1);
		break;
		case 1:
		bullet=new Bullet(this.x+30,this.y+9,this.direct,1);
		break;
		case 2:
		bullet=new Bullet(this.x+9,this.y+30,this.direct,1);
		break;
        case 3:
		bullet=new Bullet(this.x,this.y+9,this.direct,1);
		break;
	}
	//把子弹对象放入数组中
	bullets.push(bullet);
	//启动数组定时器
	var timer=window.setInterval("bullets["+(bullets.length-1)+"].run()",50);
	bullets[bullets.length-1].timer=timer;
	}
}
function Enemy(x,y,direct,color){
this.tank=Tank;
this.tank(x,y,direct,color);
}
//画出子弹
function drawBullet(){
//子弹发射并且子弹没有出边界时才能画子弹
for (var i = 0; i < bullets.length; i++) {
	var bullet=bullets[i];
	if (bullet!=null&&bullet.live) {
		
	cxt.fillStyle="#FF0000";
	cxt.fillRect(bullet.x,bullet.y,2,2);
}
}
}


function drawtank(tank){

switch(tank.direct){
case 0:
case 2:
cxt.fillStyle=tank.color[0];
cxt.fillRect(tank.x,tank.y,5,30);
cxt.fillRect(tank.x+15,tank.y,5,30);
cxt.fillRect(tank.x+6,tank.y+5,8,20);

cxt.fillStyle=tank.color[1];
cxt.arc(tank.x+10,tank.y+15,4,0,360,false);
cxt.fill();

cxt.strokeStyle=tank.color[1];
cxt.lineWidth=1.5;
cxt.beginPath();
cxt.moveTo(tank.x+10,tank.y+15);
if (tank.direct==0) {
cxt.lineTo(tank.x+10,tank.y);}
else if (tank.direct==2) {
	cxt.lineTo(tank.x+10,tank.y+30);}
cxt.closePath();
cxt.stroke();
break;
case 1:
case 3:
cxt.fillStyle=tank.color[0];
cxt.fillRect(tank.x,tank.y,30,5);
cxt.fillRect(tank.x,tank.y+15,30,5);
cxt.fillRect(tank.x+5,tank.y+6,20,8);

cxt.fillStyle=tank.color[1];
cxt.arc(tank.x+15,tank.y+10,4,0,360,false);
cxt.fill();

cxt.strokeStyle=tank.color[1];
cxt.lineWidth=1.5;
cxt.beginPath();
cxt.moveTo(tank.x+15,tank.y+10);
if (tank.direct==1) {
cxt.lineTo(tank.x+30,tank.y+10);}
else if (tank.direct==3) {
	cxt.lineTo(tank.x,tank.y+10);}
cxt.closePath();
cxt.stroke();
break;

}
}