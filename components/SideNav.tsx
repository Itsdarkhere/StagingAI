import React from 'react'
import Link from "next/link"
import styles from "../styles/SideNav.module.css"
import { usePathname } from "next/navigation"
import sofa from "../public/sofa.svg";
import file from "../public/file.svg";
import upgrade from "../public/upgrade.png";
import Image from 'next/image';

export default function SideNav() {
    const pathname = usePathname();

  return (
    <div className={styles.container}>
        <div className={styles.containerInner}>
            <div className={styles.top}>
                <Link href="/" className={styles.logolink}>
                    <Image height={40} src={sofa} alt="sofa" />
                </Link>
                <div className={styles.bio}>
                    <h6 className={styles.name}>Valtteri Juvonen</h6>
                    <p className={styles.subscription}>Organization</p>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.center}>
                <ul className={styles.list}>
                    <li className={styles.li}>
                        <Link href="/" className={`${styles.listlink} ${pathname == "/" ? styles.active : ''}`}>
                            <span style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                                <Image height={20} src={file} alt="file" />
                            </span>
                            <span className={`${styles.span} ${pathname == "/" ? styles.ac : ''}`}>Tool</span>
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/images" className={`${styles.listlink} ${pathname == "/images" ? styles.active : ''}`}>
                            <span style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                                <Image height={20} src={file} alt="file" />
                            </span>
                            <span className={`${styles.span} ${pathname == "/images" ? styles.ac : ''}`}>Images</span>
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/subscription" className={`${styles.listlink} ${pathname == "/subscription" ? styles.active : ''}`}>
                            <span style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                                <Image height={20} src={file} alt="file" />
                            </span>
                            <span className={`${styles.span} ${pathname == "/subscription" ? styles.ac : ''}`}>Subscription</span>
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/logout" className={`${styles.listlink} ${pathname == "/logout" ? styles.active : ''}`}>
                            <span style={{marginRight: 16, display: 'flex', alignItems: 'center'}}>
                                <Image height={20} src={file} alt="file" />
                            </span>
                            <span className={`${styles.span} ${pathname == "/logout" ? styles.ac : ''}`}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <hr className={styles.hr} />
            <div className={styles.bottom}>
                <h6 className={styles.bottomh6}>Want to upgrade ?</h6>
                <p className={styles.bottomp}>Check out the added perks on the Pro package.</p>
                <div className={styles.imagecontainer}>
                    <Image width={160} src={upgrade} alt="upgrade" />
                </div>
                <Link href="/subscribe" className={styles.bottomlink}>
                    Upgrade to Pro
                    <span></span>
                </Link>
            </div>
        </div>
    </div>
  )
}
