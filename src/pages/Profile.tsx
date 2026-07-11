import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Badge from '@/components/common/Badge';
import { User, Mail, MapPin, Link as LinkIcon, Edit2, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, profile, updateProfile, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile || {});

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-smw-sage">Please log in to view your profile</p>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-smw-white mb-2">Profile</h1>
            <p className="text-smw-sage">Manage your account and preferences</p>
          </div>
        </Container>
      </section>

      {/* Profile Content */}
      <section className="px-4">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-smw-gold/20 to-smw-gold/5 rounded-full flex items-center justify-center">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-smw-gold/40" />
                    )}
                  </div>

                  <h2 className="text-2xl font-serif text-smw-white mb-1">{profile.name}</h2>
                  <p className="text-smw-sage mb-4">{user.email}</p>

                  {/* Role Badge */}
                  <Badge variant="gold" className="mb-6">
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </Badge>

                  {/* Member Since */}
                  <p className="text-xs text-smw-sage">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Edit Toggle */}
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif text-smw-white">Account Information</h3>
                <Button
                  variant={isEditing ? 'danger' : 'outline'}
                  onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                  className="flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" /> Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" /> Edit
                    </>
                  )}
                </Button>
              </div>

              {/* Profile Card */}
              <Card>
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-smw-white font-medium mb-2">
                      <Mail className="w-4 h-4 text-smw-gold" />
                      Email
                    </label>
                    <p className={`${
                      isEditing ? 'p-3 bg-smw-gray rounded' : ''
                    } text-smw-sage`}>
                      {user.email}
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-smw-white font-medium mb-2">
                      <User className="w-4 h-4 text-smw-gold" />
                      Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-smw-sage">{profile.name}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-smw-white font-medium mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-4 py-2 bg-smw-gray text-smw-white rounded-lg border border-smw-gray focus:outline-none focus:border-smw-gold resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-smw-sage">{profile.bio || 'No bio added'}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 text-smw-white font-medium mb-2">
                      <MapPin className="w-4 h-4 text-smw-gold" />
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, Country"
                      />
                    ) : (
                      <p className="text-smw-sage">{profile.location || 'Not specified'}</p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="flex items-center gap-2 text-smw-white font-medium mb-2">
                      <LinkIcon className="w-4 h-4 text-smw-gold" />
                      Website
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://example.com"
                        type="url"
                      />
                    ) : (
                      <p className="text-smw-sage">{profile.website || 'Not specified'}</p>
                    )}
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <Button onClick={handleSave} isLoading={loading} className="w-full flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Save Changes
                    </Button>
                  )}
                </div>
              </Card>

              {/* Preferences */}
              <Card>
                <h4 className="text-xl font-serif text-smw-white mb-4">Preferences</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.preferences?.notifications ?? true}
                      onChange={(e) =>
                        handleInputChange('preferences', JSON.stringify({
                          ...profile.preferences,
                          notifications: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded accent-smw-gold"
                    />
                    <span className="text-smw-white">Enable notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.preferences?.newsletter ?? true}
                      onChange={(e) =>
                        handleInputChange('preferences', JSON.stringify({
                          ...profile.preferences,
                          newsletter: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded accent-smw-gold"
                    />
                    <span className="text-smw-white">Subscribe to newsletter</span>
                  </label>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProfilePage;
