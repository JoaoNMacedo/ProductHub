import Link from 'next/link';
import '@fontsource/inter';

export const Header = () => {
    return (
        <header className="header flex flex-row justify-around items-center self-stretch py-2 px-0 h-[4.375rem] bg-gradient-to-b from-green-400 via-green-300 to-emerald-200">
            <Link className="flex flex-row space-x-4" href='/'>
                <img src="favicon.svg"  />
                <div className="producthub text-black text-center font-inter text-xl font-bold leading-normal">ProductHub</div>
            </Link>
            <nav className="flex space-x-4 font-inter">
                <Link href="/">Home</Link>
                <Link href="/ProductList">Listar</Link>
            </nav>
        </header>
    )
}
