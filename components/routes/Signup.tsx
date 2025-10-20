import { GeistMono } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Signup() {
    return (
        <div className='w-screen h-screen flex justify-between'>
            <div className='w-full sm:w-1/2 h-screen flex justify-center items-center'>
                <div className='flex justify-between flex-col w-10/12 h-10/12'>
                    <div className={`w-full h-1/12 ${GeistMono.className} text-2xl`}>ONIT</div>
                    <div className='w-full h-11/12 flex justify-center items-center'>
                        <div className='w-10/12 sm:w-7/12 h-full flex flex-col items-center gap-4'>
                            <div className='text-xl md:text-3xl font-semibold'>
                                Create your account
                            </div>
                            <div>
                                Let's get started with building great habits
                            </div>
                            <div className='w-full'>
                                <Button variant={'secondary'} className='w-full rounded-3xl border cursor-pointer'>
                                    <img src={'/google.svg'} alt='google' width={20} height={20} />
                                    <p>Sign Up With Google</p>
                                </Button>
                            </div>
                            <div className='w-full'>
                                <img src={'/divider.svg'} alt='or-divider' className='w-full'/>
                            </div>
                            <form className='flex flex-col w-full gap-2'>
                                <div className='w-full'>
                                    <label htmlFor='username'>Name</label>
                                    <Input placeholder='Enter Your Name' name='username' className='rounded-3xl w-full'/>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='email'>Email</label>
                                    <Input placeholder='Enter Your Email' name='email' className='rounded-3xl w-full'/>
                                </div>
                                <div className='w-full'>
                                    <label className='label'>
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
                                        <p className='text-sm'>I agree to all terms, privacy policy and fees</p>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <Button variant={'default'} className='w-full rounded-3xl cursor-pointer'><p>Sign Up</p></Button>
                                </div>
                                <div>Already have an account? <Link href={'./login'} className='text-green-400'>Log in</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-screen hidden sm:block'>
                <img src={'/about-me.jpg'} alt='about me' className='w-full h-full' />
            </div>
        </div>
    )
}