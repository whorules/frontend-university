let activeElement = null;
let initialX
let initialY;

const draggableElements = document.querySelectorAll('.draggableSVG');

document.addEventListener('pointerdown', startDragging);
document.addEventListener('pointerup', stopDragging);
document.addEventListener('pointermove', dragElement);
document.addEventListener('contextmenu', rotateElement);

const distancesFromTop = {};
const distancesFromLeft = {};

draggableElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect();
    distancesFromTop[element.id || element.className] = elementPosition.top + window.scrollY;
    distancesFromLeft[element.id || element.className] = elementPosition.left + window.scrollX;
});

function startDragging(event) {
    activeElement = event.target.closest('.draggableSVG');
    if (activeElement) {
        initialX = event.clientX - activeElement.getBoundingClientRect().left;
        initialY = event.clientY - activeElement.getBoundingClientRect().top;
    }
}

function dragElement(event) {
    if (activeElement) {
        const newX = event.clientX - initialX - distancesFromLeft[activeElement.id];
        const newY = event.clientY - initialY - distancesFromTop[activeElement.id];
        activeElement.style.transform = `translate(${newX}px, ${newY}px)`;
    }
}

function stopDragging() {
    activeElement = null;
}

function rotateElement(event) {
    const element = event.target.closest('.draggableSVG');
    if (element) {
        let rotation = getRotationDegrees(element) + 45;
        element.style.transform = `rotate(${rotation}deg)`;
        event.preventDefault();
    }
}

function getRotationDegrees(element) {
    const style = window.getComputedStyle(element);
    const transform = style.getPropertyValue('transform');
    const matrix = new DOMMatrixReadOnly(transform);
    const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
    return angle >= 0 ? angle : angle + 360;
}
