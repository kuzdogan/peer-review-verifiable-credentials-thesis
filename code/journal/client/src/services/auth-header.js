export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('accessToken'));

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
