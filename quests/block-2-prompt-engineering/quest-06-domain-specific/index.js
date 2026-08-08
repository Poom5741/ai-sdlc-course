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

  validateProduct(product) {
    const errors = [];
    if (!product.name || product.name.length < 2) errors.push('Name required');
    if (typeof product.price !== 'number' || product.price < 0) errors.push('Invalid price');
    if (!product.sku) errors.push('SKU required');
    return { valid: errors.length === 0, errors };
  }

  validateOrder(order) {
    const errors = [];
    if (!order.items || order.items.length === 0) errors.push('No items');
    if (!order.customerId) errors.push('Customer required');
    return { valid: errors.length === 0, errors };
  }

  calculateTotal(items, taxRate = 0.08) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return Math.round(subtotal * (1 + taxRate) * 100) / 100;
  }
}

// Healthcare domain examples
class HealthcareValidator extends DomainValidator {
  constructor() {
    super('healthcare');
  }

  validatePatient(patient) {
    const errors = [];
    if (!patient.name) errors.push('Name required');
    if (!patient.dob || isNaN(Date.parse(patient.dob))) errors.push('Invalid DOB');
    if (!patient.insuranceId) errors.push('Insurance ID required');
    return { valid: errors.length === 0, errors };
  }

  validateAppointment(appointment) {
    const errors = [];
    if (!appointment.patientId) errors.push('Patient required');
    if (!appointment.date) errors.push('Date required');
    return { valid: errors.length === 0, errors };
  }

  checkInsurance(patient, insurance) {
    return { eligible: !!patient.insuranceId && !!insurance };
  }
}

// Finance domain examples
class FinanceValidator extends DomainValidator {
  constructor() {
    super('finance');
  }

  validateTransaction(transaction) {
    const errors = [];
    if (typeof transaction.amount !== 'number' || transaction.amount < 0) errors.push('Invalid amount');
    if (!transaction.type) errors.push('Type required');
    if (!transaction.account) errors.push('Account required');
    return { valid: errors.length === 0, errors };
  }

  validateAccount(account) {
    const errors = [];
    if (!account.id) errors.push('ID required');
    if (!account.owner) errors.push('Owner required');
    return { valid: errors.length === 0, errors };
  }

  calculateInterest(principal, rate, time) {
    return principal * rate * time;
  }
}

module.exports = {
  DomainValidator,
  EcommerceValidator,
  HealthcareValidator,
  FinanceValidator,
};
