declare namespace NodeJS {
  interface ProcessEnv {
    TEST_USER: string;
    TEST_PASSWORD: string;
    SAUCE_DEMO_USER: string;
    SAUCE_DEMO_PASSWORD: string;
    BASE_URL: string;
  }
}