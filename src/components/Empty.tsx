import Image from 'next/image'

type Props = {
  title: string
}

export default function Empty({ title }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={'/empty.svg'} width={300} height={300} alt="Empty Image" />
      <h4 className="mt-2 text-xl font-semibold">{title}</h4>
    </div>
  )
}
