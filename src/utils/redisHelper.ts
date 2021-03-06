import { Redis } from 'ioredis';
import RedisClient from 'ioredis'
import config from '../config';

// 过期时间设置常用操作：
// EXPIRE 将key的生存时间设置为ttl秒
// PEXPIRE 将key的生成时间设置为ttl毫秒
// EXPIREAT 将key的过期时间设置为timestamp所代表的的秒数的时间戳
// PEXPIREAT 将key的过期时间设置为timestamp所代表的的毫秒数的时间戳

export default class RedisHelper {
  protected redisInstance: Redis
  protected db: number
  constructor(db: number = 0) {
    this.db = db;
    this.init()
  }
  private init() {
    this.redisInstance = new RedisClient({
      port: config.redisConfig.port,
      host: config.redisConfig.host,
      db: this.db,
      password: config.redisConfig.password
    })
  }

  public async set(key: string, value: any, time = 0) {
    if (time) {
      await this.redisInstance.set(key, value, 'EX', time)
    } else {
      await this.redisInstance.set(key, value, 'EX')
    }
  }

  public async get(key: string) {
    return await this.redisInstance.get(key)
  }

  public async delete(...keys: RedisClient.KeyType[]) {
    await this.redisInstance.del(keys)
  }
}
