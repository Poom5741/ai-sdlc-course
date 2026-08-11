/**
 * Quest 2.3: REFERENCE solution (do NOT import or read during the exercise)
 *
 * Thai phone: 10 digits, prefix 06/08/09, normalize formatted forms first.
 * Thai ID: 13 digits, checksum = (11 - (Σ digit_i*(14-i)) mod 11) mod 10.
 */

function isValidThaiPhone(s) {
  if (typeof s !== 'string') return false;
  const digits = s.replace(/\D/g, '');
  if (digits.length !== 10) return false;
  if (!/^0[689]/.test(digits)) return false;
  return true;
}

function isValidThaiId(s) {
  if (typeof s !== 'string') return false;
  const digits = s.replace(/\D/g, '');
  if (digits.length !== 13) return false;
  if (!/^\d+$/.test(digits)) return false;
  const arr = digits.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += arr[i] * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;
  return check === arr[12];
}

module.exports = { isValidThaiPhone, isValidThaiId };