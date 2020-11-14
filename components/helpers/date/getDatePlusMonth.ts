
const getDatePlusMonth = (): Date => {
    const currDate = new Date();
    return new Date(currDate.setMonth(currDate.getMonth()+1));
}

  export default getDatePlusMonth