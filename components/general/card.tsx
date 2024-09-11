import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import Button from './button';

interface Props {
    title: string;
    description: string;
    link: string;
    buttonText?: string;
}

function Card({ title, description, link, buttonText }: Props) {
    return (
        <Link href={link} className='w-full'>
            <div className='relative w-full bg-white flex shadow-md rounded-xl hover:scale-105 hover:shadow-xl album-card overflow-hidden'>
                {/* <Image
                    // random image as there is no image included in the album details returned from https://jsonplaceholder.typicode.com/albums
                    src={`https://picsum.photos/600/600?ver=${title}`}
                    alt={`Bot type ${title} image`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="z-0"
                /> */}
                {/* <div className='absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)] z-10'></div> */}
                <div className='relative self-end mt-auto w-full'>
                    <div className='px-4 py-3 w-full mb-2'>
                        <p className='text-lg font-bold text-black block truncate capitalize leading-6'>{title}</p>
                        <span className='text-blue-600 mr-3 uppercase text-xs leading-3'>{description}</span>
                        {buttonText && (
                            <Button
                                text={buttonText}
                                Icon={<BsArrowRight />}
                                iconEnd
                                color='blue'
                                className='w-full mt-2'
                                hoverScale={false}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;