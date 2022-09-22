// Definición de Regex para comprobaciones
const requiredPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[a-zà-ú]{1,20}$/i;
const lowerCaseLettersRegex = /[a-z]/g
const upperCaseLettersRegex = /[A-Z]/g
const numbersRegex = /[0-9]/g
const symbolsRegex = /[$-/:-?{-~!"^_`\[\]]/

const regexUserId = /^user-+[0-9]{13,13}$/;
const regexNoteId = /^note-+[0-9]{13,13}$/;

module.exports = {
    requiredPass,
    mailRegex,
    nameRegex,
    lowerCaseLettersRegex,
    upperCaseLettersRegex,
    numbersRegex,
    symbolsRegex,
    regexUserId,
    regexNoteId
}