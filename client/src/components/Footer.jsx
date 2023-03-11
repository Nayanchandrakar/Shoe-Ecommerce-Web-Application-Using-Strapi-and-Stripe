import React from "react"
import { NavLink } from "react-router-dom"
import {
    ContentWrapper,
    linkedin,
    twitter,
    facebook,
    instagram,
} from "../Files/Exporter.js"

const Footer = () => {
    return (
        <footer className="w-full">
            <ContentWrapper>
                <div className="flex flex-row gap-2 sm:gap-9 text-lg justify-center">
                    <NavLink
                        className="hover:text-gray-500 transition-colors"
                        to="/"
                    >
                        Terms Of Use
                    </NavLink>
                    <NavLink
                        className="hover:text-gray-500 transition-colors"
                        to="/"
                    >
                        Privacy-Policy
                    </NavLink>
                    <NavLink
                        className="hover:text-gray-500 transition-colors"
                        to="/"
                    >
                        About
                    </NavLink>
                    <NavLink
                        className="hover:text-gray-500 transition-colors"
                        to="/"
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        className="hover:text-gray-500 transition-colors"
                        to="/"
                    >
                        FAQ
                    </NavLink>
                </div>

                <div className="flex justify-center mt-6">
                    <p className="text-justify w-full max-w-3xl text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum eveniet incidunt aspernatur! At velit libero
                        praesentium voluptatum eaque! Laudantium quia iure
                        doloribus vel, suscipit eaque. Tenetur laudantium
                        inventore modi ea ipsam voluptates dicta, pariatur
                        laborum ducimus consequuntur eos cum facilis blanditiis!
                        Odit nam nisi necessitatibus dolorum quidem error
                        corrupti iusto.
                    </p>
                </div>

                <div className="flex flex-row justify-center gap-5 mt-6">
                    <img src={facebook} className="w-6 " alt="" />
                    <img src={instagram} className="w-6 " alt="" />
                    <img src={twitter} className="w-6 " alt="" />
                    <img src={linkedin} className="w-6 " alt="" />
                </div>
            </ContentWrapper>
        </footer>
    )
}

export default Footer
