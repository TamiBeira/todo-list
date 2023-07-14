import jwt from 'jsonwebtoken';
import Users from '../models/Users';

import authConfig from '../../config/auth';

class SessionController{
    async store(req, res){
        const {email, password} = req.body;

        //Verificando se o email existe
        const users = await Users.findOne({
            where: {email}
        })
        if(!users){
            return res.status(401).json({error:'Usuário não existe!'})
        }

        //Verificar se a senha não bate com a do banco de dados
        if(!(await users.checkPassword(password))){
            return res.status(401).json({error:'Senha incorreta!'})
        }

        const {id, name} = users;

        return res.json ({
            users:{
                id,
                name,
                email
            },
            token:jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,

            })
        })
    }
}


export default new SessionController();