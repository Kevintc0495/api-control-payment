export class NotFoundException extends Error {
  constructor(name: string, key: string) {
    super(`${name} ${key} no fue encontrado`);
  }
}
