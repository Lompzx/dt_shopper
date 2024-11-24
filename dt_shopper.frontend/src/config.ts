type Environment = 'development' | 'production';

const ENV: Environment = (process.env.NODE_ENV as Environment) || 'development';

const config: Record<Environment, { baseUrl: string }> = {
  development: {
    baseUrl: 'http://localhost:8080', // URL para desenvolvimento local
  },
  production: {
    baseUrl: 'http://localhost:8080', // URL do ambiente de produção
  },
};

export default config[ENV];
