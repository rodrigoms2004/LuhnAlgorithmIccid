const getLuhnIccdId = (iccid, hasCheckSum = false)=> {
  // reverse iccd and transform each item as integer
  const iccidArray = iccid.split('').reverse().map(x => parseInt(x))

  // if checksum digit was given, remove it from the array, otherwise make it zero
  const givernCheckSum = hasCheckSum ? iccidArray.splice(0, 1)[0] : 0
  
  // Luhn algorithm.
  const sum = iccidArray
    // double the value of every second digit
    .map((value, index) => ( (index % 2 == 0) ? 
                          ( value == 9 ? value : ( (value * 2) % 9 ) ) : ( value ) ) )
    // compute the sum of all digits
    .reduce((acc, value) => (acc + value))
  
  // compute the checksum 
  const calculatedCheckSum =  parseInt( (sum * 9) % 10 )

  // if checkSum has been passed, return true or false to compare it, otherwise return the calculatedCheckSum
  return hasCheckSum ? ( calculatedCheckSum === givernCheckSum  ? true : false ) : calculatedCheckSum
}


module.exports = {
  getLuhnIccdId
}



// https://www.geeksforgeeks.org/luhn-algorithm/
// https://www.smartjac.biz/index.php/support/main-menu?view=kb&kbartid=4&tmpl=component&print=1


// https://www.imei.info/faq-what-is-ICCID/
// IMEI.info: The format of the ICCID is: MMCC IINN NNNN NNNN NN C x
// MM = Constant (ISO 7812 Major Industry Identifier)
// CC = Country Code
// II= Issuer Identifier
// N{12} = Account ID ("SIM number")
// C = Checksum calculated from the other 19 digits using the Luhn algorithm.
// x= An extra 20th digit is returned by the 'AT!ICCID?' command, but it is not officially part of the ICCID