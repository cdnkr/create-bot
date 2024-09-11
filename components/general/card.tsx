import Link from 'next/link'
import Image from 'next/image'

interface Props {
    title: string;
    description: string;
    link: string;
}

function Card({ title, description, link }: Props) {
    return (
        <Link href={link} className='w-full'>
            <div className='relative h-52 w-full flex bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl album-card overflow-hidden'>
                {/* <Image
                    // random image as there is no image included in the album details returned from https://jsonplaceholder.typicode.com/albums
                    src={`https://picsum.photos/600/600?ver=${title}`}
                    alt={`Bot type ${title} image`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="z-0"
                /> */}
                <div className='absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)] z-10'></div>
                <div className='relative self-end mt-auto w-full z-10'>
                    <div className='px-4 py-3 w-full mb-2'>
                        <p className='text-lg font-bold text-white block truncate capitalize leading-6'>{title}</p>
                        <span className='text-orange-300 mr-3 uppercase text-xs leading-3'>{description}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;