const grades = document.querySelector('#grades'); // grades selector
const averageInfo = document.querySelector('#average'); // average info selector
const allWeightInputs = document.querySelectorAll('.chooseWeightInput'); // all weight inputs selector
const resetButton = document.querySelector('#resetButton'); // reset button
if (localStorage.getItem('siteVisitedEarlier') == null) {
    localStorage.setItem('sum', '0');
    localStorage.setItem('average', '0');
    localStorage.setItem(`weightSum`, '0');
}
let sum = parseFloat(localStorage.getItem('sum'));
let average = parseFloat(localStorage.getItem('average'));
let weightSum = parseFloat(localStorage.getItem(`weightSum`));

const resetSite = () => {
    localStorage.clear();
    location.reload();
}

const createGradesInput = (i, bool) => {
    if (!bool) {
        localStorage.setItem(`gradesOfWeight${i}`, '0');
        localStorage.setItem(`weight${i}Sum`, '0');
    }
    let thisWeightSum = parseFloat(localStorage.getItem(`weight${i}Sum`));
    let gradesOfThisWeight = parseFloat(localStorage.getItem(`gradesOfWeight${i}`));
    const createGrade = document.createElement('div');
    const createGradesBoxTitle = document.createElement('h2');
    const createSpecifyGradesBox = document.createElement('div');
    const createActualGradesInformation = document.createElement('p');

    createGrade.classList.add('grade');
    createGrade.id = `gradesWeight${i}`;

    createGradesBoxTitle.innerHTML = `Dodaj oceny wagi ${i}`;
    createGradesBoxTitle.classList.add('addGradesInformation');

    createSpecifyGradesBox.classList.add('specifyGradeBox');

    createActualGradesInformation.classList.add('actualGradeInformation');
    createActualGradesInformation.id = `gradesInformation${i}`;

    grades.append(createGrade);
    createGrade.append(createGradesBoxTitle, createSpecifyGradesBox, createActualGradesInformation);
    if (bool) {
        for (let j = 0; j < gradesOfThisWeight; j++) {
            let thisGradeLocalStorageId = `weight${i}grade${j}`;
            let thisGradeValue = parseFloat(localStorage.getItem(`${thisGradeLocalStorageId}`));
            if (!isNaN(thisGradeValue)) {
                const createGradeItem = document.createElement('span');
                const createTooltip = document.createElement('span');

                createTooltip.innerHTML = "Usuń";
                createTooltip.classList.toggle('gradeTooltip');
                createGradeItem.innerHTML = `${thisGradeValue}`;
                createGradeItem.classList.toggle('createdGrade');
                createActualGradesInformation.append(createGradeItem);
                createGradeItem.append(createTooltip);
                createGradeItem.addEventListener('click', () => {
                    sum -= thisGradeValue * i;
                    localStorage.setItem('sum', `${sum}`);

                    weightSum -= i * 1;
                    localStorage.setItem(`weight${i}Sum`, `${weightSum}`);

                    average = Math.round((sum / weightSum) * 1000) / 1000;
                    localStorage.setItem('average', `${average}`);

                    averageInfo.innerHTML = `Obliczona średnia: ${average}`;
                
                    if (isNaN(average)) {
                        averageInfo.innerHTML = 'Obliczona średnia: ???';
                        localStorage.setItem('average', '0');
                    }

                    localStorage.removeItem(thisGradeLocalStorageId);
                    createGradeItem.remove();
                })
            }
        }
    }
    for (let j = 1; j < 7; j++) {
        const createGradesInput = document.createElement('button');
        createGradesInput.classList.add('gradesInput');
        createGradesInput.value = j;
        createGradesInput.innerHTML = j;
        createSpecifyGradesBox.append(createGradesInput);

        createGradesInput.addEventListener('click', () => {
            const createGradeItem = document.createElement('span');
            const createTooltip = document.createElement('span');

            createTooltip.innerHTML = "Usuń";
            createTooltip.classList.toggle('gradeTooltip');
            createGradeItem.innerHTML = `${j} `;
            createGradeItem.classList.toggle('createdGrade');
            createActualGradesInformation.append(createGradeItem);
            createGradeItem.append(createTooltip);

            sum += createGradesInput.value * i;

            localStorage.setItem('sum', `${sum}`);

            thisWeightSum += i * 1;

            localStorage.setItem(`weight${i}Sum`, `${thisWeightSum}`);

            weightSum += i * 1;

            localStorage.setItem(`weightSum`, `${weightSum}`);

            average = Math.round((sum / weightSum) * 1000) / 1000;
            localStorage.setItem('average', `${average}`);
            averageInfo.innerHTML = `Obliczona średnia: ${average}`;

            let thisGradeLocalStorageId = `weight${i}grade${gradesOfThisWeight}`;
            localStorage.setItem(`${thisGradeLocalStorageId}`, `${createGradesInput.value}`);


            createGradeItem.addEventListener('click', () => {
                sum -= createGradesInput.value * i;
                localStorage.setItem('sum', `${sum}`);

                weightSum -= i * 1;
                localStorage.setItem(`weight${i}Sum`, `${weightSum}`);

                average = Math.round((sum / weightSum) * 1000) / 1000;
                localStorage.setItem('average', `${average}`);

                averageInfo.innerHTML = `Obliczona średnia: ${average}`;

                if (isNaN(average)) {
                    averageInfo.innerHTML = 'Obliczona średnia: ???';
                    localStorage.setItem('average', '0');
                }

                localStorage.removeItem(`${thisGradeLocalStorageId}`);
                createGradeItem.remove();
            })

            gradesOfThisWeight++;
            localStorage.setItem(`gradesOfWeight${i}`, `${gradesOfThisWeight}`);
        })
    }
}

