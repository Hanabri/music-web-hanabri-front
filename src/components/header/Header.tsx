import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

function Header(): React.JSX.Element  {


    return (
        <header>
            <nav>
                <ul>
                    <li><Link className={`nav-link ${usePathname() === '/' ? 'active' : ''}`}  id="home" href="/">HOME</Link></li>
                    <li><Link className={`nav-link ${usePathname() === '/releases' ? 'active' : ''}`} href="/releases">RELEASES</Link></li>
                </ul>
            </nav>
            <Link href="/" id="logo1" onClick={(e) => {e.preventDefault();window.location.href = "/";}}>
              <img className={'hanabri-logo'} src="https://hanabri.oss-cn-beijing.aliyuncs.com/HanabriWeb/icon/Hanabri_Logo.png" alt="HANABRI"/>
            </Link>
            <nav>
                <ul>
                    <li><Link className={`nav-link ${usePathname() === '/artwork' ? 'active' : ''}`} href="/artwork">ARTWORK</Link></li>
                    <li><Link className={`nav-link ${usePathname() === '/message' ? 'active' : ''}`} href="/message">MESSAGE</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;