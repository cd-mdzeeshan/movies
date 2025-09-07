import React from 'react'

const NotFound = () => {
  return (
    <section  className='text-white flex flex-col items-center justify-center h-screen gap-5'>
        <div className='text-4xl'> The page you are looking for is not found.</div>
        <a  className="text-xl font-bold bg-white text-black p-2" href="/">Go To Home</a>
    </section>
  )
}

export default NotFound