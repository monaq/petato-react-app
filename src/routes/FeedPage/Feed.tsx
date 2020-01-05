import React, { Suspense } from 'react';
import { ErrorMessage, LoadingPage, withErrorBoundary } from '../../shared';

const ErrorMessageWithErrorBoundary = withErrorBoundary(ErrorMessage);
const FeedContainer = () => (
  <>
    <ErrorMessageWithErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <section>
          <h1>FeedMain</h1>
        </section>
      </Suspense>
    </ErrorMessageWithErrorBoundary>
  </>
);

export default FeedContainer;
