import { createClient } from 'redis';



export const redisClient = createClient({
  url: 'redis://default:password@redis:6379',
});

redisClient.connect();
