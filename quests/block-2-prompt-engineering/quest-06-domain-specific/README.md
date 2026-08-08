# Quest 2.3: Domain-Specific Prompting

**Block**: 2 - Prompt Engineering | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Write prompts for specialized domains
- Handle domain-specific validation rules
- Implement industry-specific logic

## 📋 Instructions

1. **Choose a domain**: E-commerce, Healthcare, or Finance
2. **Research domain rules**: Understand validation requirements
3. **Write domain prompts**: Create prompts with domain knowledge
4. **Implement validators**: Build domain-specific validation logic
5. **Test thoroughly**: Verify compliance with domain rules

## 🚀 Getting Started

### Choose Your Domain

#### E-commerce
- Product validation (name, price, SKU)
- Order processing
- Tax calculation
- Inventory management

#### Healthcare
- Patient data validation (HIPAA compliance)
- Appointment scheduling
- Insurance verification
- Medical record formats

#### Finance
- Transaction validation
- Account verification
- Interest calculations
- Compliance (PCI DSS)

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

### Domain-Specific Prompting Tips

1. **Include industry terminology**: Use domain-specific terms
2. **Reference regulations**: Mention compliance requirements
3. **Specify validation rules**: Include domain-specific constraints
4. **Handle edge cases**: Consider industry-specific edge cases

### Example Domain Prompt

```
Create a healthcare patient validator that:
- Validates HIPAA-compliant data fields
- Checks insurance ID format (XXX-XXXX-XXX)
- Validates date of birth (must be past date, max age 150)
- Sanitizes PHI (Protected Health Information)
- Returns validation errors with compliance codes
```

## 🔍 What You'll Learn

- **Domain Knowledge**: Understanding industry-specific requirements
- **Compliance**: Implementing regulatory requirements
- **Validation Patterns**: Domain-specific validation strategies

## 📚 Resources

- [E-commerce Best Practices](https://www.shopify.com/blog/ecommerce-best-practices)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/for-professionals/privacy/index.html)
- [PCI DSS Standards](https://www.pcisecuritystandards.org/)

## ⏭️ Next Quest

[Quest 3.1: Spot the Vulnerability](../../block-3-security/quest-07-spot-vulnerability/)
