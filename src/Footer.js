import React from 'react'
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
    return (
        <div className=' flex flex-row mx-auto w-5/6 items-center justify-center gap-x-2'>
            <a
                className="flex justify-center hover:text-brightColor transition-all cursor-pointer"
                href="https://instagram.com/xinru__0202?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
            >
                <BsInstagram size={25} />
            </a>
            <p>@xinru__0202</p>
        </div>

    )
}

export default Footer
