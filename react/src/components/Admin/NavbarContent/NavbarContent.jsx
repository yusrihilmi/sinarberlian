import React, { useState, useEffect } from "react";
import "../style.css"
import HeaderTitle from "./HeaderTitle";
import HeaderProduct from "./HeaderProduct";

function NavbarContent() {

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Navbar Content</h2>
            <HeaderTitle/>
            <br/>
            <HeaderProduct/>
        </div>
    );
}

export default NavbarContent;
