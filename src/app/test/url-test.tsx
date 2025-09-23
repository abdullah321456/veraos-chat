'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UrlTest() {
  const searchParams = useSearchParams();
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setUrlParams(params);
  }, [searchParams]);

  const testUrl = 'reset-password?code=943264&email=abdullahzahid321456%40gmail.com';

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">URL Parameter Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">Test URL:</h3>
          <code className="text-sm bg-white p-2 rounded border block">
            {testUrl}
          </code>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium mb-2">Current URL Parameters:</h3>
          <pre className="text-sm bg-white p-2 rounded border">
            {JSON.stringify(urlParams, null, 2)}
          </pre>
        </div>
        
        <div className="p-4 bg-green-50 rounded-md">
          <h3 className="font-medium mb-2">Specific Parameters:</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Code:</strong> {searchParams.get('code') || 'Not found'}</li>
            <li><strong>Email:</strong> {searchParams.get('email') || 'Not found'}</li>
          </ul>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-md">
          <h3 className="font-medium mb-2">Instructions:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Copy this URL: <code className="bg-white px-1 rounded">{testUrl}</code></li>
            <li>Paste it in your browser address bar after your domain</li>
            <li>Check if the parameters are parsed correctly above</li>
            <li>The reset password form should now work without redirecting to login</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
