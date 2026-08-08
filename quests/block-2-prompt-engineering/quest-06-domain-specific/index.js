/**
 * Quest 2.3: Domain-Specific Prompting
 * 
 * Block: 2 - Prompt Engineering
 * Difficulty**: 🔴 Hard
 * Time: 25 minutes
 * 
 * Goal: Write prompts for specialized domains (e-commerce, healthcare, finance)
 * 
 * Instructions:
 * 1. Choose a domain (e-commerce, healthcare, or finance)
 * 2. Write domain-specific prompts
 * 3. Implement the specialized functions
 * 4. Handle domain-specific validation and rules
 */

// TODO: Implement a domain-specific validator
// Choose ONE domain and implement validation for it

class DomainValidator {
  constructor(domain) {
    this.domain = domain;
  }

  // TODO: Implement validate method for your chosen domain
  validate(data) {
    // Your implementation here
    return { valid: false, errors: ['Not implemented'] };
  }

  // TODO: Implement domain-specific sanitization
  sanitize(data) {
    // Your implementation here
    return data;
  }

  // TODO: Implement domain-specific formatting
  format(data) {
    // Your implementation here
    return data;
  }
}

// E-commerce domain examples
class EcommerceValidator extends DomainValidator {
  constructor() {
    super('ecommerce');
  }

  // TODO: Validate product data
  validateProduct(product) {
    // Your implementation here
  }

  // TODO: Validate order data
  validateOrder(order) {
    // Your implementation here
  }

  // TODO: Calculate total with tax
  calculateTotal(items, taxRate = 0.08) {
    // Your implementation here
  }
}

// Healthcare domain examples
class HealthcareValidator extends DomainValidator {
  constructor() {
    super('healthcare');
  }

  // TODO: Validate patient data
  validatePatient(patient) {
    // Your implementation here
  }

  // TODO: Validate appointment data
  validateAppointment(appointment) {
    // Your implementation here
  }

  // TODO: Check insurance eligibility
  checkInsurance(patient, insurance) {
    // Your implementation here
  }
}

// Finance domain examples
class FinanceValidator extends DomainValidator {
  constructor() {
    super('finance');
  }

  // TODO: Validate transaction data
  validateTransaction(transaction) {
    // Your implementation here
  }

  // TODO: Validate account data
  validateAccount(account) {
    // Your implementation here
  }

  // TODO: Calculate interest
  calculateInterest(principal, rate, time) {
    // Your implementation here
  }
}

module.exports = {
  DomainValidator,
  EcommerceValidator,
  HealthcareValidator,
  FinanceValidator,
};
