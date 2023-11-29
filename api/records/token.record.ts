import { User } from './user.record'

export class Token {

  public constructor(
    public readonly token: string,
  ) {}

  public static emailToToken(email: User['email']): Token {
    return new Token(btoa(email));
  }

  public static tokenToEmail(token: Token): User['email'] {
    return atob(token.token);
  }
}
