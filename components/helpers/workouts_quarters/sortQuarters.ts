
//From q3-2020
//returns 3 + 2020 => 2023
const getNumberFromQuarterString = (quarter:string) => {
    const quarterInt:number = parseInt(quarter.charAt(1));
    const yearInt:number = parseInt(quarter.substr(3,4));

    return quarterInt + yearInt;

}


const sortQuarters = (quartersNotSorted:string[]) =>  {
    const quartersSorted:string[] = quartersNotSorted.sort((a,b)=>getNumberFromQuarterString(b)-getNumberFromQuarterString(a));
    return quartersSorted;
}

export default sortQuarters