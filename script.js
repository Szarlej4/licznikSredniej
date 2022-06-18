localStorage.clear();
const grades = document.querySelector('#grades'); // grades selector
const averageInfo = document.querySelector('#average'); // average info selector
const allWeightInputs = document.querySelectorAll('.chooseWeightInput'); // all weight inputs selector
localStorage.setItem('sum', '0'); // sum for counting average declared in global scope 
let sum = parseFloat(localStorage.getItem('sum'));
localStorage.setItem('average', '0');
average = parseFloat(localStorage.getItem('average'));
localStorage.setItem(`weightSum`, '0');
let weightSum = parseFloat(localStorage.getItem(`weightSum`));

const createGradesInput = (i) => {
    localStorage.setItem(`gradesOfWeight${i}`, '0');
    localStorage.setItem(`weight${i}Sum`, '0');
    let thisWeightSum = parseFloat(localStorage.getItem(`weight${i}Sum`));
    let gradesOfThisWeight = parseFloat(localStorage.getItem(`gradesOfWeight${i}`));
    const createGrade = document.createElement('div');
    const createGradesBoxTitle = document.createElement('h2');
    const createSpecifyGradesBox = document.createElement('div');
    const createActualGradesInformation = document.createElement('p');

    createGrade.classList.add('grade');
    createGrade.id = `gradesWeight${i}`;

    createGradesBoxTitle.innerHTML = `Wybierz oceny waga ${i}`;

    createSpecifyGradesBox.classList.add('specifyGradeBox');

    createActualGradesInformation.classList.add('actualGradeInformation');
    createActualGradesInformation.id = `gradesInformation${i}`;

    grades.append(createGrade);
    createGrade.append(createGradesBoxTitle, createSpecifyGradesBox, createActualGradesInformation);
    for (let j = 1; j < 7; j++) {
        const createGradesInput = document.createElement('button');
        createGradesInput.classList.add('gradesInput');
        createGradesInput.value = j;
        createGradesInput.innerHTML = j;
        createSpecifyGradesBox.append(createGradesInput);

        createGradesInput.addEventListener('click', () => {
            const createGradeItem = document.createElement('span');
            const createTooltip = document.createElement('span');

            createTooltip.innerHTML = "Wcisnij aby usunac ocene";
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
            averageInfo.innerHTML = average;

            let thisGradeLocalStorageId = `weight${i}grade${gradesOfThisWeight}`;
            localStorage.setItem(thisGradeLocalStorageId, `${createGradesInput.value}`);


            createGradeItem.addEventListener('click', () => {
                sum -= createGradesInput.value * i;
                console.log(`sum: ${sum}`);
                localStorage.setItem('sum', `${sum}`);

                weightSum -= i * 1;
                console.log(`weightSum: ${weightSum}`);
                localStorage.setItem(`weight${i}Sum`, `${weightSum}`);

                average = Math.round((sum / weightSum) * 1000) / 1000;
                localStorage.setItem('average', `${average}`);
                console.log(`average: ${average}`);

                averageInfo.innerHTML = average;
                // let thisGradeLocalStorageId = `weight${i}grade${gradesOfThisWeight}`;
                // localStorage.removeItem(thisGradeLocalStorageId, `${createGradesInput.value}`);

                if (isNaN(average)) {
                    averageInfo.innerHTML = '???';
                    localStorage.setItem('average', '0');
                }

                localStorage.removeItem(thisGradeLocalStorageId);
                createGradeItem.remove();
            })

            gradesOfThisWeight++;
            localStorage.setItem(`gradesOfWeight${i}`, `${gradesOfThisWeight}`);
        })
    }
}

const removeGradesInput = (gradesInput) => {
    let boxInputToRemove = document.querySelector(`#gradesWeight${gradesInput}`);
    boxInputToRemove.remove();
}

for (let i = 1; i < 11; i++) {
    let weightInput = document.querySelector(`#inputWeight${i}`);
    let isWeightChecked = document.querySelector(`#inputWeight${i}`).checked;
    if (isWeightChecked || localStorage.getItem(`#inputWeight${i}`) !== "0") {
        localStorage.setItem(`#inputWeight${i}`, '1');
        document.querySelector(`#inputWeight${i}`).checked = true;
        if (localStorage.getItem(`isWeight${i}Created`) === '1') {
            createGradesInput(i);
            console.log('created already');
        } else {
            createGradesInput(i);
            localStorage.setItem(`isWeight${i}Created`, '1');
            console.log('it was never created');
        }
    } else {
        localStorage.setItem(`#inputWeight${i}`, '0');
    }
    weightInput.addEventListener('click', () => {
        let isWeightChecked = document.querySelector(`#inputWeight${i}`).checked;
        if (!isWeightChecked) {
            localStorage.setItem(`#inputWeight${i}`, '0');
            removeGradesInput(i);
            console.log("is not checked");
        } else {
            localStorage.setItem(`#inputWeight${i}`, '1');
            createGradesInput(i);
            console.log("ischecked");
        }
    })
}