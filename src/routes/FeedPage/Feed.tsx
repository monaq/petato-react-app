import React, { Suspense } from 'react';
import { ErrorMessage, Loading, withErrorBoundary } from '../../shared';
import axios from 'axios';

const ErrorMessageWithErrorBoundary = withErrorBoundary(ErrorMessage);
const FeedContainer = () => {
  async function mockApiTest() {
    const result = await axios.get('https://dog.ceo/api/breeds/list/all');
    console.log(1, result);
  }

  mockApiTest();

  return (
    <>
      <ErrorMessageWithErrorBoundary>
        <Suspense fallback={<Loading />}>
          <section>
            <h1>FeedMain</h1>
          </section>
        </Suspense>
      </ErrorMessageWithErrorBoundary>
    </>
  );
};

export default FeedContainer;
