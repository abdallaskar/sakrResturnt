

const getArrayFromNumber = (number) => {
    const resArray = [];
    for (let index = 1; index <= number; index++) {
        resArray.push(index);

    }
    return resArray;
}

export default getArrayFromNumber;