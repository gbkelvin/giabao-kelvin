export const validationEmail = (email) => {

    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(pattern.test(email)) {
        return true;
    } else {
        return false;
    }

};

export const validateInput = (inputData) => {
    if(inputData === undefined || inputData === '') {
        return false;
    } else {
        return true
    }
}
  