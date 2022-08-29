import Head from 'next/head'
import Image from 'next/image'
export default function Home() {
  return (
    <>

      <Head>
        <title>E-commerce Store</title>
        <meta name="description" content="Ecom Desc" />
      </Head>
      <Image
        src="/ecommerce.jpg"
        alt="Banner"
        width="100%" height="40px" layout="responsive"
        loading='lazy'
      />
    </>
  )
}
