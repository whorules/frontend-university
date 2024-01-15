let roof = document.querySelector('#draggable-roof');
const houseBody = document.querySelector('#draggable-house-body');
const houseWindow = document.querySelector('#draggable-window');
const treeTrunk = document.querySelector('#draggable-tree-trunk');
const bigTree = document.querySelector('#draggable-big-tree');
const mediumTree = document.querySelector('#draggable-medium-tree');
const smallTree = document.querySelector('#draggable-small-tree');

let mousePosition;
let offset = [1000, 1000];
let isDown = false;

let rotation = 0;
const angle = 45;

let roofDegCheck = false;
let houseBodyDegCheck = false;
let windowDegCheck = false;

let treeTrunkDegCheck = false;
let bigTreeDegCheck = false;
let mediumTreeDegCheck = false;
let smallTreeDegCheck = false;

function rotateImages(element) {
    rotation = (rotation + angle) % 360;
    element.style.transform = `rotate(${rotation}deg)`;
    if (element.id.toString() === 'draggable-roof' && rotation === 90) {
        roofDegCheck = true;
    }
    if ((element.id.toString() === 'draggable-house-body') && (rotation === 45 || rotation === 135 || rotation === 225 || rotation === 315)) {
        houseBodyDegCheck = true;
    }
    if (element.id.toString() === 'draggable-window' && rotation === 270) {
        windowDegCheck = true;
    }
    if ((element.id.toString() === 'draggable-tree-trunk') && (rotation === 90 || rotation === 270)) {
        treeTrunkDegCheck = true;
    }
    if (element.id.toString() === 'draggable-big-tree' && rotation === 180) {
        bigTreeDegCheck = true;
    }
    if (element.id.toString() === 'draggable-medium-tree' && rotation === 90) {
        mediumTreeDegCheck = true;
    }
    if (element.id.toString() === 'draggable-small-tree' && rotation === 270) {
        smallTreeDegCheck = true;
    }
    if (roofDegCheck && houseBodyDegCheck && windowDegCheck && treeTrunkDegCheck && bigTreeDegCheck && mediumTreeDegCheck && smallTreeDegCheck) {
        checkItOut();
    }
}

movement(roof);
movement(houseBody);
movement(houseWindow);
movement(bigTree);
movement(mediumTree);
movement(smallTree);
movement(treeTrunk);
let currMovElementId = null;

function movement(movingElem) {
    let mouseMoveHandler = function (event) {
        event.preventDefault();
        if (isDown && currMovElementId === movingElem.id) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            const containerRect = document.getElementById('draggable_main').getBoundingClientRect();
            const minX = containerRect.left;
            const maxX = containerRect.right - movingElem.clientWidth;
            const minY = containerRect.top;
            const maxY = containerRect.bottom - movingElem.clientHeight;

            const newLeft = Math.max(minX, Math.min(mousePosition.x + offset[0], maxX));
            const newTop = Math.max(minY, Math.min(mousePosition.y + offset[1], maxY));

            movingElem.style.left = newLeft + 'px';
            movingElem.style.top = newTop + 'px';

            movingElem.oncontextmenu = function () {
                rotateImages(movingElem);
                return false;
            }
        }
    }
    movingElem.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            movingElem.offsetLeft - e.clientX,
            movingElem.offsetTop - e.clientY
        ];
        currMovElementId = movingElem.id;
        document.addEventListener('mousemove', mouseMoveHandler)
    }, true);
    movingElem.addEventListener('mouseup', function () {
        isDown = false;
        currMovElementId = null;
        document.removeEventListener('mousemove', mouseMoveHandler);
        movingElem.removeEventListener('mousemove', mouseMoveHandler);
    }, true);

    movingElem.addEventListener('mousemove', mouseMoveHandler, true);
}

let roofCheck = false;
let windowCheck = false;

let bigTreeCheck = false;
let mediumTreeCheck = false;
let smallTreeCheck = false;

let totalCheck = false;

function checkItOut() {
    let roofPosition = {
        top: roof.offsetTop,
        left: roof.offsetLeft,
    };
    let houseBodyPosition = {
        top: houseBody.offsetTop,
        left: houseBody.offsetLeft,
    };
    let houseWindowPosition = {
        top: houseWindow.offsetTop,
        left: houseWindow.offsetLeft,
    };
    let trunkPosition = {
        top: treeTrunk.offsetTop,
        left: treeTrunk.offsetLeft,
    };
    let bigTreePosition = {
        top: bigTree.offsetTop,
        left: bigTree.offsetLeft,
    };
    let mediumTreePosition = {
        top: mediumTree.offsetTop,
        left: mediumTree.offsetLeft,
    };
    let smallTreePosition = {
        top: smallTree.offsetTop,
        left: smallTree.offsetLeft,
    };

    if (roofPosition.left <= houseBodyPosition.left - 9 && roofPosition.left >= houseBodyPosition.left - 19 && roofPosition.top >= houseBodyPosition.top - 49 && roofPosition.top <= houseBodyPosition.top - 43) {
        roofCheck = true;
    }
    if (houseWindowPosition.left >= houseBodyPosition.left && houseWindowPosition.left <= houseBodyPosition.left + 34 && houseWindowPosition.top >= houseBodyPosition.top && houseWindowPosition.top <= houseBodyPosition.top + 33) {
        windowCheck = true;
    }
    if (bigTreePosition.left <= trunkPosition.left - 31 && bigTreePosition.left >= trunkPosition.left - 45 && bigTreePosition.top >= trunkPosition.top - 52 && bigTreePosition.top <= trunkPosition.top - 14) {
        bigTreeCheck = true;
    }
    if (mediumTreePosition.top >= bigTreePosition.top - 30 && mediumTreePosition.top <= bigTreePosition.top - 7 && mediumTreePosition.left >= bigTreePosition.left - 20 && mediumTreePosition.left <= bigTreePosition.left + 22) {
        mediumTreeCheck = true;
    }
    if (smallTreePosition.left <= mediumTreePosition.left + 8 && smallTreePosition.left >= mediumTreePosition.left - 15 && smallTreePosition.top >= mediumTreePosition.top - 26 && smallTreePosition.top <= mediumTreePosition.top - 8) {
        smallTreeCheck = true;
    }
    totalCheck = roofCheck && windowCheck && bigTreeCheck && mediumTreeCheck && smallTreeCheck && roofDegCheck && houseBodyDegCheck && windowDegCheck && treeTrunkDegCheck && bigTreeDegCheck && mediumTreeDegCheck && smallTreeDegCheck;
    if (totalCheck) {
        myMove(roof);
        totalCheck = false;
    }
}

let imageBuilt = false;
let animInterval = null;

function myMove(elem) {
    let elemPos = elem.getBoundingClientRect();
    let pos = 0;
    let housePos = houseBody.getBoundingClientRect();
    if (!imageBuilt) {
        clearInterval(animInterval);
        animInterval = setInterval(frame, 10);

        function frame() {
            if (Math.abs(Number(elem.style.top.replace("px", '')) - housePos.top) < 1) {
                clearInterval(animInterval);
            } else {
                pos++;
                elem.style.top = elemPos.top + pos + 'px';
                elem.style.left = elemPos.left + pos + 'px';
            }
        }

        imageBuilt = true;
    }
}
