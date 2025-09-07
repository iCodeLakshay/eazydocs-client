/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Either allow this specific project host:
    // domains: ['zvkucododfrupbulzpcp.supabase.co'],

    // Or (recommended) allow any supabase storage public object URL:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

export default nextConfig;
