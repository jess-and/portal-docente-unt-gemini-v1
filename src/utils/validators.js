/**
 * Validadores para el Portal Docentes UNT
 */

export const validateInstitutionalEmail = (email) => {
  if (!email) return 'El correo institucional es obligatorio';
  const emailLower = email.trim().toLowerCase();
  if (!emailLower.endsWith('@unitru.edu.pe')) {
    return 'Debe ser un correo institucional válido (@unitru.edu.pe)';
  }
  return true;
};

export const validateDni = (dni) => {
  if (!dni) return 'El DNI es obligatorio';
  if (!/^\d{8}$/.test(dni.trim())) {
    return 'El DNI debe contener exactamente 8 dígitos numéricos';
  }
  return true;
};

export const validateJustification = (text) => {
  if (!text) return 'La justificación es obligatoria';
  if (text.trim().length < 100) {
    return `La justificación debe tener al menos 100 caracteres. (Actual: ${text.trim().length} caracteres)`;
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return true;
};
