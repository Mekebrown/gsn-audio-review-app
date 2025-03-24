import validator from "validator";

/**
 * Sanitizes and validates an email address.
 * 
 * @param {string} email - The email address to sanitize and validate.
 * @param {Object} [options] - Optional configuration for validation.
 * @param {boolean} [options.allowDisplayName=false] - Allow display names in the email.
 * @param {boolean} [options.requireTLD=true] - Require a top-level domain in the email.
 * @returns {string|null} - Returns the sanitized email if valid, otherwise null.
 */
const emailSanitizer = (email, options = { allowDisplayName: false, requireTLD: true }) => {
    if (!email || typeof email !== "string") {
        console.error("Invalid input: email must be a non-empty string.");
        return null;
    }

    // Trim and sanitize the email
    const sanitizedEmail = validator.trim(email);

    // Validate the email
    const isValid = validator.isEmail(sanitizedEmail, options);

    return isValid ? sanitizedEmail : null;
};

export default emailSanitizer;