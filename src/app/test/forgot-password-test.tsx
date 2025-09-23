'use client';

import { useState } from 'react';
import { userService } from '@/services/userService';
import { toast } from 'sonner';

export function ForgotPasswordTest() {
  const [email, setEmail] = useState('abdullahzahid321456@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testForgotPassword = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await userService.forgotPassword(email);
      setResult({ success: true, data: response });
      toast.success('Forgot password request sent successfully!');
    } catch (error: any) {
      setResult({ 
        success: false, 
        error: error?.response?.data?.message || error.message || 'Unknown error' 
      });
      toast.error('Failed to send forgot password request');
    } finally {
      setIsLoading(false);
    }
  };

  const testResetPassword = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await userService.resetPassword({
        email: email,
        code: 'test-code-123',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      });
      setResult({ success: true, data: response });
      toast.success('Password reset successfully!');
    } catch (error: any) {
      setResult({ 
        success: false, 
        error: error?.response?.data?.message || error.message || 'Unknown error' 
      });
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Forgot Password API Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter email address"
          />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={testForgotPassword}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Forgot Password'}
          </button>
          
          <button
            onClick={testResetPassword}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Reset Password'}
          </button>
        </div>
        
        {result && (
          <div className={`p-4 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? 'Success!' : 'Error'}
            </h3>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-2">API Endpoints:</h3>
        <ul className="text-sm space-y-1">
          <li><strong>POST /users/forgot-password</strong> - Send reset link to email</li>
          <li><strong>POST /users/reset-password</strong> - Reset password with code</li>
        </ul>
        
        <h3 className="font-medium mb-2 mt-4">Reset Password API Format:</h3>
        <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`{
  "email": "user@example.com",
  "code": "123456",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}`}
        </pre>
        
        <h3 className="font-medium mb-2 mt-4">Password Requirements:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• At least 8 characters long</li>
          <li>• At least one uppercase letter (A-Z)</li>
          <li>• At least one lowercase letter (a-z)</li>
          <li>• At least one number (0-9)</li>
          <li>• At least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)</li>
        </ul>
        
        <h3 className="font-medium mb-2 mt-4">Reset Link Format:</h3>
        <code className="text-sm bg-white p-2 rounded border">
          /reset-password?code=&#123;resetCode&#125;&email=&#123;encodeURIComponent(email)&#125;
        </code>
      </div>
    </div>
  );
}
