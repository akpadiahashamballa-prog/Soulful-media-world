import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, loading, error } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by store
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password, formData.name);
      navigate('/verify-email');
    } catch (err) {
      // Error is handled by store
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-smw-black to-smw-dark flex items-center justify-center px-4 py-20">
      <Container size="sm">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-serif text-smw-white mb-2">Soulful Media World</h1>
            <p className="text-smw-sage">Connect with creators and ideas</p>
          </div>

          {/* Auth Card */}
          <div className="bg-smw-dark rounded-lg border border-smw-gold/30 p-8 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 bg-smw-gray/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-smw-gold text-smw-black'
                    : 'text-smw-sage hover:text-smw-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-smw-gold text-smw-black'
                    : 'text-smw-sage hover:text-smw-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <Button type="submit" isLoading={loading} className="w-full">
                  Sign In
                </Button>
                <p className="text-center text-sm text-smw-sage">
                  <a href="/forgot-password" className="text-smw-gold hover:text-smw-gold-light">
                    Forgot password?
                  </a>
                </p>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  label="Full Name"
                  icon={<User className="w-4 h-4" />}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <p className="text-xs text-smw-sage">
                  By signing up, you agree to our{' '}
                  <a href="/terms" className="text-smw-gold hover:text-smw-gold-light">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-smw-gold hover:text-smw-gold-light">
                    Privacy Policy
                  </a>
                </p>
                <Button type="submit" isLoading={loading} className="w-full">
                  Create Account
                </Button>
              </form>
            )}
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <p className="text-center text-sm text-smw-sage">Or continue with</p>
            <div className="grid grid-cols-3 gap-3">
              {['Google', 'GitHub', 'Twitter'].map((provider) => (
                <Button key={provider} variant="outline" className="w-full text-sm">
                  {provider}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthPage;
