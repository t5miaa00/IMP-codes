/* This whole line drawing lab work is made with only one canvas element. This
 * work stores everything in arrays, so this actually can be used to save, undo
 * and possibly remove specific lines altogether. The performance impact will be
 * noticeable if the line amount goes to absurd amounts due to the frequency of
 * the drawing updates it makes.
 *
 * ~ Aatu (t5miaa00)
 */

// Global variables:
var canvas, context, mousePos, mouseDown;
var startPoints = [];
var endPoints = [];
var lines = 0;

window.onload = function()
{
   // Init script...
   canvas = document.getElementById('drawcanvas');
   if (canvas.getContext)
   {
      context = canvas.getContext('2d');
      initCanvas();
   }
   else
   {
      console.error("Canvas not supported in your browser!");
   }
}
function getMousePos(evt)
{
   canvasPos = canvas.getBoundingClientRect();
   return {

      x: Math.floor(evt.clientX - canvasPos.left),
      y: Math.floor(evt.clientY - canvasPos.top)
   }
}
function resetCanvas()
{
   startPoints = [];
   endPoints = [];
   clearCanvas(canvas, context);
}
function clearCanvas(canv, ctx)
{
   ctx.clearRect(0, 0, canv.width, canv.height);
}
function initCanvas()
{
   canvas.addEventListener("mousemove", function(evt)
   {
      mousePos = getMousePos(evt);

      // This starts the drawing of the preview line.
      if (mouseDown)
      {
         drawToCanvas(canvas, context, mousePos.x, mousePos.y);
      }
   }, false)
   canvas.addEventListener("mousedown", function(evt)
   {
      mousePos = getMousePos(evt);
      startPoints.push({x: mousePos.x, y: mousePos.y})
      mouseDown = true;
   }, false)
   canvas.addEventListener("mouseup", function(evt)
   {
      if (mouseDown)
      {
         mousePos = getMousePos(evt);
         endPoints.push({x: mousePos.x, y: mousePos.y});
         mouseDown = false;

         drawToCanvas(canvas, context);
      }
   }, false)
   canvas.addEventListener("mouseleave", function(evt)
   {
      if (mouseDown)
      {
         mousePos = getMousePos(evt);
         endPoints.push({x: mousePos.x, y: mousePos.y});
         mouseDown = false;

         drawToCanvas(canvas, context);
      }
   }, false);
}
function drawToCanvas(canv, ctx, mouseX, mouseY)
{
   // This function clears and draws the shit to the canvas.
   clearCanvas(canv, ctx);
   ctx.fillStyle = "black";
   ctx.font = "10px monospace"
   ctx.strokeStyle = "black";
   ctx.lineCap = "round";
   ctx.lineWidth = "3";
   ctx.fillText("x: "+ mousePos.x +" y: " + mousePos.y, 10, 50);

   // Draw the lines from the array
   ctx.beginPath();
   for (i = 0; i < endPoints.length; i++)
   {
      ctx.moveTo(startPoints[i].x, startPoints[i].y);
      ctx.lineTo(endPoints[i].x, endPoints[i].y);
      ctx.moveTo(endPoints[i].x, endPoints[i].y);
   }
   ctx.closePath();
   ctx.stroke();

   // Draw the preview line.
   if (mouseDown && mouseX != null && mouseY != null)
   {
      ctx.strokeStyle = "purple";
      ctx.beginPath();

      ctx.moveTo(startPoints[startPoints.length - 1].x, startPoints[startPoints.length - 1].y);
      ctx.lineTo(mouseX, mouseY);

      ctx.closePath();
      ctx.stroke();

      context.fillText("mouse is down", 10, 65);
   }
}
