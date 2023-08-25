import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho de autorização está presente
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido!' });
    }

    // Extrai o token do cabeçalho de autorização
    const [, token] = authHeader.split(' ');

    try {
        // Verifica a validade do token
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        // Anexa o ID do usuário ao objeto de solicitação para uso posterior
        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido!' });
    }
};
