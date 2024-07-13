import Link from "next/link";
import React from "react";
import { FaArrowRight, FaXTwitter } from "react-icons/fa6";
import {
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import {
  FooterContainer,
  Row,
  Column,
  Heading,
  Underline,
  EmailId,
  Logo,
  List,
  Form,
  SocialIcons,
  Divider,
  Copyright,
} from "./style";
// import LogoImg from "@/assets/scuderia-alpha-tauri.svg";
// import LogoImg2 from "@/assets/voila2.png";
import Image from "next/image";

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterContainer>
      <Row>
        <Column>
          <h1 className="text-2xl font-bold text-white mb-4">PEACHES.</h1>
          {/* <Image
            src={LogoImg2}
            alt="test-img"
            className="top-[-100px] h-[-100px] w-[-100px] relative"
          /> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, quos.
            Iure, velit? Harum commodi impedit itaque, iure adipisci odio
            deleniti eaque, ducimus assumenda optio ullam. Consequatur nesciunt
            aperiam dolores cum ipsum voluptas impedit.
          </p>
        </Column>
        <Column>
          <Heading>
            Office
            <Underline>
              <span></span>
            </Underline>
          </Heading>
          <p>Abbey Road</p>
          <p>London NW8 9AY</p>
          <p>United Kingdom</p>
          <EmailId>belandajuara@gmail.co.nl</EmailId>
          <h4>+44 20 1234 5678</h4>
        </Column>
        <Column>
          <Heading>
            Links
            <Underline>
              <span></span>
            </Underline>
          </Heading>
          <List>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Services</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Features</Link>
            </li>
            <li>
              <Link href="/">Contacts</Link>
            </li>
          </List>
        </Column>
        <Column>
          <Heading>
            Newsletter
            <Underline>
              <span></span>
            </Underline>
          </Heading>
          <Form>
            <FaEnvelope className="far fa-envelope" />
            <input type="email" placeholder="Enter your email id" required />
            <Link href="/">
              <FaArrowRight className="fas fa-arrow-right" />
            </Link>
          </Form>
          <SocialIcons>
            <Link href="https://www.facebook.com/" target="_blank">
              <FaFacebookF className="fab fa-facebook" />
            </Link>
            <Link href="https://x.com/" target="_blank">
              <FaXTwitter className="fab fa-twitter" />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank">
              <FaYoutube className="fab fa-youtube" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank">
              <FaInstagram className="fab fa-instagram" />
            </Link>
          </SocialIcons>
        </Column>
      </Row>
      <Divider />
      <Copyright>
        Mini Project - Team J &copy; {year} - All Rights Reserved
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
