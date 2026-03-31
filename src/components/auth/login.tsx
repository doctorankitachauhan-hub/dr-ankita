import Image from 'next/image'
import LoginForm from './login_form'

export default function Login() {
    return (
        <div className="w-full grid">
            <LoginForm />

            {/* <div className='w-full h-full hidden md:block'>
                <Image
                    alt='Login Image'
                    src={"/images/auth/login.svg"}
                    width={1980}
                    height={1080}
                    className='w-full h-full max-h-100 object-contain'
                />
            </div> */}
        </div>
    )
}
