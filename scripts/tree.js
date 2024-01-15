let roof = document.querySelector('#draggable-roof');
const houseBody = document.querySelector('#draggable-house-body');
const houseWindow = document.querySelector('#draggable-window');
const treeTrunk = document.querySelector('#draggable-tree-trunk');
const bigTree = document.querySelector('#draggable-big-tree');
const mediumTree = document.querySelector('#draggable-medium-tree');
const smallTree = document.querySelector('#draggable-small-tree');

let mousePosition;
let offset = [1000, 1000];

const turnAngle = 45;

let objectsRotationInfo = {
    'draggable-house-body': {
        'rotation': 0,
        'suitable_rotations': [45, 135, 225, 315],
        'deg_check': false,
    },
    'draggable-roof': {
        'rotation': 0,
        'suitable_rotations': [90],
        'deg_check': false,
    },
    'draggable-window': {
        'rotation': 0,
        'suitable_rotations': [270],
        'deg_check': false,
    },
    'draggable-tree-trunk': {
        'rotation': 0,
        'suitable_rotations': [90, 270],
        'deg_check': false,
    },
    'draggable-big-tree': {
        'rotation': 0,
        'suitable_rotations': [180],
        'deg_check': false,
    },
    'draggable-medium-tree': {
        'rotation': 0,
        'suitable_rotations': [90],
        'deg_check': false,
    },
    'draggable-small-tree': {
        'rotation': 0,
        'suitable_rotations': [270],
        'deg_check': false,
    },
    'total_rotation_check': true,
}

function rotateImages(element) {
    objectsRotationInfo[element.id]['rotation'] += turnAngle;
    objectsRotationInfo[element.id]['rotation'] %= 360;
    let objectRotation = objectsRotationInfo[element.id]
    objectsRotationInfo[element.id]['deg_check'] = objectRotation['suitable_rotations'].lastIndexOf(objectRotation['rotation']) !== -1;

    element.style.transform = `rotate(${objectRotation['rotation']}deg)`;
    for (let elem in objectsRotationInfo) {
        if (elem === 'total_rotation_check')
            break;
        if (objectsRotationInfo[elem]['deg_check'] === false) {
            objectsRotationInfo['total_rotation_check'] = false;
            return;
        }
    }
    objectsRotationInfo['total_rotation_check'] = true;
    checkItOut();
}

movement(roof);
movement(houseBody);
movement(houseWindow);
movement(bigTree);
movement(mediumTree);
movement(smallTree);
movement(treeTrunk);
let currDownElementId = null;

function movement(movingElem) {
    let mouseMoveHandler = function (event) {
        event.preventDefault();
        const draggableMain = document.getElementById('draggable-main')
        if (currDownElementId === movingElem.id) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            if (mousePosition.x >= draggableMain.getBoundingClientRect().left &&
                mousePosition.x <= draggableMain.getBoundingClientRect().left + draggableMain.offsetWidth &&
                mousePosition.y >= draggableMain.getBoundingClientRect().top &&
                mousePosition.y <= draggableMain.getBoundingClientRect().top + draggableMain.offsetHeight) {
                movingElem.style.left = (mousePosition.x + offset[0]) + 'px';
                movingElem.style.top = (mousePosition.y + offset[1]) + 'px';
            }

        }
    }
    movingElem.addEventListener('contextmenu', function (e) {
        rotateImages(movingElem);
        e.preventDefault();
        return false;
    });
    movingElem.addEventListener('mousedown', function (e) {
        offset = [
            movingElem.offsetLeft - e.clientX,
            movingElem.offsetTop - e.clientY
        ];
        currDownElementId = movingElem.id;
        document.addEventListener('mousemove', mouseMoveHandler)
    }, true);
    movingElem.addEventListener('mouseup', function () {
        currDownElementId = null;
        document.removeEventListener('mousemove', mouseMoveHandler);
        movingElem.removeEventListener('mousemove', mouseMoveHandler);
        checkItOut();
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

    roofCheck = roofPosition.left <= houseBodyPosition.left - 9 &&
        roofPosition.left >= houseBodyPosition.left - 19 &&
        roofPosition.top >= houseBodyPosition.top - 49 &&
        roofPosition.top <= houseBodyPosition.top - 43;

    windowCheck = houseWindowPosition.left >= houseBodyPosition.left &&
        houseWindowPosition.left <= houseBodyPosition.left + 34 &&
        houseWindowPosition.top >= houseBodyPosition.top &&
        houseWindowPosition.top <= houseBodyPosition.top + 33;

    bigTreeCheck = (bigTreePosition.left <= trunkPosition.left - 31) &&
        (bigTreePosition.left >= trunkPosition.left - 45) &&
        (bigTreePosition.top >= trunkPosition.top - 52) &&
        (bigTreePosition.top <= trunkPosition.top - 14);

    mediumTreeCheck = mediumTreePosition.top >= bigTreePosition.top - 30 &&
        mediumTreePosition.top <= bigTreePosition.top - 7 &&
        mediumTreePosition.left >= bigTreePosition.left - 20 &&
        mediumTreePosition.left <= bigTreePosition.left + 22;

    smallTreeCheck = smallTreePosition.left <= mediumTreePosition.left + 8 &&
        smallTreePosition.left >= mediumTreePosition.left - 15 &&
        smallTreePosition.top >= mediumTreePosition.top - 26 &&
        smallTreePosition.top <= mediumTreePosition.top - 8;

    totalCheck = roofCheck && windowCheck && bigTreeCheck && mediumTreeCheck &&
        smallTreeCheck && objectsRotationInfo['total_rotation_check'];

    if (totalCheck) {
        myMove(roof);
        totalCheck = false;
    }
}

let animInterval = null;

function myMove(elem) {
    let housePos = houseBody.getBoundingClientRect();
    clearInterval(animInterval);
    animInterval = setInterval(frame, 50);
    let iterationsCount = 0;
    function frame() {
        if (Math.abs(Number(elem.style.top.replace("px", '')) - housePos.top) < 1) {
            clearInterval(animInterval);
        } else if (iterationsCount < 60) {
            iterationsCount++;
            let topPosition = Math.abs(Number(elem.style.top.replace("px", '')));
            let leftPosition = Math.abs(Number(elem.style.left.replace("px", '')));
            elem.style.top = (topPosition + 1) + 'px'
            elem.style.left = (leftPosition + 1) + 'px';
        }
    }
}
