/*Comportamiento inicial de la pagina cuando recien se carga*/
window.onload = function() {
  let canvas = document.getElementById("canvas"); /*Se obtienen la etiqueta del canvas por el id*/
  let output = document.getElementById("output"); /*Lo mismo pero del output*/
  let darkModeButton = document.getElementById("dark-mode"); /*botones-darks*/
  let lightModeButton = document.getElementById("light-mode"); /*botones light*/

  function resizeCanvas() { /*Se obtiene el tamaño del canvas con respecto al contenedor*/
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();/*Ajusta el tamaño del canvas*/

  darkModeButton.addEventListener('click', () => setTheme('dark')); /*establece los temas del documento*/
  lightModeButton.addEventListener('click', () => setTheme('light')); /*establece los temas del documento*/

  function setTheme(theme) { /*Cambia el color dependiedo del botn*/ 
    document.body.className = theme; 
  }
/*En esta seccion se encuentran los evento para validar la existencia del canvas y por ende los eventos de dibujado par establecer 
la pocicion inicial del mouse, dibuja la linea, cierra la linea y limpia las coordenadas para poder dibujar de nuevo*/
  if (canvas && canvas.getContext) {
    let ctx = canvas.getContext("2d");
    if (ctx) {
      let drawing = false;
      let lastPos = { x: 0, y: 0 };

      canvas.addEventListener("mousedown", function(evt) { /*inicio*/
        drawing = true;
        lastPos = oMousePos(canvas, evt);
      }, false);

      canvas.addEventListener("mousemove", function(evt) { /*traza la linea desde el origen*/
        var mousePos = oMousePos(canvas, evt);
        marcarCoords(output, mousePos.x, mousePos.y);
        if (drawing) {
          drawLine(ctx, lastPos, mousePos);
          lastPos = mousePos;
        }
      }, false);

      canvas.addEventListener("mouseup", function(evt) {/*Cierra el ciclo de dibujo y limpia las coordenadas*/
        drawing = false;
        limpiarCoords(output);
      }, false);

    }
  }
}

function oMousePos(canvas, evt) { /*calcula la pocision del mouse*/
  var ClientRect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}

function marcarCoords(output, x, y) { /*Muestra cordenadas*/
  output.innerHTML = ("x: " + x + ", y: " + y);
  output.style.top = (y + 10) + "px";
  output.style.left = (x + 10) + "px";
  output.style.backgroundColor = "#FFF";
  output.style.border = "1px solid #d9d9d9";
}

function limpiarCoords(output) { /*Limpia las coordenadas*/
  output.innerHTML = "";
  output.style.top = 0 + "px";
  output.style.left = 0 + "px";
  output.style.backgroundColor = "transparent";
  output.style.border = "none";
}

function drawLine(ctx, startPos, endPos) { /*Dibuja las lineas*/
  ctx.beginPath();
  ctx.moveTo(startPos.x, startPos.y);
  ctx.lineTo(endPos.x, endPos.y);
  ctx.strokeStyle = document.body.classList.contains('dark') ? "#FFFFFF" : "#000000";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

