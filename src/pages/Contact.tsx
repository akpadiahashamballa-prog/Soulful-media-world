import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Contact Us</h1>
          <p className="text-xl text-smw-sage">We'd love to hear from you. Get in touch with our team.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />
            <div>
              <label className="block text-sm font-medium text-smw-white mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={6}
                className="w-full px-4 py-2.5 bg-smw-dark border border-smw-gray rounded-lg text-smw-white placeholder-smw-gray focus:outline-none focus:border-smw-gold focus:ring-1 focus:ring-smw-gold/50 transition-colors duration-200"
                required
              />
            </div>
            <Button type="submit" size="lg" variant="primary" className="w-full">
              Send Message
            </Button>
          </form>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
