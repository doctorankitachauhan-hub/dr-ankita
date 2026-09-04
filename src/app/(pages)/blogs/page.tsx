import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar, MoveUpRight, User } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export const metadata: Metadata = {
  title: "Women's Health & Pregnancy Blog | Dr. Ankita Chauhan",
  description: "Read expert blogs on pregnancy, fertility, PCOS, gynecology, and women's wellness by Dr. Ankita Chauhan to stay informed and healthy.",
  alternates: {
    canonical: "https://www.drankitachauhan.com/blogs",
  },
  openGraph: {
    title: "Women's Health & Pregnancy Blog | Dr. Ankita Chauhan",
    description: "Read expert blogs on pregnancy, fertility, PCOS, gynecology, and women's wellness by Dr. Ankita Chauhan to stay informed and healthy.",
    url: "https://www.drankitachauhan.com/blogs",
  },
}

interface Blog {
  title: string;
  content: string;
  image: string;
  link: string;
  date: string;
}

export default function BlogPage() {
  const blog: Blog[] = [
    {
      title: 'What Causes Period Pain — Understanding the Pain with Clarity',
      content: 'Period pain, also called menstrual cramps or dysmenorrhea, is something many women experience every month. Sometimes the pain is mild and manageable. Other times it can be very strong and affect daily life. Dr. Ankita Chauhan, senior gynaecologist in Hyderabad, explains why period pain occurs, what might make it worse, and when to see a doctor.',
      image: '/images/blog/what-causes-period-pain-understanding-the-pain-with-clarity.jpg',
      link: '/blogs/what-causes-period-pain',
      date: 'June 15, 2025'
    },
    {
      title: 'Understanding Repeated Miscarriages: Causes, Symptoms & Hope',
      content: 'Repeated miscarriages, also called recurrent pregnancy loss, is when a woman has two or more miscarriages. This situation is painful emotionally and physically, and many couples want to understand why it’s happening and what can be done. Dr. Ankita Chauhan, senior gynaecologist in Hyderabad, explains causes, what to look for, and how to move forward with hope.',
      image: '/images/blog/understanding-repeated-miscarriages-causes-symptoms-hope.jpg',
      link: '/blogs/understanding-repeated-miscarriages',
      date: 'June 15, 2025'
    },
    {
      title: 'Symptoms of Silent PCOS',
      content: 'Polycystic Ovary Syndrome (PCOS) is a common health condition that affects many women. While some women experience clear signs like irregular periods or weight gain, others may have what is called silent PCOS. In this condition, the symptoms are not very obvious, and many women may not realize they have it until they face issues with fertility or undergo routine health check-ups.',
      image: '/images/blog/symptoms-of-silent-pcos.jpg',
      link: '/blogs/symptoms-of-silent-pcos',
      date: 'June 15, 2025'
    },
    {
      title: 'Understanding Postpartum Depression: Signs, Causes & Hope',
      content: 'After giving birth, many new mothers feel overwhelmed, tired or emotional. These feelings are common. But when sadness, anxiety, or hopelessness lasts longer than it should, it might be postpartum depression. Dr. Ankita Chauhan, senior gynecologist in Hyderabad, shares what postpartum depression is, its signs, causes, and how to find help.',
      image: '/images/blog/understanding-postpartum-depression-signs-causes-hope.jpg',
      link: '/blogs/understanding-postpartum-depression',
      date: 'June 15, 2025'
    },
  ]
  return (
    <Section>
      <Wrapper>
        <div>
          <h1 className='mt-2 lg:text-4xl md:text-[28px] text-2xl leading-[1.3] font-bold text-secondry-color'>
            Blogs
          </h1>
        </div>
        <div className='w-full relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
          {
            blog.map((blog, idx) => {
              return (
                <div key={idx} className='w-full h-full shadow rounded-2xl overflow-hidden bg-white'>
                  <div className='w-full relative'>
                    <Image src={blog.image} width={500} height={500} alt={blog.title} className='w-full' />
                  </div>
                  <div className='w-full relative md:p-5 p-3'>
                    <Link href={blog.link} className='font-bold md:text-lg text-base text-secondry-color'>
                      {blog.title}
                    </Link>
                    <Subheading className='!font-normal line-clamp-4'>
                      {
                        blog.content
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
      </Wrapper>
    </Section>
  )
}
