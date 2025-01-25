import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";


export default function Aside() {

       const router = useRouter();
       const [clicked, setClicked] = useState(false);
       const [activelink, setActivelink] = useState('/')

       const handleClick= () => {
        setClicked(!clicked);
       }

       const handleLinkClick =(link) =>{
        setActivelink(link);
        setClicked(false);
       }

       useEffect(() => {
        setActivelink(router.pathname)
       }, [router.pathname])


    return <>
       <div className="aside">
        <div className="logo flex">
            <BiCameraMovie/>
            <Link href="/">MOVIES</Link>
        </div>
        <ul className="mt-2">
            <Link href="/"><li><div><IoHomeSharp/></div>Dashboard</li></Link>
            <Link href="/"><li><div><IoHomeSharp/></div>Dashboard</li></Link>
            <Link href="/"><li><div><IoHomeSharp/></div>Dashboard</li></Link>
            <Link href="/"><li><div><IoHomeSharp/></div>Dashboard</li></Link>
        </ul>
       </div>
    </>
}