const JOURNAL_HOST = process.env.NODE_ENV === 'development' ? 'journalx.test' : 'journalx.herokuapp.com';

module.exports = {
  id: `did:web:${JOURNAL_HOST}#credentialsKey`,
  controller: `did:web:${JOURNAL_HOST}`,
  privateKeyBase58: '8oMdAPRMFqhifpbGHUM2oLEbvQNu7WWQqaqZEhLfHMwf',
  publicKeyBase58:
    '23V58StUorHjCjukwEfuyvSMDAisf5sgxKvBCAyt3jQTD5zVCw57haoqotHxbqQQZ5WmruofpXUfSNDEVv9gfHE7sFD4fULfhESpJC2FyH2CNaga1Tuzr6VpMcAfUvo3BYGA',
};
