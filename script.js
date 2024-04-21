document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let startX, startY;
    let shapeType = "line"; // Default to drawing lines

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);

    document.getElementById("selectTool").addEventListener("click", () => {
        shapeType = "select";
    });

    document.getElementById("rectangleTool").addEventListener("click", () => {
        shapeType = "rectangle";
    });

    document.getElementById("circleTool").addEventListener("click", () => {
        shapeType = "circle";
    });

    document.getElementById("lineTool").addEventListener("click", () => {
        shapeType = "line";
    });

    function startDrawing(event) {
        isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
    }

    function draw(event) {
        if (!isDrawing) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (shapeType === "rectangle") {
            drawRectangle(startX, startY, event.offsetX - startX, event.offsetY - startY);
        } else if (shapeType === "circle") {
            drawCircle(startX, startY, Math.sqrt(Math.pow(event.offsetX - startX, 2) + Math.pow(event.offsetY - startY, 2)));
        } else if (shapeType === "line") {
            drawLine(startX, startY, event.offsetX, event.offsetY);
        }
    }

    function endDrawing() {
        isDrawing = false;
    }

    function drawRectangle(x, y, width, height) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    function drawCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
});