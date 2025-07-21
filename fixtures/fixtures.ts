import { mergeTests } from '@playwright/test';
import { test as hooks } from './hooks';
import { test as pages } from './pages';

export const test = mergeTests(hooks, pages);
export { expect } from '@playwright/test';

export function step(stepName?: string) {
  return function (
    originalMethod: Function,
    context: ClassMethodDecoratorContext
  ) {
    return async function (this: any, ...args: any[]) {
      const name = stepName || `${this.constructor.name} - ${String(context.name)}`;
      return await test.step(name, async () => {
        return await originalMethod.apply(this, args);
      });
    };
  };
}

