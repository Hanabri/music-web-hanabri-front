"use client";
import React from 'react';
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import './style.module.css';

export default function HanabriLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            <main style={{marginTop: '0',paddingTop: '0'}}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
