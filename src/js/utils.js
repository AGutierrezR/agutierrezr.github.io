export function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { timeZone: 'UTC' })
}