const removeGradesInput = (gradesInput) => {
    let boxInputToRemove = document.querySelector(`#gradesWeight${gradesInput}`);
    let gradesOfThisWeight = parseFloat(localStorage.getItem(`gradesOfWeight${gradesInput}`));
    for (let i = 0; i < gradesOfThisWeight; i++) {
        let thisGradeLocalStorageId = `weight${gradesInput}grade${i}`;
        let thisGradeValue = parseFloat(localStorage.getItem(`${thisGradeLocalStorageId}`));
        
        sum -= thisGradeValue * gradesInput;
        localStorage.setItem('sum', `${sum}`);
        weightSum -= gradesInput;

        localStorage.removeItem(`${thisGradeLocalStorageId}`);
    }
    localStorage.setItem(`weight${gradesInput}Sum`, '0');
    localStorage.setItem(`gradesOfWeight${gradesInput}`, '0');
    boxInputToRemove.remove();
    average = Math.round((sum / weightSum) * 1000) / 1000;
    localStorage.setItem('average', `${average}`);
    averageInfo.innerHTML = `Obliczona średnia: ${average}`;
    if (isNaN(average)) {
        localStorage.setItem('weightSum', '0');
        averageInfo.innerHTML = 'Obliczona średnia: ???';
        localStorage.setItem('average', '0');
    }
}

if (localStorage.getItem('siteVisitedEarlier') == null) {
    for (let i = 1; i < 11; i++) {
        let weightInput = document.querySelector(`#inputWeight${i}`);
        if (i < 5) {
            weightInput.checked = true;
            localStorage.setItem(`inputWeight${i}`, '1');
            createGradesInput(i, false);
        } else {
            localStorage.setItem(`inputWeight${i}`, '0');
        }
        weightInput.addEventListener('click', () => {
            let isWeightChecked = document.querySelector(`#inputWeight${i}`).checked;
            if (!isWeightChecked) {
                localStorage.setItem(`inputWeight${i}`, '0');
                removeGradesInput(i);
            } else {
                localStorage.setItem(`inputWeight${i}`, '1');
                createGradesInput(i, false);
            }
        })
    }
    localStorage.setItem('siteVisitedEarlier', 'true');
} else {
    for (let i = 1; i < 11; i++) {
        let weightInput = document.querySelector(`#inputWeight${i}`);
        let isWeightCreated = parseInt(localStorage.getItem(`inputWeight${i}`));
        if (isWeightCreated) {
            weightInput.checked = true;
            createGradesInput(i, true);
        } else {
            weightInput.checked = false;
        }
        weightInput.addEventListener('click', () => {
            let isWeightChecked = document.querySelector(`#inputWeight${i}`).checked;
            if (!isWeightChecked) {
                localStorage.setItem(`inputWeight${i}`, '0');
                removeGradesInput(i);
            } else {
                localStorage.setItem(`inputWeight${i}`, '1');
                createGradesInput(i);
            }
        })
    }
    averageInfo.innerHTML = `Obliczona średnia: ${average}`;
}

resetButton.addEventListener('click', () => {
    resetSite()
});
