import Link from "next/link";

export default function LoginLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen h-full overflow-hidden">
            <div className="w-full h-full flex  relative">
                <ul className="bg-blue-500 h-full w-16">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/articles">Articles</Link></li>
                </ul>
                <div className="grow flex-col">
                    <div className="bg-emerald-300 h-14">
                        search
                    </div>
                    <div className="grow bg-red-600 h-full overflow-y-scroll p-4 pb-16">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
