import { get } from 'lodash-es';

export let typesMap = {};
export function registerType(typeDefinition) {
  typesMap[typeDefinition.type] = typeDefinition;
}

export function getNumberOfErrors(errors) {
  return Object.values(errors).filter((value) => !!value).length;
}

const DEFAULT_VALIDATION_ERROR = 'Validation failed.';

const isInputValueInvalid = function (input, values) {
  if (!typesMap[input.type]) {
    throw new Error(
      `Input type of ${input.type} is not found in the types map. Make sure you imported the type and the type property on your input is defined.`
    );
  }
  const value = get(values, input.name);
  if (typeof typesMap[input.type].isValid === 'function') {
    return !typesMap[input.type].isValid(value, input);
  } else {
    return !value;
  }
};

export function shouldDisplayInput(inputs, input, values, mode) {
  let specificConditionKey;
  const parent = input['inheritConditionFrom']
    ? inputs.find((q) => q.name === input['inheritConditionFrom'])
    : null;

  if (mode === 'read') {
    specificConditionKey = 'displayConditionRead';
  } else if (mode === 'write') {
    specificConditionKey = 'displayConditionWrite';
  }
  const condition = input[specificConditionKey] || input['displayCondition'];
  try {
    let meetsOwnCondition;
    if (typeof condition === 'undefined' || condition === null) {
      meetsOwnCondition = true;
    }
    if (typeof condition === 'string') {
      //JS expression
      meetsOwnCondition = evaluateExpressionAgainstValues(values, condition);
    }
    if (typeof condition === 'function') {
      //JS function
      meetsOwnCondition = condition(values);
    }

    if (!meetsOwnCondition && values[input.name]) {
      values[input.name] = null;
    }

    const meetsParentCondition = parent ? shouldDisplayInput(inputs, parent, values, mode) : true;
    return meetsOwnCondition && meetsParentCondition;
  } catch (e) {
    // We suppress this error on purpose, if a display condition fails we treat it as falsy
    // console.error(e);
  }
}

export async function getInputValidationError(inputs, input, values) {
  const value = get(values, input.name);
  if (!shouldDisplayInput(inputs, input, values)) {
    return undefined;
  }
  if (input.validations) {
    for (let validation of input.validations) {
      try {
        if (validation.type === 'regexp' || validation.type === undefined) {
          //Default type
          const regexp = new RegExp(validation.rule);
          if (!regexp.test(value)) {
            return validation.message || DEFAULT_VALIDATION_ERROR;
          }
        }

        if (validation.type === 'expression') {
          if (!evaluateExpressionAgainstValues(values, validation.rule)) {
            return validation.message || DEFAULT_VALIDATION_ERROR;
          }
        }

        if (validation.type === 'js') {
          try {
            if (!(await validation.rule(values))) {
              return validation.message || DEFAULT_VALIDATION_ERROR;
            }
          } catch (e) {
            return validation.message || DEFAULT_VALIDATION_ERROR;
          }
        }
      } catch (e) {
        // We suppress this error on purpose, if a display condition fails we treat it as falsy
        // console.error(e);
      }
    }
  }
  if (input.required && isInputValueInvalid(input, values)) {
    return 'Required.';
  }
}

export function evaluateExpressionAgainstValues(values, expression) {
  return new Function(...Object.keys(values), 'return ' + expression)(...Object.values(values));
}

export async function getFormValidationErrors(form, values) {
  const errors = {};
  await Promise.all(
    form.inputs.map(async (input) => {
      const error = await getInputValidationError(form.inputs, input, values);
      errors[input.name] = error || null;
    })
  );
  return errors;
}

export async function getAllFormsValidationErrors(forms, values) {
  const errors = {};
  await Promise.all(
    forms.map(async (form) => {
      await Promise.all(
        form.inputs.map(async (input) => {
          const error = await getInputValidationError(form.inputs, input, values);
          errors[input.name] = error || null;
        })
      );
    })
  );
  return errors;
}

export default {
  typesMap,
  registerType,
  getNumberOfErrors,
  shouldDisplayInput,
  getInputValidationError,
  evaluateExpressionAgainstValues,
  getFormValidationErrors
};
