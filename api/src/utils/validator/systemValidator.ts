import validator from "validator";
import { CreateSystem } from "../Interface/systemInterface";

export function createSystemValidator(name: string, placed: string) {
  let errors: Partial<CreateSystem> = {};

  if (validator.isEmpty(name)) errors.name = "Name must not empty";
  if (validator.isEmpty(placed)) errors.placed = "Place must not empty";

  return {
    errors,
    valid: Object.keys(errors).length < 1 ? true : false,
  };
}
