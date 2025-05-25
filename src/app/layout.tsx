"use client"
import "./globals.css";
import {AuthProvider} from "@/contexts/AuthContext";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full" data-theme="light">
        <body className="min-h-screen h-full light">
        <AuthProvider>
         {children}
        </AuthProvider>
        </body>
        </html>
    );
}
