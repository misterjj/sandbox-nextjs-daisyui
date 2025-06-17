"use client"

import Link from "next/link";
import {JSX, useEffect, useState} from "react"
import {
    HiChartPie,
    HiChevronDoubleLeft,
    HiCog8Tooth,
    HiCreditCard,
    HiHome,
    HiPower,
    HiQuestionMarkCircle,
    HiStar,
    HiTag,
    HiWallet
} from "react-icons/hi2";
import {usePathname} from "next/navigation";
import logo from '../../assets/logo_small.jpg'
import Image from "next/image";
import {HiPlus, HiSearch, HiUser} from "react-icons/hi";
import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarResults,
    KBarSearch,
    useKBar,
    useMatches,
    useRegisterActions,
} from "kbar";
import {useAuth} from "@/contexts/AuthContext";

function MenuItem({text, href, icon, panelOpen}: {
    text: string,
    href: string,
    icon: JSX.Element,
    panelOpen: boolean
}): JSX.Element {
    const pathname = usePathname()

    const active = href === "/admin" ? pathname === href : pathname.startsWith(href)

    return <li className={`hover:bg-gray-100 px-2 rounded group/item h-8 ${panelOpen ? "w-full" : "hover:w-40"}`}>
        <Link href={href} className="flex items-center gap-2 h-8 py-2 relative">
            <span className={active ? "text-primary" : ""}>{icon}</span>
            <span
                className={panelOpen ? "text-nowrap" : "hidden opacity-0 group-hover/item:block group-hover/item:opacity-100 absolute left-7"}>{text}</span>
        </Link>
    </li>
}

function RenderResults() {
    const {results} = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({item, active}) =>
                typeof item === "string" ? (
                    <div className="h-6 text-xs font-bold flex items-center uppercase px-2 text-gray-400">{item}</div>
                ) : (
                    <div
                        className={`cursor-pointer h-14 flex items-center pe-4 ps-2 border-l-2 gap-2 ${active ? 'bg-gray-200 border-gray-600' : 'border-transparent'}`}>
                        <div>{item.icon}</div>
                        <div className="grow">{item.name}</div>
                        {item.shortcut?.map(s => <kbd className="kbd kbd-sm">{s}</kbd>)}
                    </div>
                )
            }
        />
    );
}

function ApiSearchProvider() {
    const {query} = useKBar(state => ({query: state.searchQuery}));
    useMultiSearch();
    return <label className="input">
        <HiSearch size={20} className="opacity-50"/>
        <input type="search" className="grow outline-none" placeholder="Search" onClick={() => query.toggle()}/>
        <kbd className="kbd kbd-sm">^</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
    </label>;
}

