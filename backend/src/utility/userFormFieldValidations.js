async function validatePhoneNumber(phoneNumber) {
  const response = { success: false };
  // Make sure the number is an acceptable length or return an error msg
  if (phoneNumber.length < 6 || phoneNumber.length > 15) {
    response.message = 'Invalid length';
    return response;
  }
  // Make sure it's a number, containing only numbers
  if (isNaN(phoneNumber)) {
    response.message = 'Not a number';
    return response;
  }
  // If all checks pass, return success
  response.success = true;
  return response;
}

async function validateGender(gender) {
  const response = { success: false };
  // Check if a valid input was sent along or return an error message
  // Add more valid inputs as needed.
  if (!['M', 'F', 'O'].includes(gender)) {
    response.message = 'Not a valid input';
    return response;
  }
  // If all checks pass, return success
  response.success = true;
  return response;
}

async function validateFullName(fullName) {
  const response = { success: false };
  // Make sure the name does not contain any numbers
  if (/\d/.test(fullName.givenName) || /\d/.test(fullName.surname)) {
    response.message = 'Name cannot contain numbers';
    return response;
  }
  // Make sure the given name is not too long
  const maxGivenNameLength = 35;
  if (fullName.givenName.length > maxGivenNameLength) {
    response.message =
      'Given name cannot exceed ' + maxGivenNameLength + ' characters';
    return response;
  }
  // Make sure the surname is not too long
  const maxSurnameLength = 35;
  if (fullName.surname.length > maxSurnameLength) {
    response.message =
      'Surname cannot exceed ' + maxSurnameLength + ' characters';
    return response;
  }
  // If all checks pass, return success
  response.success = true;
  return response;
}

async function validateBirthDate(birthDate) {
  const response = { success: false };
  // Make sure the input only contains numbers
  if (isNaN(birthDate.day) || isNaN(birthDate.month) || isNaN(birthDate.year)) {
    response.message = 'Please input numbers only';
    return response;
  }
  // Make sure the day is between 1-31
  if (!between(birthDate.day, 1, 31)) {
    response.message = 'Please input a valid day';
    return response;
  }
  // Make sure the month is between 1-12
  if (!between(birthDate.month, 1, 12)) {
    response.message = 'Please input a valid month';
    return response;
  }
  // Make sure the year is somewhat reasonable
  if (!between(birthDate.year, 1900, 2022)) {
    response.message = 'Please input a valid year';
    return response;
  }

  // Check if x is between min and max
  function between(x, min, max) {
    return x >= min && x <= max;
  }
  // If all checks pass, return success
  response.success = true;
  return response;
}

module.exports = userFormFieldValidations = {
  validatePhoneNumber,
  validateGender,
  validateFullName,
  validateBirthDate,
};
