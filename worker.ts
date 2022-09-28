import express, { json } from "express";
import throng from 'throng';
import ws from 'ws';

const app = express();

let maxJobsPerWorker = 50;
let wsServer;

app.all('/work', async (req, res) => {
  wsServer = new ws.Server({ noServer: true });
  wsServer.on('connection', socket => {
    socket.on('message', () => throng.process(maxJobsPerWorker, async (job) => {
      throng(id => console.log(`Started worker ${id}`))
    }));
  });
  JSON.parse(req.body);
});

const server = app.listen(3001);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
