import Fastify from 'fastify';
import plugin from '@hexlet/chat-server/src/plugin.js';
import process from 'node:process';

const port = Number(process.env.PORT || 5001);
const app = Fastify({ logger: true });

await app.register(plugin, {
  staticPath: `${process.cwd()}/dist`,
});

try {
  await app.listen({ port, host: '0.0.0.0' });
} catch (error) {
  if (error.code === 'EADDRINUSE') {
    console.log(`Chat server is already running on port ${port}.`);
    process.exit(0);
  }

  throw error;
}
