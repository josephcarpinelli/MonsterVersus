/*
 * ## [Summary](https://developer.mozilla.org/en-US/blog/javascript-shape-drawing-function/?utm_medium=email&utm_source=devnewsletter&utm_campaign=firefox-drumbeat&utm_content=mayhacksnewsletter-global#summary)

This was a little introduction to the `<canvas>` element for drawing on a web page and a few of the methods you can use to draw shapes. If you want to dive deeper into how all the pieces work, here's a recap of what we used:

- [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas), the element on which we can display graphics
- [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to draw 2D shapes to the canvas
- [`translate()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) to move the origin to a new position
- [`lineTo()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) to draw a line from one point to another
- [`closePath()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath) to join the first point to the last point
- [`stroke()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) to stroke the path with a stroke style

To calculate the position of each point, we used a little bit of maths and trigonometry:

- [`Math.cos()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos) to calculate the x position of a point
- [`Math.sin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin) to calculate the y position of a point
- [`Math.PI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) to calculate the angle of rotation in radians
*/
const draw = function(xCoordinate, yCoordinate,
                           radius, sides, color,
                           context)
{
    // move the canvas to the center position
    context.translate(xCoordinate, yCoordinate);
    for (let sideIndex = 0; sideIndex < sides; sideIndex++)
    {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sides) * sideIndex;
        // for the first point move to
        if (sideIndex === 0)
        {
            context.moveTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
        else
        {
            // for the rest dradiusaw a line
            context.lineTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
    }
    // close path and stroke it
    context.closePath(); 
    context.stroke();
    context.fillStyle = color;
    context.fill()
    // reset the translate position
    context.resetTransform();
}

export
{
    draw,
};
