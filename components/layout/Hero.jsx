import Link from "next/link"

export default function Hero() {
  return (
    <div
        className="flex flex-col items-center justify-center mt-10"
    >
        
        <h1 className="text-4xl mt-40">
            Welcome to OrderForMe
        </h1>

        <Link className="border-2 border-cyan-900 rounded-full px-4 bg-white/50 text-cyan-900 text-xl mt-10" href="/menu">
            Order Now
        </Link>
    </div>
  )
}
