export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
