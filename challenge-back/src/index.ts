import express from 'express';
import bodyParser from 'body-parser';
import admin from './fire';

/*
  For multiple routes I would split this into multiple files && use express.router
  TODO: separate express-code and business-code ('library')
  TODO: req-validation (I would use: https://github.com/ajv-validator/ajv);
*/

const port = 5000;
const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.put('/orders/:orderId', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.send('no req body!');
    const { title, bookingDate } = req.body;
    const { orderId } = req.params;
    if (!orderId || !title || !bookingDate) return res.status(422).json({ error: 'error in req. body' }); // https://httpstatuses.com/422

    db.collection('orders')
        .doc(orderId)
        .update({ title, bookingDate })
        .then((order) => {
            res.json({ ok: true, order });
        })
        .catch((error) => {
            res.send({ ok: false, error });
        });
});

// TODO:
// app.post('/orders', async (req: express.Request, res: express.Response) => {
//   if (!req.body) return res.send('no req body!');
//   const { title, bookingDate, address, customer } = req.body;
//   res.send(req.body);
// });

app.listen(port, () => console.log(`server is listening on ${port}`));

// quick test:
// db.collection("orders").doc("6pQkriv74KPclUataBsf").update({bookingDate: 1600376401}).then(console.log).catch(console.log)
