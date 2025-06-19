"use client"

import {HiArrowLeft, HiPlus, HiTrash} from "react-icons/hi";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useCallback, useMemo, useState} from "react";
import {emptyProduct, Product} from "@/sdk/product/productApi";
import {ChoicesWrapper} from "@/components/ChoicesWrapper";
import Wysiwyg from "@/components/Wysiwyg";
import {useDropzone} from "react-dropzone";
import {ProductImage} from "@/sdk/productImage/productImageApi";

interface ArticleFormProps {
    id?: string
}

interface PictureDropzoneProps {
    addPicture: (content: string) => void
}

function PictureDropzone({addPicture}: PictureDropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        for (const file of acceptedFiles) {
            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    const base64String = reader.result as string;

                    addPicture(base64String);
                };

                reader.onerror = (error) => {
                    console.error("Erreur lors de la lecture du fichier:", error);
                };

                reader.readAsDataURL(file);
            }
        }
    }, [addPicture]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    return (
        <section>
            <div {...getRootProps({className: 'dropzone'})}
                 className={`aspect-square border-dashed border border-primary rounded relative cursor-pointer `}>
                <input {...getInputProps()} />
                <HiPlus size={40}
                        className={`text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}/>
            </div>
        </section>
    );
}

interface PictureProps {
    image: ProductImage,
    onDelete: (image: ProductImage) => void,
    size: 'Large' | 'medium' | 'small'
}

function Picture({image, size, onDelete}: PictureProps) {
    let trashSize = 10
    let trashSizeBtn = "btn-xs"
    let trashSizePosition = "top-1 right-1"
    switch (size) {
        case 'Large':
            trashSize = 20
            trashSizeBtn = ""
            trashSizePosition = "top-4 right-4"
            break;
        case 'medium':
            trashSize = 15
            trashSizeBtn = "btn-sm"
            trashSizePosition = "top-2 right-2"
            break;
    }

    return (
        <>
            <div className={`w-full aspect-square border rounded border-gray-400 overflow-hidden relative group`}>
                <img src={image.base64} alt=""
                     className={`w-full aspect-square object-cover `}/>
                <div
                    className={`btn ${trashSizeBtn} btn-error btn-square absolute ${trashSizePosition} text-white hidden group-hover:flex`}
                    onClick={() => onDelete(image)}
                >
                    <HiTrash size={trashSize}/></div>
            </div>
        </>
    );
}

export function ArticleForm({id}: ArticleFormProps) {
    const [tabLng, setTabLng] = useState(0);
    const [product, setProduct] = useState<Product>(emptyProduct)
    const categories = {
        choices: [],
        removeItemButton: true
    }

    const addPicture = useCallback((content: string) => {
        setProduct(p => ({
            ...p,
            images: [...p.images, {base64: content, cover: p.images.length === 0}]
        }));
    }, []);

    const removePicture = useCallback((image: ProductImage) => {
        setProduct(p => ({
            ...p,
            images: p.images.filter(i => i !== image)
        }));
    }, [])

    const sidePictureNumber = useMemo(() => {
        return product.images.length > 4 ? 9 : 4
    }, [product.images.length]);


    return <form action="">
        <div className={`flex flex-col gap-4`}>
            <div className={`flex items-center gap-4`}>
                <div className={`btn btn-outline btn-square`}><HiArrowLeft size={20}/></div>
                <div
                    className={"grow text-2xl font-semibold"}>{id !== undefined ? `Modifier l'article [${id}]` : "Ajouter un article"}</div>
                <div className={`btn btn-error btn-outline btn-square hover:text-white`}><HiTrash size={15}/></div>
                <div className={`btn btn-primary`}>Sauvegarder</div>
            </div>
            <div className={`flex w-full gap-4`}>
                <div className={`w-1/2 flex flex-col gap-4`}>
                    <div className={"text-xl font-light"}>Images</div>
                    <div className={`flex w-full gap-4`}>
                        <div className={`w-1/2`}>
                            {product.images.length > 0 &&
                                <Picture image={product.images[0]} size={'Large'} onDelete={removePicture}/>}
                            {product.images.length === 0 && <PictureDropzone addPicture={addPicture}/>}
                        </div>
                        <div
                            className={`w-1/2 grid grid-flow-row ${product.images.length > 4 ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
                            {product.images.slice(1).map((image, i) => <Picture image={image} key={i}
                                                                                size={product.images.length > 4 ? 'small' : "medium"}
                                                                                onDelete={removePicture}/>)}
                            {[...Array(Math.max(0, sidePictureNumber - Math.max(product.images.length - 1, 0))).keys()].map(i =>
                                <PictureDropzone addPicture={addPicture} key={i}/>)}
                        </div>
                    </div>
                    <div>
                        <div className={`flex w-full gap-4`}>
                            <div className={`w-1/2`}>
                                1
                            </div>
                            <div className={`w-1/2`}>
                                <div className={"grow text-xl font-light"}>Conditions d'Affichage</div>
                                <div className={`w-full btn btn-dash btn-primary flex items-center justify-center`}>
                                    <HiPlus size={25}/>
                                    <span className={`font-semibold`}> Ajouter une condition</span>
                                </div>

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
                                <input type="text" placeholder="Article's name" className="input w-full"
                                       value={product?.nameEn}
                                       onChange={(e) => {
                                           setProduct(product => ({...product, nameEn: e.target.value}))
                                       }}/>
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
                                <Wysiwyg id={"article_description_fr"} editorData={product.descriptionFr}
                                         setEditorData={(data) => setProduct(product => ({
                                             ...product,
                                             descriptionFr: data
                                         }))}/>
                            </TabPanel>
                            <TabPanel>
                                <Wysiwyg id={"article_description_en"} editorData={product.descriptionEn}
                                         setEditorData={(data) => setProduct(product => ({
                                             ...product,
                                             descriptionEn: data
                                         }))}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </form>
}