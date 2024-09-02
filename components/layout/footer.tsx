function Footer() {
    return (
        <nav className='w-full flex items-center justify-center'>
            <div className='mx-auto py-5 px-5 w-full flex justify-center max-w-screen-lg'>
                <div className='ml-auto'>
                    <a
                        className='pointer-events-none flex place-items-center gap-2 md:p-8 lg:pointer-events-auto lg:p-0'
                        href='https://github.com/cdnkr'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <span className='text-thin text-xs'>By</span> <span className='font-black'>CDNKR</span>
                    </a>
                </div>
            </div>
        </nav >
    )
}

export default Footer