function useMultiSearch() {
    const {query} = useKBar(state => ({query: state.searchQuery}));
    const [actions, setActions] = useState([]);

    useEffect(() => {
        if (!query || query.length < 2) {
            setActions([]);
            return;
        }

        const performSearch = async () => {
            try {
                // const [articles] = await Promise.all([
                //     fetch(`/api/articles/search?q=${query}`).then(r => r.json())
                // ]);
                //
                // const searchActions: Action[] = [
                //     ...articles.map(article => ({
                //         id: `article-${article.id}`,
                //         name: article.name,
                //         section: "Article",
                //         icon: "👤",
                //         perform: () => location.pathname = `/article/${article.id}`,
                //     }))
                // ];
                //
                // setActions(searchActions);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        const timeoutId = setTimeout(performSearch, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useRegisterActions(actions, [actions]);
}

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const [panelOpen, setPanelOpen] = useState(true)
    const {isAuthenticated, isLoadingAuth, logout} = useAuth()

    useEffect(() => {
        if (isLoadingAuth) return

        if (!isAuthenticated) location.pathname = "/login";
    }, [isAuthenticated, isLoadingAuth]);

    if (isLoadingAuth) {
        return <div>Loading authentication...</div>
    }

    if (!isAuthenticated) {
        return null;
    }

    const staticActions = [
        {
            id: "ListArticles",
            name: "Liste des articles",
            shortcut: ["l", "a"],
            section: "Articles",
            keywords: "liste article",
            perform: () => (window.location.pathname = "/admin/articles"),
            icon: <HiWallet size={20}/>
        },
        {
            id: "AddArticle",
            name: "Ajouter un article",
            shortcut: ["a", "a"],
            section: "Articles",
            keywords: "ajouter article",
            perform: () => (window.location.pathname = "/admin/articles/create"),
            icon: <div className="relative"><HiWallet size={20}/><HiPlus size={10}
                                                                         className="absolute top-0 right-0 translate-x-2"/>
            </div>
        },
        {
            id: "ListCategories",
            name: "Liste des catégorie",
            shortcut: ["l", "c"],
            section: "Catégories",
            keywords: "liste categorie",
            perform: () => (window.location.pathname = "articles"),
            icon: <HiTag size={20}/>
        },
        {
            id: "AddCategory",
            name: "Ajouter une catégory",
            shortcut: ["a", "c"],
            section: "Catégories",
            keywords: "ajouter categorie",
            perform: () => (window.location.pathname = "articles"),
            icon: <div className="relative"><HiTag size={20}/><HiPlus size={10}
                                                                      className="absolute top-0 right-0 translate-x-2"/>
            </div>
        },
        {
            id: "ListHightlights",
            name: "Liste des mises en avant",
            shortcut: ["l", "h"],
            section: "Mises en avant",
            keywords: "liste mise avant Hightlight",
            perform: () => (window.location.pathname = "articles"),
            icon: <HiStar size={20}/>
        },
        {
            id: "AddHightlight",
            name: "Ajouter une mise en avant",
            shortcut: ["a", "h"],
            section: "Mises en avant",
            keywords: "ajouter mise avant Hightlight",
            perform: () => (window.location.pathname = "articles"),
            icon: <div className="relative"><HiStar size={20}/><HiPlus size={10}
                                                                       className="absolute top-0 right-0 translate-x-2"/>
            </div>
        },
        {
            id: "Documentation",
            name: "Documentation",
            shortcut: ["?"],
            section: "Documentations",
            keywords: "doc comment",
            perform: () => (window.location.href = "https://confluence.ankama.com"),
            icon: <HiQuestionMarkCircle size={20}/>
        },
    ]

    return (
        <>
            <KBarProvider actions={staticActions}>
                <KBarPortal>
                    <KBarPositioner className="bg-black/50 z-40">
                        <KBarAnimator className="shadow-xl min-w-150 bg-gray-100 rounded">
                            <div className="flex p-2 h-14 w-full gap-2 items-center border-b-1 border-b-gray-300">
                                <HiSearch size={20} className="opacity-50"/>
                                <KBarSearch className={" grow outline-none"}/>
                                <kbd className="kbd kbd-sm">esc</kbd>
                            </div>
                            <RenderResults/>
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
                <div className="min-h-screen h-full overflow-hidden text-gray-800">
                    <div className="w-full h-full flex relative">
                        <div
                            className={`h-full transition-width duration-700 ${panelOpen ? "w-50" : "w-13"} flex flex-col z-40`}>
                            <div className={"h-20 w-full flex items-center px-3 gap-1"}>
                                <div className={"w-6 h-6"}>
                                    <Image alt="Nextsy" src={logo} className={"rounded w-6 h-6"}/>
                                </div>
                                {panelOpen && <div className={"font-bold text-2xl"}><span
                                    className={"text-primary"}>Next</span><span>sy</span></div>}
                            </div>
                            {panelOpen &&
                                <div className="text-gray-300 font-bold uppercase text-xs mb-4 px-2">Général</div>}
                            {!panelOpen && <div className="px-2">
                                <div className="bg-gray-200 h-[1px] w-full"></div>
                            </div>}
                            <ul className="px-2">
                                <MenuItem text="Dashboard" href="/admin" icon={<HiHome size={20}/>}
                                          panelOpen={panelOpen}/>
                                <MenuItem text="Statistique" href="/admin/stats" icon={<HiChartPie size={20}/>}
                                          panelOpen={panelOpen}/>
                            </ul>
                            {panelOpen &&
                                <div className="text-gray-300 font-bold uppercase text-xs pb-4 px-2 mt-4">Shop</div>}
                            {!panelOpen && <div className="px-2">
                                <div className="bg-gray-200 h-[1px] w-full"></div>
                            </div>}
                            <ul className="px-2">
                                <MenuItem text="Articles" href="/admin/articles" icon={<HiWallet size={20}/>}
                                          panelOpen={panelOpen}/>
                                <MenuItem text="Catégories" href="/admin/categories" icon={<HiTag size={20}/>}
                                          panelOpen={panelOpen}/>
                                <MenuItem text="Mises en avant" href="/admin/highlight" icon={<HiStar size={20}/>}
                                          panelOpen={panelOpen}/>
                                <MenuItem text="Paiements" href="/admin/payments" icon={<HiCreditCard size={20}/>}
                                          panelOpen={panelOpen}/>
                            </ul>
                            {panelOpen &&
                                <div className="text-gray-300 font-bold uppercase text-xs pb-4 px-2 mt-4">Support</div>}
                            {!panelOpen && <div className="px-2">
                                <div className="bg-gray-200 h-[1px] w-full"></div>
                            </div>}
                            <ul className="px-2">
                                <MenuItem text="Settings" href="/admin/settings" icon={<HiCog8Tooth size={20}/>}
                                          panelOpen={panelOpen}/>
                                <MenuItem text="Aide" href="/admin/help" icon={<HiQuestionMarkCircle size={20}/>}
                                          panelOpen={panelOpen}/>
                            </ul>
                            <div className="grow"></div>
                            <div className={`p-4 flex justify-end w-full`}>
                                <HiChevronDoubleLeft size={20}
                                                     className={`cursor-pointer transition-all duration-700  ${panelOpen ? 'rotate-0' : 'rotate-180'}`}
                                                     onClick={() => setPanelOpen(t => !t)}/>
                            </div>
                        </div>
                        <div className="grow flex-col">
                            <div className="h-20 flex w-full items-center">
                                <div>
                                    <ApiSearchProvider/>
                                </div>
                                <div className="grow">

                                </div>
                                <div className="pe-4 ">
                                    <div className="dropdown">
                                        <div tabIndex={0} className="flex items-center gap-2 cursor-pointer"
                                             role="button">
                                            <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">Julien François Alain Mari</span>
                                                <span className="text-sm text-gray-500">Administrateur</span>
                                            </div>
                                        </div>
                                        <ul tabIndex={0}
                                            className="dropdown-content menu border-1 border-gray-100 bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
                                            <li><a><HiUser size={20}/>Profile</a></li>
                                            <li><a onClick={logout}><HiPower size={20}/>Déconnexion</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="grow  h-full overflow-y-scroll p-4 pb-16">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </KBarProvider>
        </>
    );
}
