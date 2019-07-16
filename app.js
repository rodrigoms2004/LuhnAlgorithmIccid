const {
  getIccidRange
} = require('./lib/iccidCalc')

const {
  getLuhnIccdId
} = require('./lib/LuhnCheck')


const inicialICCID  = "89551230111004565676" 
const finalICCID    = "89551230111004565767"


const listOfIccids = getIccidRange(inicialICCID, finalICCID)

console.log(listOfIccids)

const sim_array = require('./simcards.json')

sim_array.forEach(sim => {
  console.log(getLuhnIccdId(sim, true))
});
