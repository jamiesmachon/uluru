import * as bcrypt from 'bcrypt';

export function generateUsernameFromEmail(email: string): string {
  return email.split('@')[0].toLowerCase().replace(/\./g, '');
}

export async function hashPassword(
  password: string,
): Promise<[salt: string, hash: string]> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return [salt, hash];
}

export async function doesPasswordMatch(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function createValidationCode(): string {
  const salt = bcrypt.genSaltSync(10);
  const code = bcrypt.hashSync(Date.now().toString(), salt);

  return code;
}
