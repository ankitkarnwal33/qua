import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" flex flex-col bg-[#2F2F2F] px-20 py-8 text-[#EEEEEE] gap-8 ">
      <div className=" flex justify-between items-center flex-col md:flex-row gap-10 md:gap-0">
        <ul className=" flex gap-6 items-center text-[1rem] flex-col md:flex-row">
          <li>
            <Link href={"#"}>About Quanutrition</Link>
          </li>
          <li>
            <Link href={"#"}>Contact</Link>
          </li>
          <li>
            <Link href={"#"}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={"#"}>Terms of Service</Link>
          </li>
        </ul>
        <ul className=" flex gap-4 items-center">
          <li>
            <Link href={"#"}>
              <Image
                src={"/icons/facebook.svg"}
                width={20}
                height={20}
                alt="facebook"
              />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <Image
                src={"/icons/Insta.svg"}
                width={20}
                height={20}
                alt="facebook"
              />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <Image
                src={"/icons/Linkedin.svg"}
                width={20}
                height={20}
                alt="facebook"
              />
            </Link>
          </li>
        </ul>
      </div>
      <p className=" text-center text-sm">
        &copy; 2025 Quanutrition. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
