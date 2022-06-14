const calculateButton = document.querySelector('#calculateButton');
const addGradeButton = document.querySelector('#addGradeButton');
const grades = document.querySelector('#grades');
const allInputs = document.querySelectorAll('input');
const averageInfo = document.querySelector('#average')
let gradesAmount = 2;
let average = 0;

calculateButton.addEventListener('click', () => {
    let average = calculateAverage();
    averageInfo.innerHTML = `Twoja srednia to: ${average}`;
})

addGradeButton.addEventListener('click', () => {
    createGradeContainer();
})

const createGradeContainer = () => {
    const createGrade = document.createElement('div');
    const createInputGradeTitle = document.createElement('h2');
    const createSpecifyGradeBox = document.createElement('div');
    const createLabelForGrade = document.createElement('label');
    const createGradeInput = document.createElement('input');
    const createLabelForWeight = document.createElement('label');
    const createWeightInput = document.createElement('input');

    gradesAmount++;

    createGrade.className = 'grade';
    grades.append(createGrade);

    createInputGradeTitle.innerHTML = 'Wpisz ocene';
    createGrade.append(createInputGradeTitle);

    createSpecifyGradeBox.className = 'specifyGradeBox';
    createGrade.append(createSpecifyGradeBox);

    createLabelForGrade.setAttribute('for', `grade${gradesAmount}`);
    createLabelForGrade.innerHTML = "Ocena";

    setInputAttributes(createGradeInput, "6", "grade");
    createGradeInput.className = "gradeInput";

    createLabelForWeight.setAttribute('for', `weight${gradesAmount}`);
    createLabelForWeight.innerHTML = "Ocena";

    setInputAttributes(createWeightInput, "4", "weight");
    createWeightInput.className = "weightInput";

    createSpecifyGradeBox.append(createLabelForGrade, createGradeInput, createLabelForWeight, createWeightInput);
}

const setInputAttributes = (element, value, input) => {
    element.setAttribute('type', 'number');
    element.setAttribute('min', '1');
    element.setAttribute('max', `${value}`);
    element.setAttribute('id', `${input}${gradesAmount}`);
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