import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    private redis;
    private isConnected = false;

    constructor(private readonly configService: ConfigService) {
        if (this.configService.get('USE_REDIS') === 'true') {
            this.redis = new Redis({
                host: this.configService.get('REDIS_HOST'),
                port: this.configService.get('REDIS_PORT'),
                password: this.configService.get('REDIS_PASSWORD'),
                maxRetriesPerRequest: 1,
            });

            this.isConnected = true;
            console.log(
                `Redis connected on port ${this.configService.get(
                    'REDIS_PORT',
                )}.`,
            );
        }
    }

    async get(key: string): Promise<string | null> {
        if (!this.isConnected) {
            return null;
        }
        return await this.redis.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        if (!this.isConnected) {
            return;
        }
        await this.redis.set(key, value);
    }

    async del(key: string): Promise<void> {
        if (!this.isConnected) {
            return;
        }
        await this.redis.del(key);
    }

    async flushall(): Promise<void> {
        if (!this.isConnected) {
            return;
        }
        await this.redis.flushall();
    }
}
