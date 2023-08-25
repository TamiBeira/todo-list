import * as Yup from 'yup';

import Users from '../models/Users';

class UsersController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' })
        }

        //tratar se já existe um email
        const userExists = await Users.findOne({
            where: { email: req.body.email }
        })

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já está cadastrado!' })
        }


        const { id, name, email } = await Users.create(req.body);
        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' })
        }

        const { email, oldPassword } = req.body;

        const user = await Users.findByPk(req.userId)

        if (email !== user.email) {
            //tratar se já existe um email
            const userExists = await Users.findOne({
                where: { email }
            })

            if (userExists) {
                return res.status(400).json({ error: 'Usuário já está cadastrado!' })
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha incorreta!' })
        }

        const { id, name } = await user.update(req.body)

        return res.json({
            id,
            name,
            email
        })
    }

}

export default new UsersController();