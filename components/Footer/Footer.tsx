"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
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

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterContainer>
      <Row>
        <Column>
          <Logo src="" alt="test img" />
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
          <p>ITPL Road</p>
          <p>Whitefield, Bangalore</p>
          <p>Karnataka, PIN 560066, India</p>
          <EmailId>belandajuara@gmail.co.nl</EmailId>
          <h4>+123456789</h4>
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
            <FaFacebookF className="fab fa-facebook" />
            <FaTwitter className="fab fa-twitter" />
            <FaYoutube className="fab fa-youtube" />
            <FaWhatsapp className="fab fa-whatsapp" />
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
