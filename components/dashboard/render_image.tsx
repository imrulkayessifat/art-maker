"use client"

import React, { useState } from 'react'
import { useImageStore } from '@/hooks/image'
import Image from 'next/image'
const RenderImage = () => {
    const isInImage = useImageStore((state) => state.isInImage)
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
   
    return (
        <div className="flex flex-shrink-1 items-center justify-center">
            {
                isInImage.length > 0 ? (
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='relative mt-10'>
                        <Image
                            src={isInImage}
                            alt={''}
                            width={"350"}
                            height={"350"}
                            className='rounded'
                            style={{
                                width:"350px",
                                height:"350px"
                            }}
                        />
                        {isHovered &&
                            <div
                                className='absolute bg-black bg-opacity-40 rounded flex flex-col justify-around gap-2 p-2 right-2 top-2'>
                                <div className='cursor-pointer hover:bg-neutral-300 rounded p-1'>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="stroke-[1.5]"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.148 5v10.976M16.223 11.586l-4.073 4.39-4.072-4.39"></path><path stroke="currentColor" strokeLinecap="round" d="M4 20h16"></path></svg>
                                </div>
                                <div className='cursor-pointer hover:bg-neutral-300 rounded-t border-b-2 border-slate-700	p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="stroke-[1.5]" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m10 14-5 5m0 0h4m-4 0v-4.007M10 10 5 5m0 0h4M5 5v4.007M14 10l5-5m0 0h-4m4 0v4.007M14 14l5 5m0 0h-4m4 0v-4.007"></path></svg>
                                </div>
                                <div className='cursor-pointer hover:bg-neutral-300 rounded p-1'>
                                    <svg className="stroke-[1.5] hover:text-red-500" width="24" height="24" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 6.6h16m-1.778 0v12.6c0 .9-.889 1.8-1.778 1.8H7.556c-.89 0-1.778-.9-1.778-1.8V6.6m2.666 0V4.8c0-.9.89-1.8 1.778-1.8h3.556c.889 0 1.778.9 1.778 1.8v1.8"></path></svg>
                                </div>
                            </div>
                        }

                        {
                            isHovered &&
                            <div
                                className='absolute bg-black bg-opacity-40 rounded flex flex-col justify-around gap-2 p-2 right-2 bottom-2'>
                                <div className='cursor-pointer hover:bg-neutral-300 rounded p-1'>
                                    <svg className="stroke-[1.5]" width="24" height="24" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9.3 10.202a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12.9 3H9.3C4.8 3 3 4.8 3 9.3v5.4C3 19.2 4.8 21 9.3 21h5.4c4.5 0 6.3-1.8 6.3-6.3v-4.5"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M18.18 7.88v-5.4l1.8 1.8M18.183 2.48l-1.8 1.8M3.602 18.257l4.437-2.979c.71-.477 1.737-.423 2.376.126l.297.261c.702.603 1.836.603 2.538 0l3.744-3.213c.702-.603 1.836-.603 2.538 0l1.467 1.26"></path></svg>
                                </div>
                                <div className='cursor-pointer hover:bg-neutral-300 rounded	p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" className="h-6 w-6 stroke-[1.5]"><path d="M2.984 4.3h11.534c1.383 0 2.5 1.117 2.5 2.5v2.767" stroke="currentColor" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.618 1.668 2.984 4.301l2.634 2.634M17.018 15.7H5.484a2.497 2.497 0 0 1-2.5-2.5v-2.766" stroke="currentColor" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="m14.383 18.333 2.633-2.633-2.633-2.634" stroke="currentColor" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>

                            </div>
                        }
                    </div>
                ) : (

                    <svg width="350" height="350" fill="none"><g clipPath="url(#a)"><path fill="currentColor" className="text-neutral-40 transition-all duration-500 dark:text-neutral-700" d="m100.648 320.362-26.545 13.856a.461.461 0 0 0-.136.711l19.578 22.673a.462.462 0 0 0 .433.152l28.884-5.361a.462.462 0 0 0 .293-.719l-21.915-31.168a.463.463 0 0 0-.592-.144ZM195.013 327.117l-33.971 28.1c-.165.136-.247.204-.291.298-.044.093-.044.2-.044.413v24.251c0 .442 0 .662.138.798s.359.132.8.125l312.452-5.06c.108-.002.162-.002.213-.015.052-.013.1-.038.196-.087l24.819-12.801c.244-.126.366-.189.433-.299.067-.111.067-.248.067-.522v-78.294c0-1.981 0-2.971-.38-3.039-.381-.068-.723.861-1.409 2.719l-11.898 32.237c-.172.466-.258.7-.456.774-.198.074-.416-.045-.852-.283l-8.916-4.86c-.348-.19-.522-.285-.695-.243-.173.042-.285.205-.509.533l-28.782 42.112c-.123.18-.185.27-.276.322-.091.053-.199.061-.416.078l-80.503 6.177a.934.934 0 0 1-.273.001.947.947 0 0 1-.247-.115l-47.725-26.62c-.221-.124-.332-.185-.453-.185s-.231.063-.452.188l-37.714 21.37c-.259.147-.389.221-.529.211-.14-.01-.257-.102-.493-.286l-20.61-16.047c-.124-.096-.186-.144-.259-.17-.073-.025-.152-.025-.309-.025h-9.017c-.19 0-.284 0-.37-.035-.085-.035-.152-.103-.285-.237l-24.015-24.179c-.331-.332-.496-.499-.698-.491-.202.007-.354.185-.659.541l-15.777 18.415c-.274.32-.411.48-.597.498-.185.017-.35-.114-.68-.377l-7.394-5.901c-.281-.224-.421-.336-.585-.335-.164.002-.302.116-.579.345Z"></path><path fill="currentColor" className="text-neutral-50 transition-all duration-500 dark:text-neutral-600" d="m50.162 307.411-26.89 33.338c-.255.315-.381.472-.37.652.013.181.16.32.453.598l56.994 54.019c.173.164.26.246.37.277.11.031.226.006.459-.044l43.443-9.291c.167-.036.25-.053.332-.041.083.012.157.053.307.135l72.849 40.127c.293.161.439.242.592.22.152-.022.27-.14.507-.376l15.3-15.318c.171-.171.256-.257.367-.291.111-.033.229-.01.467.038l31.825 6.338c.072.014.108.021.144.023a.985.985 0 0 0 .146-.012l98.647-11.74c.066-.007.098-.011.131-.01.033 0 .065.006.13.017l49.377 8.238c.15.025.225.037.298.026.074-.012.142-.047.277-.116l77.283-39.799c.416-.214.624-.322.678-.516.054-.195-.07-.394-.317-.792l-30.838-49.665c-.335-.539-.502-.808-.751-.815-.248-.006-.429.254-.791.774l-20.473 29.427c-.121.174-.182.261-.27.312-.089.052-.194.061-.405.08l-99.1 8.925c-.215.019-.322.029-.419-.007-.098-.036-.173-.113-.324-.267l-13.803-14.09c-.376-.383-.564-.575-.786-.552-.222.023-.366.25-.653.704l-14.799 23.361c-.178.282-.268.423-.412.477-.144.055-.304.008-.625-.084l-55.537-16.089c-.185-.053-.277-.08-.37-.069-.093.011-.176.059-.343.154l-28.081 15.975c-.191.109-.287.163-.393.17-.106.007-.208-.035-.412-.118l-60.43-24.662c-.122-.049-.182-.074-.247-.081a.97.97 0 0 0-.258.026l-49.213 8.41c-.249.042-.373.064-.487.023-.113-.04-.197-.135-.363-.325l-41.803-47.723c-.335-.383-.503-.575-.718-.571-.215.005-.375.203-.695.6Z"></path><ellipse cx="276.117" cy="274.795" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.259" ry="1.675"></ellipse><ellipse cx="230.129" cy="152.124" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.215" ry="1.616"></ellipse><ellipse cx="74.627" cy="232.456" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".868" ry="1.154"></ellipse><ellipse cx="93.699" cy="46.815" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".787" ry="1.047"></ellipse><ellipse cx="455.001" cy="89.271" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".472" ry=".628"></ellipse><ellipse cx="35.355" cy="71.265" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".472" ry=".628"></ellipse><ellipse cx="29.457" cy="241.625" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".472" ry=".628"></ellipse><ellipse cx="305.212" cy="196.128" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="106.669" cy="72.859" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="140.684" cy="319.397" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="152.485" cy="132.416" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="440.581" cy="40.08" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="273.973" cy="140.265" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="156.305" cy="330.939" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="228.218" cy="238.227" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".694" ry=".923"></ellipse><ellipse cx="249.958" cy="328.544" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.259" ry="1.675"></ellipse><ellipse cx="21.564" cy="314.232" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.259" ry="1.675"></ellipse><ellipse cx="128.955" cy="20.856" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.102" ry="1.465"></ellipse><ellipse cx="36.713" cy="182.025" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".787" ry="1.047"></ellipse><ellipse cx="156.971" cy="209.688" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.102" ry="1.465"></ellipse><ellipse cx="372.674" cy="91.955" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.102" ry="1.465"></ellipse><ellipse cx="278.61" cy="12.084" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.102" ry="1.465"></ellipse><ellipse cx="453.314" cy="297.553" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".521" ry=".693"></ellipse><ellipse cx="490.532" cy="179.926" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".944" ry="1.256"></ellipse><ellipse cx="488.796" cy="13.26" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".944" ry="1.256"></ellipse><ellipse cx="214.585" cy="55.273" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".944" ry="1.256"></ellipse><ellipse cx="116.892" cy="289.136" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".787" ry="1.047"></ellipse><ellipse cx="67.1" cy="134.113" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".63" ry=".837"></ellipse><ellipse cx="451.233" cy="212.142" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".868" ry="1.154"></ellipse><ellipse cx="383.719" cy="67.867" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.041" ry="1.385"></ellipse><ellipse cx="396.218" cy="312.096" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx=".694" ry=".923"></ellipse><ellipse cx="375.071" cy="196.252" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.417" ry="1.884"></ellipse><ellipse cx="350.399" cy="326.408" fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-200" rx="1.041" ry="1.385"></ellipse><path fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-400" d="M80.464 393.281 1.559 318.478c-.667-.632-1-.948-1.28-.828-.279.12-.279.579-.279 1.498v179.929c0 .435 0 .653.135.788s.353.135.788.135h197.154c.435 0 .653 0 .788-.135s.135-.353.135-.788v-73.991c0-.267 0-.4-.065-.509-.064-.109-.181-.173-.415-.301l-73.084-39.958c-.149-.081-.223-.122-.305-.134-.082-.012-.165.006-.331.041l-43.508 9.289c-.233.05-.35.074-.46.044-.109-.031-.195-.113-.368-.277Z"></path><path fill="currentColor" className="text-neutral-60 transition-all duration-500 dark:text-neutral-500" d="m214.456 394.177-90.135 104.294c-.57.66-.854.989-.731 1.259.124.269.559.269 1.43.269l374.057-.267c.435 0 .653 0 .788-.135.135-.136.135-.353.135-.788v-162.18c0-.722 0-1.084-.234-1.216-.234-.133-.544.053-1.164.424l-102.269 61.225c-.15.09-.225.135-.309.15-.084.015-.169-.002-.341-.035l-49.318-9.562a.908.908 0 0 0-.151-.023.983.983 0 0 0-.151.014l-98.616 13.639a1.023 1.023 0 0 1-.169.016c-.042-.002-.083-.012-.166-.031l-31.749-7.348c-.265-.061-.397-.092-.519-.052s-.211.142-.388.347Z"></path><path fill="currentColor" className="text-neutral-80 transition-all duration-500 dark:text-neutral-400" d="m214.854 471.978-59.019 26.252c-1.554.691-2.331 1.037-2.254 1.403.078.366.929.365 2.63.364l342.865-.249c.435 0 .652 0 .787-.135.136-.136.136-.353.136-.788V382.744c0-.63 0-.946-.208-1.083-.207-.137-.497-.013-1.077.234l-79.149 33.673c-.133.056-.199.084-.27.091-.071.007-.141-.008-.282-.038l-71.061-15.017c-.164-.034-.246-.052-.327-.04-.081.012-.155.051-.302.131l-132.469 71.283Z"></path></g><defs><clipPath id="a"><rect width="500" height="500" fill="currentColor" className="text-neutral-0 transition-all duration-500" rx="4"></rect></clipPath></defs></svg>
                )
            }
        </div>
    )
}

export default RenderImage