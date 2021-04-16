export default function authHeader() {
  const token = localStorage.getItem('accessToken');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  throw new Error('Access token not found. Please authenticate');
}
