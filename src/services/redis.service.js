import redis from "redis";

const client = redis.createClient();

export class RedisService {
  constructor() {
    client.on("error", (err) => console.error("Redis Error:  ", err));
  }

  async getValue(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value ? JSON.parse(value) : null);
      });
    });
  }

  async setValue(key, value, ttl) {
    return new Promise((resolve, reject) => {
      client.set(key, JSON.stringify(value), "EX", ttl, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
