import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'T-edu Recipient',
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh' }}>
          {children}
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}

