document.addEventListener('DOMContentLoaded', function () {
    const mainBody = document.getElementsByClassName('main-body')[0];

    let clicksCount = 0;
    let isBold = false;

    const latinPhrases = ['Dum spiro spero', 'In vino veritas', 'Amor vincit omnia', 'Per aspera ad astra'];
    const cyrillicPhrases = ['Пока дышу, надеюсь', 'В вине - истина', 'Любовь побеждает все', 'Через тернии к звёздам'];

    function buildTable() {
        buildButtons();

        let divTable = document.createElement('div');
        let tableElement = document.createElement('table');
        let mainRow = document.createElement('tr');
        let latinColumn = document.createElement('th');
        let cyrillicColumn = document.createElement('th');

        divTable.classList.add('main-table');
        divTable.id = 'table';

        tableElement.classList.add('table-static');
        tableElement.id = 'main-table';

        latinColumn.classList.add('main-row');
        latinColumn.textContent = 'Латинский язык';

        cyrillicColumn.classList.add('main-row');
        cyrillicColumn.textContent = 'Русский язык';

        mainBody.append(divTable);
        divTable.append(tableElement);
        tableElement.append(mainRow);
        mainRow.append(latinColumn);
        mainRow.append(cyrillicColumn);
    }

    function buildButtons() {
        let divButtons = document.createElement('div');
        let addButton = document.createElement('button');
        addButton.classList.add('table-button')

        divButtons.classList.add('div-buttons');
        divButtons.id = 'div-buttons';

        addButton.id = 'add-button';
        addButton.textContent = 'Создать';
        addButton.onclick = function () {
            createTable();
        };

        mainBody.append(divButtons);
        divButtons.append(addButton);
    }

    function createTable() {
        if (latinPhrases.length === 0) {
            alert('Фразы закончились');
            return;
        }

        clicksCount++;

        let randomPhraseIndex = Math.floor(Math.random() * latinPhrases.length);

        let table = document.getElementById('main-table');
        let contentRow = document.createElement('tr');
        let latinData = document.createElement('td');
        let cyrillicData = document.createElement('td');


        if (clicksCount % 2 === 0) {
            contentRow.classList.add('class2');
        } else {
            contentRow.classList.add('class1');
        }

        if (clicksCount === 2) {
            let changeColorButton = document.createElement('button');
            changeColorButton.classList.add('table-button')
            changeColorButton.id = 'repaint-button';
            changeColorButton.textContent = 'Перекрасить';
            changeColorButton.style.position = 'absolute';
            changeColorButton.style.left = '270px';
            changeColorButton.onclick = function () {
                changEvenLinesColor();
            };

            let divButtons = document.getElementById('div-buttons');
            divButtons.append(changeColorButton);
        }

        latinData.classList.add('static-row');
        latinData.textContent = latinPhrases[randomPhraseIndex];

        latinPhrases.splice(randomPhraseIndex, 1);

        cyrillicData.classList.add('static-row');
        cyrillicData.textContent = cyrillicPhrases[randomPhraseIndex];

        cyrillicPhrases.splice(randomPhraseIndex, 1);

        table.append(contentRow);
        contentRow.append(latinData);
        contentRow.append(cyrillicData);
    }

    function changEvenLinesColor() {
        let allLines = document.querySelectorAll('tr');

        for (let i = 0; i < allLines.length; i++) {
            if (i % 2 === 0) {
                if (isBold) {
                    allLines[i].style.fontWeight = 'normal';
                } else {
                    allLines[i].style.fontWeight = 'bold';
                }
            }
        }
        isBold = !isBold;
    }

    buildTable();
});