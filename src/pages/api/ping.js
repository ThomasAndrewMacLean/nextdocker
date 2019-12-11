export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        res.json('pong');

        break;
    default:
        res.status(405).end(); //Method Not Allowed
        break;
    }
};
