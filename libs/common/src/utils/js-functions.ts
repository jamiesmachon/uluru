export function generateUsernameFromEmail(str: string): string {
  return str.split('@')[0].toLowerCase().replace(/\./g, '');
}
