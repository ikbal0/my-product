export default function login_validate(values){
    const errors = {};

    // validation for email 
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be grater than 8';
    } else if (values.password.includes(" ")){
        errors.password = "Invalid Password";
    }

    return errors;
}

export function register_validate(values){
    const errors = {};

    // validation for name
    if (!values.name) {
        errors.name = "Required";
    }

    // validation for email 
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for gender
    if (!values.gender) {
        errors.gender = "Required";
    }

    // validation for password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be grater than 8';
    } else if (values.password.includes(" ")){
        errors.password = "Invalid Password";
    }

    // validation for password
    if (!values.cpassword) {
        errors.cpassword = 'Required';
    } else if (values.cpassword !== values.password) {
        errors.cpassword = 'Password Not Match!';
    } else if (values.cpassword.includes(" ")){
        errors.cpassword = "Invalid Confirm Password";
    }

    return errors;

}