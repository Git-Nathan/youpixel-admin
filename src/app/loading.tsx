import Image from 'next/image'

export const SplashScreen = () => (
  <div className='fixed flex h-full w-full items-center justify-center'>
    <div>
      <Image
        width={150}
        height={27}
        src='/icons/logo.svg'
        alt='loading logo'
        priority
      />
    </div>
  </div>
)

export interface ILoadingStateProps {}

export default function LoadingState(props: ILoadingStateProps) {
  return <SplashScreen />
}
