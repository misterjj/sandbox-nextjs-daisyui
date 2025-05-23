"use client"

import Link from "next/link";
import {JSX, useState} from "react"
import { HiTag, HiHome, HiWallet, HiChevronDoubleLeft, HiQuestionMarkCircle, HiCog8Tooth, HiStar, HiCreditCard, HiChartPie } from "react-icons/hi2";
import {usePathname} from "next/navigation";
import logo from '../../assets/logo_small.jpg'
import Image from "next/image";

function MenuItem({text, href, icon, panelOpen}: { text: string, href: string, icon: JSX.Element, panelOpen: boolean }): JSX.Element {
    const pathname = usePathname()

    return <li className={`hover:bg-gray-100 px-2 rounded group/item h-8 ${panelOpen ? "w-full" : "hover:w-40"}`}>
        <Link href={href} className="flex items-center gap-2 h-8 py-2 relative">
            <span className={pathname === href ? "text-indigo-600" : ""}>{icon}</span>
            <span className={panelOpen ? "text-nowrap" : "hidden opacity-0 group-hover/item:block group-hover/item:opacity-100 absolute left-7"}>{text}</span>
        </Link>
    </li>
}

export default function LoginLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const [panelOpen, setPanelOpen] = useState(true)

    return (
        <div className="min-h-screen h-full overflow-hidden text-gray-800">
            <div className="w-full h-full flex relative">
                <div className={`h-full transition-width duration-700 ${panelOpen ? "w-50" : "w-13"} flex flex-col z-40`}>
                    <div className={"h-14 w-full flex items-center px-3 gap-1"}>
                        <div className={"w-6 h-6"}>
                            <Image alt="Nextsy" src={logo} className={"rounded w-6 h-6"}/>
                        </div>
                        {panelOpen && <div className={"font-bold text-2xl"}><span className={"text-indigo-600"}>Next</span><span>sy</span></div>}
                    </div>
                    {panelOpen && <div className="text-gray-300 font-bold uppercase text-xs mb-4 px-2">Général</div>}
                    {!panelOpen && <div className="px-2"><div className="bg-gray-200 h-[1px] w-full"></div></div>}
                    <ul className="px-2">
                        <MenuItem text="Dashboard" href="/admin" icon={<HiHome size={20} />} panelOpen={panelOpen} />
                        <MenuItem text="Statistique" href="/admin/stats" icon={<HiChartPie size={20} />} panelOpen={panelOpen} />
                    </ul>
                    {panelOpen &&<div className="text-gray-300 font-bold uppercase text-xs pb-4 px-2 mt-4">Shop</div>}
                    {!panelOpen && <div className="px-2"><div className="bg-gray-200 h-[1px] w-full"></div></div>}
                    <ul className="px-2">
                        <MenuItem text="Articles" href="/admin/articles" icon={<HiWallet size={20} />} panelOpen={panelOpen} />
                        <MenuItem text="Catégories" href="/admin/categories" icon={<HiTag size={20} />} panelOpen={panelOpen} />
                        <MenuItem text="Mise en avants" href="/admin/highlight" icon={<HiStar size={20} />} panelOpen={panelOpen} />
                        <MenuItem text="Paiements" href="/admin/payments" icon={<HiCreditCard size={20} />} panelOpen={panelOpen} />
                    </ul>
                    {panelOpen &&<div className="text-gray-300 font-bold uppercase text-xs pb-4 px-2 mt-4">Support</div>}
                    {!panelOpen && <div className="px-2"><div className="bg-gray-200 h-[1px] w-full"></div></div>}
                    <ul className="px-2">
                        <MenuItem text="Settings" href="/admin/settings" icon={<HiCog8Tooth size={20} />} panelOpen={panelOpen} />
                        <MenuItem text="Aide" href="/admin/help" icon={<HiQuestionMarkCircle size={20} />} panelOpen={panelOpen} />
                    </ul>
                    <div className="grow"></div>
                    <div className={`p-4 flex justify-end w-full`}>
                        <HiChevronDoubleLeft size={20} className={`cursor-pointer transition-all duration-700  ${panelOpen ? 'rotate-0' : 'rotate-180'}`} onClick={() => setPanelOpen(t => !t)}/>
                    </div>
                </div>
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
