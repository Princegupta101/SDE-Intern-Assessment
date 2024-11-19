import jwt from 'jsonwebtoken';

/**
 * Auth middleware for verifying JWT token.
 * @param {Request} request - The incoming request object.
 * @returns {Object|null} - Decoded token payload or null if verification fails.
 */
export async function auth(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.warn('No token found in cookies.');
      return null;
    }

    // Verify token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn('Token has expired:', error.message);
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Invalid token:', error.message);
    } else {
      console.error('Token verification error:', error.message);
    }

    return null;
  }
}
