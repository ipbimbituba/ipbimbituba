import Navbar from "@/src/layout/Navbar";
import FooterPage from "@/src/layout/Footer";

// Remova as definições de fontes e o import do globals.css daqui, 
// pois eles já estão no layout da raiz.

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <FooterPage />
        </>
    );
}
