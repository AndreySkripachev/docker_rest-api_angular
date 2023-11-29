import { app } from '../controller/app.controller';
import { parseRequestBody } from '../core/utils/parse-request-body';
import { User, UserBase } from '../records/user.record'
import { Token } from '../records/token.record';
import { ServerResponseCode } from '../core/enums/server-response';
import { AuthorizationError } from '../core/utils/error/authorization-error';
import { AppError } from '../core/utils/error/app-error';

app.post('/auth/login', async(req, res) => {
  const body = await parseRequestBody<UserBase>(req);
  const canAuthorize = await User.checkAuthenticationData(new UserBase(body));

  if (!canAuthorize) {
    throw new AuthorizationError('Invalid login or password');
  }

  const token = Token.emailToToken(body.email);

  res
    .writeHead(ServerResponseCode.OK, { 'Content-Type': 'application/json' })
    .write(JSON.stringify(token));
  res.end();
});

app.post('/auth/register', async(req, res) => {
  const body = await parseRequestBody<UserBase>(req);
  const isUserExists = await User.checkIfUserExists(body.email);

  if (isUserExists) {
    throw new AppError('User with given email is already exists', ServerResponseCode.BadRequest);
  }

  const user = new UserBase({
    email: body.email,
    password: body.password,
    first_name: body.first_name,
    last_name: body.last_name,
  });

  await User.addUser(user);
  const token = Token.emailToToken(user.email);

  res.writeHead(ServerResponseCode.OK, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(token));
  res.end();
})
