import Image from 'next/image'

export default function TopBar() {
    return (
        <div className='relative w-full bg-primary-color hidden md:block'>
            <div className='relative w-full max-w-7xl mx-auto py-2 flex items-center justify-between px-6'>
                <div className='relative flex lg:gap-8 md:gap-4 items-center'>
                    <div className='w-max flex items-center gap-1'>
                        <Image src='/images/svg/Phone.svg' alt='Phone No' width={16} height={16} />
                        <a href='tel:+911234567890' className='lg:text-sm md:text-[12px] text-white'>+91 1234567890</a>
                    </div>
                    <div className='w-max flex items-center gap-1'>
                        <Image src='/images/svg/mail.svg' alt='Email Now' width={16} height={16} />
                        <a href='mailto:info@gmail.com' className='lg:text-sm md:text-[12px] text-white'>
                            info@gmail.com.com
                        </a>
                    </div>
                    <div className='w-max flex items-center gap-1'>
                        <Image src='/images/svg/pin.svg' alt='Visit to our location' width={16} height={16} />
                        <a href='#' className='lg:text-sm md:text-[12px] text-white'>
                            Akshya Nagar 1st Block 1st Cross
                        </a>
                    </div>
                </div>

                <div className='relative flex gap-1 items-center'>
                    <a href='#' target="_blank" rel="noopener noreferrer" className='text-white'>
                        <Image src='/images/svg/fb.svg' alt='Follow us on Facebook' width={24} height={24} className='lg:w-6 md:w-5' />
                    </a>
                    <a href='#' target="_blank" rel="noopener noreferrer" className='text-white'>
                        <Image src='/images/svg/ig.svg' alt='Follow us on instagram' width={24} height={24} className='lg:w-6 md:w-5' />
                    </a>
                </div>
            </div>
        </div>
    )
}
