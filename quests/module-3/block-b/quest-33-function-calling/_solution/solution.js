function defineFunction(name, description, parameters) {
  return {
    name,
    description,
    parameters,
    validate: (args) => {
      for (const [key, param] of Object.entries(parameters)) {
        if (param.required && !(key in args)) return false;
      }
      return true;
    }
  };
}
module.exports = { defineFunction };
