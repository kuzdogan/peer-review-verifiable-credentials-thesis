/**
 * Strip mongo properties from a ReviewProof to be able to verify it
 */
export function formatDBreviewProof(reviewProof) {
  const { createdAt, _id, user, ...originalReviewProof } = reviewProof;
  return originalReviewProof;
}
