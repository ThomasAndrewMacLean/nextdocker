export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        res.json('🙌');
        break;
    default:
        res.status(405).end(); //Method Not Allowed
        break;
    }
};
