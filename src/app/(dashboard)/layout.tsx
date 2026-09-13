import React from "react";


export default function Dashboardlayout({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <section>
            {children}  
        </section>
    )
}