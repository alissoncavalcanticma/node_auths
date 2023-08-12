import { Request, Response } from 'express';
import { User } from '../models/User';
import dotenv from 'dotenv';

/* The line `import { JWT } from 'jsonwebtoken';` is importing the `JWT` object from the `jsonwebtoken`
library. This library is commonly used for generating and verifying JSON Web Tokens (JWTs) in web
applications. */
import JWT  from 'jsonwebtoken';

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});
        if(!hasUser) {
            let newUser = await User.create({ email, password });

            //Gerando token logo após o registro
            const token = JWT.sign(
                {
                    id: newUser.id,
                    email: newUser.email
                },
                process.env.JWT_PRIVATE_KEY as string,
                {expiresIn: '2h'}
            );

            res.status(201);
            res.json({ id: newUser.id, token });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({ 
            where: { email, password }
        });

        if(user) {

            //Criando token JWT para devolver para o user
            const token = JWT.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_PRIVATE_KEY as string,
                {expiresIn: '2h'}
            );

            res.json({ status: true, token });
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json( {list} );
}