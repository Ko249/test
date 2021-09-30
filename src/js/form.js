const stringField = document.querySelectorAll('.form-field ')
const formButton = document.querySelector('.form-button')
let flag = true
stringField.forEach( field => {
    field.addEventListener('input', () => {
        if (!field.id){
            const newString = validateStringField(field.value)
            if (!newString) {
                field.placeholder = 'Letters only'
                field.classList.add('warning')
            }else if (field.classList.contains('warning')){
                field.classList.remove('warning')
            }
            field.value = newString
        }
        buttonActive() && flag ? formButton.disabled = false : formButton.disabled = true
    })
})
const buttonActive = () => {
    const isActive = Array.from(stringField).every( field => {
        return field.value !== ''
    })
    return isActive
}
formButton.onclick = function(){
    // Отключил отправку форму из-за перезагрузки страницы
    // formButton.submit();
    flag = false
    document.querySelector('.form-submit').classList.add('visible')
    this.disabled = true
}
const filledField = (forms,second=false) => {
    forms.forEach( initform => {
        initform.addEventListener('input', () => {
            const isFilled = Array.from(forms).every( str =>  str.value.replace('Chose your gender','') !== '' )
            if (isFilled && positionRow.classList.contains('visible') && second) {
                documentRow.classList.add('visible')
            }
            if (isFilled) {positionRow.classList.add('visible')}
        })
    })
}
const initForms = document.querySelectorAll('.initial .form-field ') 
const positionRow = document.querySelector('.row.position')
filledField(initForms)

const documentsForm = document.querySelectorAll('.position .form-field')
let documentRow = document.querySelector('.row.documents')
filledField(documentsForm, true)

const validateStringField = (str) => {
    let formatStr = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi, '')
    return formatStr && formatStr[0].toUpperCase() + formatStr.slice(1)
}

const inputFile = document.querySelector('#input__file')
const fileWrapper = document.querySelector('.loaded-file')
inputFile.addEventListener('input', (event) => loadFile(event))
const loadFile = (event) => {
    const file = event.target.files[0]
    const outputImg = document.querySelector('#loaded-image')
    const outputName = document.querySelector('.text-name')
    const outputSize = document.querySelector('.text-size')
    outputImg.src = URL.createObjectURL(file);
    outputImg.onload = () => {
        URL.revokeObjectURL(outputImg.src) 
    }
    textFile = file.name.split('.')
    outputName.textContent = textFile[0]
    const size =`${textFile[1].toUpperCase()} `+(file.size / Math.pow(10,6)).toFixed(1) +' mb'
    outputSize.textContent = size
    fileWrapper.classList.add('visible')
}
document.querySelector('.delete-icon').onclick = () => {
    formButton.disabled = true
    fileWrapper.classList.remove('visible')
    inputFile.value = ''
}