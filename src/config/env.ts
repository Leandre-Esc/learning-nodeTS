import {z} from "zod";
import 'dotenv-flow/config';
import * as process from "node:process";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(8000),
    HOST: z.string().default('0.0.0.0'),
    POSTGRES_URI: z.string().url(),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
})

export const env = envSchema.parse(process.env);
export type ENV = z.infer<typeof envSchema>;