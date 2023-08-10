require('dotenv/config');
const cors = require('cors');
import app from './app';

app.use(cors({
    origin: 'https://todo-list-woad-gamma.vercel.app'
}));

app.listen(process.env.PORT);
