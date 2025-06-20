'use client';

import ankamaLogo from '../../assets/ankama.svg'
import Image from "next/image";
import {useAuth} from "@/contexts/AuthContext";
import {FormEvent, useRef, useState} from "react";

export default function Login() {
    const {login} = useAuth();
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [loginFail, setLoginFail] = useState<boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true)
            login({
                email: emailRef?.current?.value || "",
                password: passwordRef?.current?.value || ""
            }).then(response => {
                    setLoading(false)
                    if (response.success) {
                        location.pathname = "/admin"
                        setLoginFail(false)
                    } else {
                        setLoginFail(true)
                    }
                }
            )
        }
    }

    return (
        <div className="w-full h-full bg-gray-100 text-gray-900 flex">
            <div className="min-h-full px-48 flex items-center">
                <div className="min-w-[400px] w-full">
                    <div className="w-full flex flex-col gap-5">
                        <form className="w-full flex flex-col gap-5" onSubmit={onSubmit}>
                            <div className="font-black text-2xl">Se connecter</div>
                            {loginFail && <div role="alert" className="alert alert-error alert-outline">
                                <span>Echec de la connexion.</span>
                            </div>}
                            <fieldset className="fieldset grow p-0">
                                <legend className="fieldset-legend pt-0">Identifiant</legend>
                                <input type="text" className="input w-full" placeholder="" ref={emailRef}/>
                            </fieldset>
                            <fieldset className="fieldset grow p-0">
                                <legend className="fieldset-legend pt-0">Mot de passe</legend>
                                <input type="password" className="input w-full" placeholder="" ref={passwordRef}/>
                            </fieldset>
                            <div className="flex items-center text-xs">
                                <div className="grow">
                                    <label className="fieldset-label text-gray-900">
                                        <input type="checkbox" className="checkbox checkbox-xs"/>
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <a href="" className="text-primary">Mot de passe oublié ?</a>
                            </div>
                            <button type={"submit"} className={`btn btn-primary w-full ${loading ? "opacity-50" : "opacity-100"}`}>
                                {!loading && <>Se connecter</>}
                                {loading && <span className="loading loading-ring loading-sm"></span>}
                            </button>
                        </form>
                        <div className="divider my-0">Ou se connecter avec</div>
                        <div className="flex gap-4">
                            <button className="btn bg-white text-black border-[#e5e5e5] grow"
                                    onClick={() => (document.getElementById('or_not') as HTMLDialogElement)?.showModal()}>
                                <Image src={ankamaLogo} alt="" className="h-6 w-6"/>
                                Ankama
                            </button>
                            <button className="btn bg-white text-black border-[#e5e5e5] grow"
                                    onClick={() => (document.getElementById('or_not') as HTMLDialogElement)?.showModal()}>
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff"></path>
                                        <path fill="#34a853"
                                              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path fill="#4285f4"
                                              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path fill="#ea4335"
                                              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g>
                                </svg>
                                Google
                            </button>
                        </div>
                        <dialog id="or_not" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                                    </button>
                                </form>
                                <h3 className="text-lg font-bold">Ou pas!</h3>
                                <p className="py-4">Je vais pas coder ca pour un test ! Mais ca serait cool !!</p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
            <div className="min-h-full grow bg-red-500"></div>
        </div>
    );
}