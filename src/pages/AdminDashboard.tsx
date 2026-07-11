import React, { useState } from 'react';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { useAdminStore } from '@/stores/adminStore';
import { BarChart3, Users, AlertCircle, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { stats, fetchStats, loading } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'reports'>('overview');

  React.useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      label: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      label: 'Reports',
      value: stats?.totalReports || 0,
      icon: AlertCircle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
    },
    {
      label: 'Pending Reports',
      value: stats?.pendingReports || 0,
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <Container size="lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif text-smw-white mb-2">Admin Dashboard</h1>
              <p className="text-smw-sage">Platform management and moderation</p>
            </div>
            <Button onClick={() => fetchStats()} isLoading={loading}>
              Refresh
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats Cards */}
      <section className="px-4">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-smw-sage text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-serif text-smw-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <section className="px-4">
        <Container size="lg">
          <div className="flex gap-2 mb-8 border-b border-smw-gray">
            {(['overview', 'users', 'reports'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-smw-gold text-smw-gold'
                    : 'border-transparent text-smw-sage hover:text-smw-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-serif text-smw-white mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-smw-sage">Status</span>
                    <Badge variant="success">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-smw-sage">Last Updated</span>
                    <span className="text-smw-white">
                      {stats?.lastUpdated.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-serif text-smw-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">View All Users</Button>
                  <Button variant="outline">Pending Reports</Button>
                  <Button variant="outline">System Logs</Button>
                  <Button variant="outline">Settings</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <Card>
              <h3 className="text-xl font-serif text-smw-white mb-4">User Management</h3>
              <div className="text-center py-8 text-smw-sage">
                <p>User management interface coming soon...</p>
              </div>
            </Card>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <Card>
              <h3 className="text-xl font-serif text-smw-white mb-4">Moderation Reports</h3>
              <div className="text-center py-8 text-smw-sage">
                <p>Reports management interface coming soon...</p>
              </div>
            </Card>
          )}
        </Container>
      </section>
    </div>
  );
};

export default AdminDashboard;
