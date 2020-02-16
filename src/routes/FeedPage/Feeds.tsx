import React, { Suspense } from 'react';
import { ErrorMessage, Loading, withErrorBoundary } from '../../shared';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Feed from 'components/Feed';

const ErrorMessageWithErrorBoundary = withErrorBoundary(ErrorMessage);
const FeedContainer = () => {
  async function mockApiTest() {
    const result = await axios.get('/v1/user?email=test%40example.com');
    console.log('user:::', result);
  }

  mockApiTest();

  return (
    <>
      <ErrorMessageWithErrorBoundary>
        <Suspense fallback={<Loading />}>
          <section>
            <h1>FeedMain</h1>
            <Feed />
          </section>
        </Suspense>
      </ErrorMessageWithErrorBoundary>
    </>
  );
};

export default FeedContainer;
