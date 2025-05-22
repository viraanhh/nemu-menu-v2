/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('http://127.0.0.1:8000/**'), new URL('https://ebnlvfdbiafiqjumeuyz.supabase.co/**')]
    }
};

export default nextConfig;
