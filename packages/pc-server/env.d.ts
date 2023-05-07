export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * node中的环境变量
       */
      NODE_ENV: string;
    }
  }
}