import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomChar implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    var usernameRegex = /^[a-zA-Z\-]+$/;
    if (text.match(usernameRegex)){
        return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Username cannot contain numbers or special characters.';
  }
}