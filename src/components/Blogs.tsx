import { Heading, Subheading, Wrapper } from '@/utils/Section';
import { Calendar, MoveRight, MoveUpRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Blog {
    title: string;
    content: string;
    image: string;
    link: string;
    date: string;
}
export default function Blogs() {
    const blog: Blog[] = [
        {
            title: 'What Causes Period Pain — Understanding the Pain with Clarity',
            content: 'Period pain, also called menstrual cramps or dysmenorrhea, is something many women experience every month. Sometimes the pain is mild and manageable. Other times it can be very strong and affect daily life. Dr. Nikila Reddy, senior gynaecologist in Hyderabad, explains why period pain occurs, what might make it worse, and when to see a doctor.',
            image: '/images/blog/img-1.jpg',
            link: '/blogs/what-causes-period-pain',
            date: 'June 15, 2025'
        },
        {
            title: 'Understanding Repeated Miscarriages: Causes, Symptoms & Hope',
            content: 'Repeated miscarriages, also called recurrent pregnancy loss, is when a woman has two or more miscarriages. This situation is painful emotionally and physically, and many couples want to understand why it’s happening and what can be done. Dr. Nikila Reddy, senior gynaecologist in Hyderabad, explains causes, what to look for, and how to move forward with hope.',
            image: '/images/blog/img-2.jpg',
            link: '/blogs/understanding-repeated-miscarriages',
            date: 'June 15, 2025'
        },
        {
            title: 'Symptoms of Silent PCOS',
            content: 'Polycystic Ovary Syndrome (PCOS) is a common health condition that affects many women. While some women experience clear signs like irregular periods or weight gain, others may have what is called silent PCOS. In this condition, the symptoms are not very obvious, and many women may not realize they have it until they face issues with fertility or undergo routine health check-ups.',
            image: '/images/blog/img-3.jpg',
            link: '/blogs/symptoms-of-silent-pcos',
            date: 'June 15, 2025'
        },
        {
            title: 'Understanding Postpartum Depression: Signs, Causes & Hope',
            content: 'After giving birth, many new mothers feel overwhelmed, tired or emotional. These feelings are common. But when sadness, anxiety, or hopelessness lasts longer than it should, it might be postpartum depression. Dr. Nikila Reddy, senior gynecologist in Hyderabad, shares what postpartum depression is, its signs, causes, and how to find help.',
            image: '/images/blog/img-4.jpg',
            link: '/blogs/understanding-postpartum-depression',
            date: 'June 15, 2025'
        },
    ]

    function TrimText(id: number, limit: number = 250) {
        if (id == null || id < 0 || id >= blog.length) {
            alert('Invalid blog id');
            return '';
        }

        const content = blog[id].content;
        const txt = content.length <= limit ? content : content.slice(0, limit);
        return txt;
    }

    return (
        <section className='bg-[#F9FAFB]'>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            Health <span className='!font-open-sans text-primary-color'>Blog & Resources</span>
                        </Heading>
                        <Subheading className='mx-auto max-w-2xl'>
                            Stay informed with our latest articles on women&apos;s health, written by medical professionals to help you make informed decisions about your healthcare.
                        </Subheading>
                    </div>

                    <div className='bg-white relative w-full grid lg:grid-cols-[500px_1fr] lg:gap-5 md:grid-cols-[300px_1fr] grid-cols-1 gap-1 md:gap-3 shadow rounded-2xl overflow-hidden'>
                        <div className="w-full h-full">
                            <Image src={blog[0].image} width={500} height={500} alt='blog'
                                className='w-full h-[450px] object-cover object-center'
                            />
                        </div>
                        <div className="w-full h-full md:p-10 p-4 ">
                            <Link href='#' className='w-full relative font-bold md:text-2xl text-base text-secondry-color'>
                                {blog[0].title}
                            </Link>
                            <Subheading className='mt-5'>
                                {blog[0].content}
                            </Subheading>
                            <div className='mt-5 w-full flex items-center gap-8'>
                                <div className='relative flex gap-2 items-center'>
                                    <User className='text-neutral-500 md:w-5 w-3' />
                                    <span className='md:text-base text-xs text-light'>Dr. Ankita Chauhan</span>
                                </div>
                                <div className='relative flex gap-2 items-center'>
                                    <Calendar className='text-neutral-500 md:w-5 w-3' />
                                    <span className='md:text-base text-xs text-light'>{blog[0].date}</span>
                                </div>
                            </div>
                            <Link href={blog[0].link} className='md:mt-10 mt-5 w-max !font-montserrat bg-primary-color text-white md:px-4 md:py-3 md:rounded-lg px-2 py-1.5 rounded flex lg:gap-2 gap-1 items-center font-semibold hover:bg-primary-hover transition-all duration-200 ease-linear md:text-base text-xs'>
                                Read More
                                <MoveRight className='md:w-6 w-4' />
                            </Link>
                        </div>
                    </div>

                    <div className='relative w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3'>
                        {
                            blog.map((blog, idx) => {
                                if (idx === 0) {
                                    return;
                                }
                                return (
                                    <div key={idx} className='w-full h-full shadow rounded-2xl overflow-hidden bg-white'>
                                        <div className='w-full relative'>
                                            <Image src={blog.image} width={300} height={300} alt={blog.title} className='w-full' />
                                        </div>
                                        <div className='w-full relative md:p-5 p-3'>
                                            <Link href={blog.link} className='font-bold md:text-lg text-base text-secondry-color'>
                                                {blog.title}
                                            </Link>
                                            <Subheading className='!font-normal'>
                                                {
                                                    TrimText(idx, 200) + '...'
                                                }
                                            </Subheading>
                                            <div className='mt-5 w-full flex items-center gap-8'>
                                                <div className='relative flex gap-2 items-center'>
                                                    <User className='text-neutral-500 md:w-5 w-3' />
                                                    <span className='md:text-base text-xs text-light'>Dr. Ankita Chauhan</span>
                                                </div>
                                                <div className='relative flex gap-2 items-center'>
                                                    <Calendar className='text-neutral-500 md:w-5 w-3' />
                                                    <span className='md:text-base text-xs text-light'>{blog.date}</span>
                                                </div>
                                            </div>

                                            <Link href={blog.link} className='mt-5 w-max !font-montserrat flex gap-2 items-center text-blue-500 text-sm ml-auto hover:underline'>
                                                Read More
                                                <MoveUpRight className='w-4' />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </Wrapper>
        </section>
    )
}
