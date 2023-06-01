import Link from 'next/link'
import { useRouter } from 'next/router'
import type {GetServerSideProps, GetStaticProps, InferGetStaticPropsType} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


type Props = {
  // Add custom props here
}

const Homepage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter()

  const changeTo = router.locale === 'en' ? 'de' : 'en'

  return (
    <>
      HomePage
    </>
  )
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'datetime',
    ])),
  },
})

export default Homepage
