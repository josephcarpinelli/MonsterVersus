/*
## [Summary](https://developer.mozilla.org/en-US/blog/javascript-shape-drawing-function/?utm_medium=email&utm_source=devnewsletter&utm_campaign=firefox-drumbeat&utm_content=mayhacksnewsletter-global#summary)

This was a little introduction to the `<canvas>` element for drawing on a web page and a few of the methods you can use to draw shapes. If you want to dive deeper into how all the pieces work, here's a recap of what we used:

- [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas), the element on which we can display graphics
- [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to draw 2D shapes to the canvas
- [`translate()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) to move the origin to a new position
- [`lineTo()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) to draw a line from one point to another
- [`closePath()`](https://de/undefveloper.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath) to join the first point to the last point
- [`stroke()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) to stroke the path with a stroke style

To calculate the position of each point, we used a little bit of maths and trigonometry:

- [`Math.cos()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos) to calculate the x position of a point
- [`Math.sin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin) to calculate the y position of a point
- [`Math.PI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) to calculate the angle of rotation in radians
*/

const getSideCount = function(shapeName)
{
    let sideCount = 0;
    switch (shapeName.toLowerCase())
    {
        case "triangle":
            sideCount = 3;
            break;
        case "square":
            sideCount = 4;
            break;
        case "pentagon":
            sideCount = 5;
            break;
        case "hexagon":
            sideCount = 6;
            break;
        case "septagon":
        case "heptagon":
            sideCount = 7;
            break;
        case "octagon":
            sideCount = 8;
            break;
        case "nonagon":
        case "enneagon":
            sideCount = 9;
            break;
        case "decagon":
            sideCount = 10;
            break;
        case "undecagon":
        case "hendecagon":
            sideCount = 11;
            break;
        case "dodecagon":
            sideCount = 12;
            break;
        default:
            console.log(`Error! ${shapeName} is not a valid shape.`);
            break;
    }
    return sideCount;
}

const getRadianRotation = function(shapeName)
{
    let degrees = 0;
    switch (shapeName.toLowerCase())
    {
        case "triangle":
            degrees = 30;
            break;
        case "square":
            degrees = 45;
            break;
        case "pentagon":
            degrees = 54;
            break;
        case "hexagon":
            degrees = 0;
            break;
        case "septagon":
        case "heptagon":
            degrees = 11;
            break;
        case "octagon":
            degrees = 22;
            break;
        case "nonagon":
        case "enneagon":
            degrees = 30;
            break;
        case "decagon":
            degrees = 0;
            break;
        case "undecagon":
        case "hendecagon":
            degrees = 9;
            break;
        case "dodecagon":
            degrees = 15;
            break;
        default:
            console.log(`Error! ${shapeName} is not a valid shape.`);
            break;
    }
    return degrees * (Math.PI / 180);
}

const drawShape = function(pixelRadius, sideCount, rotation, context)
{
    // Set canvas width and height.
    context.canvas.width = 256;
    context.canvas.height = 256;
    // Get center point.
    const centerX = context.canvas.width / 2;
    const centerY = context.canvas.height / 2;   

    // move the canvas to the center position
    context.translate(centerX, centerY);
    // Rotate shape.
    context.rotate(rotation);
    for (let sideIndex = 0; sideIndex < sideCount; sideIndex++)
    {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sideCount) * sideIndex;
        // for the first point move to
        if (sideIndex === 0)
        {
            context.moveTo(pixelRadius * Math.cos(rotation),
                           pixelRadius * Math.sin(rotation));
        }
        else
        {
            // for the rest radiusaw a line
            context.lineTo(pixelRadius * Math.cos(rotation),
                           pixelRadius * Math.sin(rotation));
        }
    }
    // close path and stroke it
    context.closePath(); 
    context.stroke();
    // reset the translate position
    context.resetTransform();

    return null;
}

const fillShape = function(color, context)
{
    context.fillStyle = color;
    context.fill()

    return null;
}

const draw = function(color, shapeName, pixelRadius, context)
{
    const sideCount = getSideCount(shapeName);
    const rotation = getRadianRotation(shapeName);
    drawShape(pixelRadius, sideCount, rotation, context);
    fillShape(color, context);
    
    return null;
}

export
{
    getSideCount,
    drawShape,
    fillShape,
    draw,
};
