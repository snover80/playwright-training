import { test } from "../fixtures/api";

test.skip('has title', async ({ commentsEndpoint }) => {
  const response = await commentsEndpoint.getCommentsById(1);
  const responseJson = await response.json();
  console.log(responseJson);
});
