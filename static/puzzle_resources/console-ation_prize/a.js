//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

arr = [0]

function a(){arr[arr.length]=208696;}
function b(){arr[arr.length]=87289;}
function c(){arr[arr.length]=56204;}
function d(){arr[arr.length]=16697;}
function e(){arr[arr.length]=140734;}
function f(){arr[arr.length]=192608;}
function g(){arr[arr.length]=237087;}
function h(){arr[arr.length]=56845;}
function i(){arr[arr.length]=184476;}
function j(){arr[arr.length]=97282;}
function k(){arr[arr.length]=192399;}
function l(){arr[arr.length]=94267;}
function m(){arr[arr.length]=44510;}
function n(){arr[arr.length]=97731;}
function o(){arr[arr.length]=157400;}
function p(){arr[arr.length]=199248;}
function q(){arr[arr.length]=253480;}
function r(){arr[arr.length]=141488;}
function s(){arr[arr.length]=37918;}
function t(){arr[arr.length]=187411;}
function u(){arr[arr.length]=17002;}
function v(){arr[arr.length]=194966;}
function w(){arr[arr.length]=93144;}
function y(){arr[arr.length]=59315;}
function z(){arr[arr.length]=195078;}
function x() {arr = [0];}

let targetedImage = null;

function init() {
    ctx = document.getElementById('canvas1').getContext('2d');
    ctx.canvas.width = 800;
    ctx.canvas.height = 800;
    console.log('Welcome to the console! Input functions are a() through z(); x() clears the canvas. You do not need to view the source code to solve this puzzle.');
    window.requestAnimationFrame(draw);

    for (let image of document.querySelectorAll('.console-ation-prize img')) {
        image.addEventListener("click", (event) => {
            if (targetedImage === event.target) {
                targetedImage = null;
            } else {
                targetedImage = event.target;
            }
        });
    }
}

function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 800, 800);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0,0,800,800);

    if (targetedImage) {
        ctx.globalAlpha = 0.2;
        ctx.drawImage(targetedImage, 0, 0);
        ctx.globalAlpha = 1;
    }

    xp = 600;
    yp = 500;
    for(var i = 0; 2*i < arr.length; i++) {

        ctx.beginPath();
        ctx.arc(xp, yp, 5, 0, 360);
        ctx.closePath();
        ctx.fill();
        if (2*i+1 == arr.length) {
            dd = 1000
        }
        else {
            dd = (arr[2*i+1]) % 401
        }
        nx = xp - Math.cos(arr[2*i]*2/25*Math.PI)*dd
        ny = yp + Math.sin(arr[2*i]*2/25*Math.PI)*dd
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(xp, yp);
        ctx.stroke();
        ctx.closePath();
        xp = nx;
        yp = ny;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("DOMContentLoaded", init);
