"use client"
import Image from "next/image";
import bg from '../../public/background.jpeg'

export default function AppBgImg() {
  return <Image 
      src={bg}
      placeholder="blur"
      fill
      sizes="100vw"
      style={{
      objectFit: 'cover',
      zIndex: -1
      }} alt={""}  />
}