const bcrypt = require('bcryptjs');

const bcryptGenSalt = (): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(
      Number(process.env.SALT) || 15,
      function (err, salt: string) {
        if (err) reject(err);
        else resolve(salt);
      },
    );
  });

const bcryptGenHash = (password: string, salt: string): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash: string) {
      if (err) reject(err);
      else resolve(hash);
    });
  });

export { bcryptGenSalt, bcryptGenHash };
