'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

// import { useRouter } from '@/config/navigation';

function isEmpty(value: any): boolean {
  return value === null || value === undefined || (typeof value !== 'number' && value.length === 0);
}

function deepMergeObjects(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key as keyof typeof source] instanceof Object) {
      Object.assign(source[key], deepMergeObjects(target[key], source[key]));
    }
  }

  Object.assign(target || {}, source);

  // Filter empty values
  for (const key of Object.keys(target)) {
    if (isEmpty(target[key])) {
      delete target[key];
    }
  }
  return target;
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      return func(...args);
    }, wait);
  };
}

export default function useQueryParams<T extends Record<string, any>>({ defaultParams }: { defaultParams?: Partial<T> } = {}) {
  const searchParams = useSearchParams();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const router = useRouter();

  const [urlParams, setUrlParams] = useState<T>(
    Object.fromEntries(searchParams.entries()) as unknown as T // Initialize state on first load with type casting
  );

  useEffect(() => {
    setUrlParams(Object.fromEntries(searchParams.entries()) as unknown as T);
  }, [searchParams]);

  const setQueryParams = (data: Partial<T>, { debounceTime, scroll }: { debounceTime?: number; scroll?: boolean } = {}) => {
    const _debounceTime = debounceTime || 0;
    const params = deepMergeObjects(urlParams, data);
    const newUrl = `${pathname}?${new URLSearchParams(params).toString()}`;

    const updateUrl = () => {
      window.history.pushState({}, '', newUrl); // Use window.history.pushState
      if (scroll) {
        window.scrollTo(0, 0);
      }
      setUrlParams(params);
    };

    if (_debounceTime > 0) {
      debounce(updateUrl, _debounceTime)(); // Debounce with specified duration
    } else {
      updateUrl();
    }
  };

  const pushQueryParams = (data: Partial<T>, { debounceTime, scroll }: { debounceTime?: number; scroll?: boolean } = {}) => {
    const _debounceTime = debounceTime || 0;
    const params = deepMergeObjects(urlParams, data);
    const newUrl = `${pathname}?${new URLSearchParams(params).toString()}`;

    const updateUrl = () => {
      router.push(newUrl);
      // window.history.pushState({}, '', newUrl); // Use window.history.pushState
      if (scroll) {
        window.scrollTo(0, 0);
      }
      setUrlParams(params);
    };

    if (_debounceTime > 0) {
      debounce(updateUrl, _debounceTime)(); // Debounce with specified duration
    } else {
      updateUrl();
    }
  };

  const clearQueryParams = () => {
    const newUrl = `${pathname}`;
    window.history.pushState({}, '', newUrl); // Clear query parameters from URL
    setUrlParams({} as T); // Clear the state
  };

  const removeQueryParams = (keys: (keyof T)[]) => {
    const url = new URL(window.location.href);
    keys.forEach((item) => url.searchParams.delete(item as string));

    window.history.pushState({}, '', `${pathname}${url.search}`); // Remove the specified parameters

    const updatedParams = { ...urlParams };
    keys.forEach((key) => {
      delete updatedParams[key]; // Remove the keys from local state
    });

    setUrlParams(updatedParams);
  };

  useEffect(() => {
    if (!defaultParams) return;
    setQueryParams(defaultParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    removeQueryParams,
    clearQueryParams,
    setQueryParams,
    pushQueryParams,
    queryParams: urlParams,
  };
}
