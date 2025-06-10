import { useState, useEffect, useCallback, useRef } from 'react';

// ***********************Type Define ***********************

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

type UseAsyncStateOptions<T> = {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retries?: number;
  retryDelay?: number;
};

type UseAsyncStateReturn<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | undefined>;
};

function useAsyncState<T>(
  asyncFunction: AsyncFunction<T>,
  options: UseAsyncStateOptions<T> = {}
): UseAsyncStateReturn<T> {
  const {
    immediate = false,
    onSuccess,
    onError,
    retries = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | null>(null);

// ***************Handle loading states******************
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

// **************Memory leak prevention*******************
  const isMounted = useRef(true);
  const latestExecutionId = useRef(0);

  const execute = useCallback(
    async (...args: any[]): Promise<T | undefined> => {
      const executionId = ++latestExecutionId.current;
      setLoading(true);
      setError(null);

// ***************Automatic retry***************

      let currentRetry = 0;
      let result: T | undefined;

      while (currentRetry <= retries) {
        try {
          const response = await asyncFunction(...args);

        // ****************Prevent race conditions ***********
            
          if (isMounted.current && executionId === latestExecutionId.current) {
            setData(response);
            setLoading(false);
            setRetryCount(0);
            onSuccess?.(response);
          }
          result = response;
          break;
        } catch (err) {
          if (currentRetry < retries) {
            const delay = retryDelay * Math.pow(2, currentRetry);
            await new Promise(resolve => setTimeout(resolve, delay));
            currentRetry++;
            setRetryCount(currentRetry);
            continue;
          }

          if (isMounted.current && executionId === latestExecutionId.current) {
            setError(err as Error);
            setLoading(false);
            onError?.(err as Error);
          }
          result = undefined;
        }
      }

      return result;
    },
    [asyncFunction, onSuccess, onError, retries, retryDelay]
  );


//*************** */ Memory leak prevention***************

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      isMounted.current = false;
    };
  }, [execute, immediate]);

  return { data, loading, error, execute };
}

export default useAsyncState;