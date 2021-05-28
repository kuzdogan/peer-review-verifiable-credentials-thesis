export default function authHeader() {
  const token = localStorage.getItem('accessToken');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  console.log('You are not authenticated');
  return {};
  // throw new Error('Access token not found. Please authenticate');
}
