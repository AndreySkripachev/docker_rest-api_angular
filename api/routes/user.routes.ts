import { ServerResponseCode } from "../core/enums/server-response";
import { Token } from "../records/token.record";
import { User } from "../records/user.record";
import { app } from '../controller/app.controller';

app.get('/users', async(req, res) => {
  const users = await User.getAllUsers();
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(ServerResponseCode.OK);
  res.write(JSON.stringify(users));
  res.end();
});

app.get('/users/profile', async(req, res) => {
  const authHeader = req.headers.authorization as string;
  const tokenValue = authHeader.split(' ')[1];
  const token = new Token(tokenValue);
  const email = Token.tokenToEmail(token);

  const user = await User.getUserByEmail(email);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(ServerResponseCode.OK);
  res.write(JSON.stringify({ id: user.id, first_name: user.first_name, last_name: user.last_name }));
  res.end();
});
