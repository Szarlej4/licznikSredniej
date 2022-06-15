const calculateButton = document.querySelector('#calculateButton');
const addGradeButton = document.querySelector('#addGradeButton');
const grades = document.querySelector('#grades');
const allInputs = document.querySelectorAll('input');
const averageInfo = document.querySelector('#average');
const allWeightInputs = document.querySelectorAll('.chooseWeightInput');
const allGradeInputs = document.querySelectorAll('.gradeInput');
let sum = 0;
let average = 0;

for (let input of allGradeInputs) {
    input.addEventListener('click', () => {
    })
}

for (let input of allWeightInputs) {
    const allGradeInputs = document.querySelectorAll(`#gradesWeight${input.value} .gradesInput`);
    const gradeInformation = document.querySelector(`#gradesInformation${input.value}`);
    for (let gradeInput of allGradeInputs) {
        gradeInput.addEventListener('click', () => {
            gradeInformation.innerHTML += `${gradeInput.value} `;
            // sum += gradeInput.value * input.value;
            // average += input.value * 1;
            // console.log(sum);
            // console.log(average);
            // console.log(Math.round((sum / average) * 1000) / 1000);
        })
    }
    input.addEventListener('change', () => {
        let elementId = document.querySelector(`#gradesWeight${input.value}`);
        elementId.classList.toggle('hidden');
    })
}

calculateButton.addEventListener('click', () => {
    let average = calculateAverage();
    averageInfo.innerHTML = `Twoja srednia to: ${average}`;
})

// const createElements = (weight, checked) => {
//     for (let input of allWeightInputs) {
//         if (input.checked) {
//             if (checked && document.querySelector(`#weight${weight}Grades`) === null) {
//                 const createGradesContainer = document.createElement('div');
//                 const createInputGradeTitle = document.createElement('h2');
//                 const createSpecifyGradeBox = document.createElement('div');

//                 createGradesContainer.className = 'grade';
//                 createGradesContainer.id = `weight${weight}Grades`
//                 grades.append(createGradesContainer);

//                 createInputGradeTitle.innerHTML = `oceny waga ${weight}`;
//                 createGradesContainer.append(createInputGradeTitle);

//                 createSpecifyGradeBox.className = 'specifyGradeBox';
//                 createGradesContainer.append(createSpecifyGradeBox);

//                 for (let i = 1; i < 7; i++) {
//                     const createGradeInputButton = document.createElement('button');
//                     createGradeInputButton.id = `${weight}${i}`;
//                     createGradeInputButton.innerHTML = i;
//                     createSpecifyGradeBox.append(createGradeInputButton);
//                 }
//             }
//         }
//     }
// }

// addGradeButton.addEventListener('click', () => {
//     createGradeContainer();
// })

// const createGradeContainer = () => {
//     const createGrade = document.createElement('div');
//     const createInputGradeTitle = document.createElement('h2');
//     const createSpecifyGradeBox = document.createElement('div');
//     const createLabelForGrade = document.createElement('label');
//     const createGradeInput = document.createElement('input');
//     const createLabelForWeight = document.createElement('label');
//     const createWeightInput = document.createElement('input');

//     gradesAmount++;

//     createGrade.className = 'grade';
//     grades.append(createGrade);

//     createInputGradeTitle.innerHTML = 'Wpisz ocene';
//     createGrade.append(createInputGradeTitle);

//     createSpecifyGradeBox.className = 'specifyGradeBox';
//     createGrade.append(createSpecifyGradeBox);

//     createLabelForGrade.setAttribute('for', `grade${gradesAmount}`);
//     createLabelForGrade.innerHTML = "Ocena";

//     setInputAttributes(createGradeInput, "6", "grade");
//     createGradeInput.className = "gradeInput";

//     createLabelForWeight.setAttribute('for', `weight${gradesAmount}`);
//     createLabelForWeight.innerHTML = "Ocena";

//     setInputAttributes(createWeightInput, "4", "weight");
//     createWeightInput.className = "weightInput";

//     createSpecifyGradeBox.append(createLabelForGrade, createGradeInput, createLabelForWeight, createWeightInput);
// }

const setInputAttributes = (element, id) => {
    element.setAttribute('type', 'number');
    element.setAttribute('min', '1');
    element.setAttribute('max', `6`);
    element.setAttribute('id', `${id}`);
}

const calculateAverage = () => {
    let gradeSum = 0;
    let weightSum = 0;
    for (let i = 1; i <= gradesAmount; i++) {
        let grade = document.querySelector(`#grade${i}`).valueAsNumber;
        let weight = document.querySelector(`#weight${i}`).valueAsNumber;
        for (let j = 0; j < weight; j++) {
            gradeSum += grade;
        }
        weightSum += weight;
    }
    return Math.round((gradeSum / weightSum) * 1000) / 1000;
}