const {
  getLuhnIccdId
} = require('./LuhnCheck')

  
const getSimParams = arraySim => {

  if (arraySim.length !== 20) return 0;

  const objSimParams = {
    MII           : arraySim.splice(0, 2).toString().replace(/\,/g, ''),
    CC            : arraySim.splice(0, 2).toString().replace(/\,/g, ''),
    II            : arraySim.splice(0, 3).toString().replace(/\,/g, ''),
    unknow1       : arraySim.splice(0, 1).toString().replace(/\,/g, ''),
    Manufacturer  : arraySim.splice(0, 1).toString().replace(/\,/g, ''),
    simIdNumber   : arraySim.splice(0, 10).toString().replace(/\,/g, ''),
    checkSum      : arraySim.splice(0, 1).toString().replace(/\,/g, ''),
  }

  return objSimParams
}

// const createRange = (start, end) => {
//   return Array(end - start + 1).fill().map((_, index) => start + index)
// }

const getIccidRange = (first, last) => {
  const firstArray = String(first).split('')
  const lastArray  = String(last).split('')

  const {MII, CC, II, unknow1, Manufacturer, simIdNumber} = getSimParams([...firstArray])

  const firstNumber  = parseInt(simIdNumber)
  const lastNumber   = parseInt(getSimParams([...lastArray])['simIdNumber'])

  const numberOfSims  = (lastNumber - firstNumber) + 1

  const arrayOfSims = []
  for (let i = 0; i < numberOfSims; i++) {
    arrayOfSims.push(firstNumber + i)
  }
  
  const result = arrayOfSims.map((simcardNumber) => {
    return (
      MII + 
      CC + 
      II + 
      unknow1 + 
      Manufacturer +
      simcardNumber
    )
  }).reverse().map(sim => sim + getLuhnIccdId(sim))

  return result
}

module.exports = {
  getIccidRange
}

const inicialICCID  = "89551230111004565676" 
const finalICCID    = "89551230111004565767"


const listOfIccids = getIccidRange(inicialICCID, finalICCID)



console.log(listOfIccids)

const sim_array = require('./simcards.json')

sim_array.forEach(sim => {
  console.log(getLuhnIccdId(sim, true))
});
