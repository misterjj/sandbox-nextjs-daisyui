"use client"

import {HiArrowLeft, HiPlus, HiTrash} from "react-icons/hi";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useState} from "react";
import {emptyProduct, Product} from "@/sdk/product/productApi";
import {ChoicesWrapper} from "@/components/ChoicesWrapper";

interface ArticleFormProps {
    id?: string
}


function PictureDropzone() {
    return <div className={`aspect-square border-dashed border-2 border-primary rounded-xl relative`}>
        <HiPlus size={60}
                className={`text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}/>
    </div>
}

export function ArticleForm({id}: ArticleFormProps) {
    const [tabLng, setTabLng] = useState(0);
    const [product, setProduct] = useState<Product>(emptyProduct)
    const pictures = [1, 2, 3]
    const categories = {
        choices: [],
        removeItemButton: true
    }


    return <form action="">
        <div className={`flex flex-col gap-4`}>
            <div className={`flex items-center gap-4`}>
                <div className={`btn btn-outline btn-square`}><HiArrowLeft size={20}/></div>
                <div
                    className={"grow text-2xl font-semibold"}>{id !== undefined ? `Modifier l'article [${id}]` : "Ajouter un article"}</div>
                <div className={`btn btn-error btn-outline btn-square`}><HiTrash size={15}/></div>
                <div className={`btn btn-primary`}>Sauvegarder</div>
            </div>
            <div className={`flex w-full gap-4`}>
                <div className={`w-1/2 flex flex-col gap-4`}>
                    <div className={"text-xl font-light"}>Images</div>
                    <div className={`flex w-full gap-4`}>
                        <div className={`w-1/2`}>
                            <PictureDropzone/>
                        </div>
                        <div
                            className={`w-1/2 grid grid-flow-row ${pictures.length > 3 ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
                            {pictures.map(i => <PictureDropzone key={i}/>)}
                        </div>
                    </div>
                    <div>
                        <div className={`flex w-full gap-4`}>
                            <div className={`w-1/2`}>
                                1
                            </div>
                            <div className={`w-1/2`}>
                                2
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-1/2`}>
                    <div className={`flex flex-col gap-4`}>
                        <div className={`flex items-center`}>
                            <div className={"grow text-xl font-light"}>Details</div>
                            <div className="badge badge-soft badge-success">Statut : En ligne</div>
                        </div>
                        <Tabs className={`tabs-langue`} selectedIndex={tabLng} onSelect={(index) => setTabLng(index)}>
                            <div className={`flex items-end`}>
                                <label className="grow">Nom</label>
                                <TabList role="tablist" className="tabs tabs-lift">
                                    <Tab role="tab" className="tab">FR</Tab>
                                    <Tab role="tab" className="tab">EN</Tab>
                                </TabList>
                            </div>
                            <TabPanel>
                                <input
                                    type="text"
                                    placeholder="Nom de l'article"
                                    className="input w-full"
                                    value={product?.nameFr}
                                    onChange={(e) => {
                                        setProduct(product => ({...product, nameFr: e.target.value}))
                                    }}
                                />
                            </TabPanel>
                            <TabPanel>
                                <input type="text" placeholder="Article's name" className="input w-full"/>
                            </TabPanel>
                        </Tabs>
                        <div className={`flex items-center gap-4`}>
                            <div className={`w-1/2`}>
                                <label htmlFor="">Catégories</label>
                                <ChoicesWrapper onChange={(value) => {
                                }} options={categories}/>
                            </div>
                            <div className={`w-1/2`}>
                                <label htmlFor="">Quantité</label>
                                <input type="text" placeholder="Quantité en stock" className="input w-full"/>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4`}>
                            <div className={`w-1/2`}>
                                <label htmlFor="">Prix</label>
                                <div className="join w-full">
                                    <label className="input w-full">
                                        <input type="text" placeholder="Prix"/>
                                        <span className="label">€</span>
                                    </label>
                                </div>
                            </div>
                            <div className={`w-1/2`}>
                                <label htmlFor="">Promotion</label>
                                <div className="join w-full">
                                    <label className="input w-full">
                                        <input type="text" placeholder="Promotion"/>
                                        <span className="label">%</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Tabs className={`tabs-langue`} selectedIndex={tabLng} onSelect={(index) => setTabLng(index)}>
                            <div className={`flex items-end`}>
                                <label className="grow">Description</label>
                                <TabList role="tablist" className="tabs tabs-lift">
                                    <Tab role="tab" className="tab">FR</Tab>
                                    <Tab role="tab" className="tab">EN</Tab>
                                </TabList>
                            </div>
                            <TabPanel>
                                {/*<TinyEditorComponent/>*/}
                            </TabPanel>
                            <TabPanel>
                                {/*<TinyEditorComponent/>*/}
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </form>
}