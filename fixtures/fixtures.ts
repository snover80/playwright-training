import { mergeTests } from '@playwright/test';
import { test as hooks } from './hooks';
import { test as pages } from './pages';

export const test = mergeTests(hooks, pages);
export { expect } from '@playwright/test';