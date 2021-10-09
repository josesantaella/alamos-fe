import Head from 'next/head';

export interface PageProps {
  title: string;
}
export const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default Page;
