import { databaseClient } from "../controller/datasbase.controller";

export class UserBase {

  public readonly email: string;

  public readonly password: string;

  public readonly first_name: string;

  public readonly last_name: string;

  public constructor(data: UserBase) {
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name
  }
}

export class User extends UserBase {

  public readonly id: number;

  public constructor(data: User) {
    super(data);
    this.id = data.id;
  }

  static async getAllUsers(): Promise<readonly User[]> {
    const { rows } = await databaseClient.query<User>('SELECT * FROM users');

    return rows;
  }

  static async addUser(user: UserBase): Promise<void> {
    await databaseClient.query(
      'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
      [user.email, user.password, user.first_name, user.last_name],
    );
  }

  static async checkIfUserExists(email: User['email']): Promise<boolean> {
    const query = await databaseClient.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
    );

    return query.rowCount > 0;
  }

  static async checkAuthenticationData(user: UserBase): Promise<boolean> {
    const query = await databaseClient.query(
      'SELECT * FROM users WHERE email=$1 AND password=$2',
      [user.email, user.password],
    );

    return query.rowCount > 0;
  }

  static async getUserByEmail(email: User['email']): Promise<User> {
    const query = await databaseClient.query<User>(
      'SELECT * FROM users WHERE email=$1 LIMIT 1',
      [email],
    );

    return new User(query.rows[0]);
  }
}
