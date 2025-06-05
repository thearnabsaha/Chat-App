import Image from 'next/image';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='flex'>
                <div className=' w-[50vw] h-[100vh] flex justify-center items-center'>
                    {children}
                </div>
                <div className='w-[50vw] h-[100vh]'>
                    <Image src="/a.jpg" alt="A description of the image" className='w-[50vw] h-[100vh]' width={4000} height={4000}/>
                </div>
            </main>
        </>
    );
}
